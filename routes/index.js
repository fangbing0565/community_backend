var express = require('express')
var fs = require('fs')
var path = require('path')
var Server = require('mongodb').Server
var multer = require('multer')
var Db = require('mongodb').Db
var config = require('../config/index')
global.config = config
var mongoDb = new Db(config.mongoDbName, new Server(config.mongoDbHost, config.mongoDbPort, {safe: true}))
var router = express.Router()
var jwt = require('jwt-simple')
var ObjectId = require('mongodb').ObjectID
var url = require('url');

var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/images')
    },
    filename: function (req, file, cb) {
        console.log(file)
        var date = new Date()
        var Month = date.getMonth() + 1,
            Seconds = new Date().getSeconds()
        Month = Month < 10 ? "0" + Month : Month
        var Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        var Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        Seconds = Seconds < 10 ? "0" + Seconds : Seconds
        date = date.getFullYear() + "" + Month + "" + Hours + "" + Minutes + "" + Seconds + ""
        var type = (file.originalname).split(".");
        cb(null, file.fieldname + date + "." + type[type.length - 1])
    }
})
var uploadImg = multer({storage: storage})
uploadImg = uploadImg.single('upload')

function verification(req, res, next) {
    var token = req.cookies[config.cookieName] || req.body.token
}

function encrypt(userId, userName) {
    return jwt.encode({
        userId: userId,
        userName: userName,
        expires: new Date().getTime() + (1000 * 60 * 60 * 24 * config.expires)
    }, config.jwtSecret)
}

function decrypt(str) {
    return jwt.decode(str, config.jwtSecret)
}

function encrypt(id, user) {
    return jwt.encode({
        id: id,
        user: user,
        expires: new Date().getTime() + (1000 * 60 * 60 * 24 * config.expires)
    }, config.jwtSecret)
}

var User = function (user) {
    this.user = user.username
    this.password = user.password
    this.email = user.email
}

var Article = function (article) {
    this.title = article.title
    this.content = article.content
}


function auth(user, callback) {
    mongoDb.open(function (err, db) {
        db.collection('Account', function (err, collection) {
            // collection.findOne({_id:ObjectId(token.userId)}, function(err, user) {
            collection.findOne({email:user.email}, function (err, newUser) {
                mongoDb.close()
                if (err) {
                    return callback(err)
                }
                // console.log('user', user)
                callback(null, newUser)
            })
        })
    })
}

function fetchArticle(req, callback) {
    mongoDb.open(function (err, db) {
        db.collection('Article', function (err, collection) {
            // collection.findOne({_id:ObjectId(token.userId)}, function(err, user) {
            collection.find({}, {
                limit: req.limit,
                skip: (req.page - 1) * req.limit
            }).toArray(function (err, list) {
                mongoDb.close()
                var page = {}
                page["count"] = req.page
                page["limitNum"] = req.limit
                callback(null, list, page)
            })
        })
    })
}

function fetchDetail(req, callback) {
    mongoDb.open(function (err, db) {
        db.collection('Article', function (err, collection) {
            // collection.findOne({_id:ObjectId(token.userId)}, function(err, user) {
            collection.findOne({_id: ObjectId(req.id)}, function (err, detail) {
                mongoDb.close()
                if (err) {
                    return callback(err)
                }
                // console.log(detail)
                callback(null, detail)
            })
        })
    })
}

function insertArticle(req, callback) {
    mongoDb.open(function (err, db) {
        db.collection('Article', function (err, collection) {
            collection.findOne({}, function () {
                collection.insert({
                    "account_id": req.account_id,
                    "account_name": req.account_name,
                    "title": req.title,
                    "content": req.content,
                    "add_date": Date.parse(new Date())
                }, {
                    safe: true
                }, function (err) {
                    if (err) {
                        return callback(err)
                    }
                    mongoDb.close()
                    callback('ok')
                })
            })
        })
    })
}

module.exports = function(app) {
    app.get('/', function (req, res) {
        //自己生成的token，和后台管理里填入的一样
        var token = 'lance10030';
        console.log(token,'收到请求');
        //获取请求中的数据
        var url_params = url.parse(req.url, true);
        var query = url_params.query;
        var signature = query.signature;
        var timestamp = query.timestamp;
        var nonce = query.nonce;
        //字典排序
        var tmpArr = [token, timestamp, nonce];
        tmpArr.sort();
        //对排序后的结果进行加密
        var sha1 = crypto.createHash('sha1');
        var msg = tmpArr[0] + tmpArr[1] + tmpArr[2];
        sha1.update(msg);
        msg = sha1.digest('hex');
        // 将加密后的结果与微信请求过来的 signature 进行验证
        if (msg == signature) {
            console.log('验证成功');
            res.end(query.echostr);
        } else {
            console.log('验证失败');
            res.end('微信登录验证失败，请重试！');
        }
    });


    app.get('*', function (req, res, next) {

        if (req.url.indexOf('/api') > -1 || req.url.indexOf('/images') > -1 || req.url.indexOf('favicon.ico') > -1) {
            next()
        } else {

        }

    })

    app.post('/rest-Auth/login', function (req, res) {
        var user = new User(req.body)
        auth(user, function (err, newUser) {
            if (err) {
                return res.json({code: 1009, messgage: err})
            }
            if (newUser) {
                console.log(user.password, newUser.pwd)
                if (user.password == newUser.pwd) {
                    var token = encrypt(newUser._id, newUser.user)
                    //res.cookie(config.cookieName,JSON.stringify(user))
                    var data = {'user': newUser.user, 'token': token}
                    res.end(JSON.stringify({code: 1000, messgage: "登录成功", data: data}))
                } else {
                    res.end(JSON.stringify({code: 1001, messgage: "密码错误"}))
                }
            } else {
                res.end(JSON.stringify({code: 1002, messgage: "用户名不存在"}))
            }
        })
    })

    app.post('/rest-Auth/logout', function (req, res) {
        var user = new User(req.body)
        auth(user, function (err, newUser) {
            if (err) {
                return res.json({code: 1009, messgage: err})
            }
            if (newUser) {
                if (user.password === newUser.pwd) {
                    var data = {'user': newUser.user}
                    res.end(JSON.stringify({code: 1000, messgage: "退出成功", data: data}))
                } else {
                    res.end(JSON.stringify({code: 1001, messgage: "退出失败"}))
                }
            } else {
                res.end(JSON.stringify({code: 1002, messgage: "退出失败"}))
            }
        })
    })
    app.get('/api/article/:page/:limit', function (req, res) {
            var data = req.params
            data.page = Number(req.params.page)
            data.limit = Number(req.params.limit)
            fetchArticle(req.params, function (err, article) {
                if (err) {
                    return res.json({code: 1009, messgage: err})
                }
                if (article) {
                    res.json({code: 1000, data: article})
                }
            })
        }
    )
    app.get('/api/detail', function (req, res) {
            // console.log(req)
            fetchDetail(req, function (err, detail) {
                if (err) {
                    return res.json({code: 1009, messgage: err})
                }
                if (detail) {
                    res.json({code: 1000, data: detail})
                } else {
                    res.json({code: 1000, data: null})
                }
            })
        }
    )
    app.post('/api/article_upload', function (req, res) {
            var newArticle = new Article(req.body)
            console.log(newArticle)
            insertArticle(newArticle, function (err, state) {
                if (err) {
                    return res.json({code: 1009, messgage: err})
                }
                if (state) {
                    res.json({code: 1000, message: 'ok'})
                } else {
                    res.json({code: 1000, message: 'ok'})
                }

            })
        }
    )
};

