var url = require('url');

var crypto = require('crypto');

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
    
    /*云音乐*/
    app.post('/api/list',function (req,res) {
        res.send({
            message:'bingo',
            data:[
                {
                    intro:'话语速爆新歌',
                    pic:'http://p1.music.126.net/tycPEo_4NavAkecZgFrXvA==/19093019416714904.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
                    listeners:'657.4万'
                },
                {
                    intro:'华语｜承蒙你出现 够我喜欢好多年',
                    pic:'http://p1.music.126.net/yiQIOykXyrGz9QWILZjcRw==/19207368625983378.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
                    listeners:'657.4万'
                },
                {
                    intro:'浙江潮 | 一份来自江南的独立音乐地图',
                    pic:'http://p1.music.126.net/nSQ4VP6bJs3xVa3rJH3_VA==/109951162913391080.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
                    listeners:'657.4万'
                },
                {
                    intro:'梦境闪回丨在后摇里听见情绪',
                    pic:'http://p1.music.126.net/4917ekuN-PUWqd3xxcxZgw==/19212866184091093.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
                    listeners:'657.4万'
                },
                {
                    intro:'民谣地图｜你在哪座城市,怀念带不走的谁',
                    pic:'http://p1.music.126.net/R3gczZoPomyrRmOmeSwTbw==/109951162948624915.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
                    listeners:'657.4万'
                },
                {
                    intro:'1976-2017 苹果发布会及广告音乐精选',
                    pic:'http://p1.music.126.net/9l0JFbiWEIwDcmBvcu-3fQ==/109951163023970954.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
                    listeners:'657.4万'
                }

            ]
        })
    });
    app.post('/api/songs',function (req,res) {
        res.send({
            message:'bingo',
            data:[
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'一步成诗',
                    author:'王安诗',
                    album:'一步成诗'
                },
                {
                    name:'Give me a chance',
                    author:'胡彦斌Tiger Hu',
                    album:'give me a chance'
                },
                {
                    name:'小棋童',
                    author:'双笙',
                    album:'小棋童'
                },
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
            ]
        })
    });
    app.post('/api/recommend',function (req,res) {
        res.send({
            message:'bingo',
            data:['偶像','一箱情愿的不舍','Taylor Swift','双笙','周杰伦','不能说的秘密','老中医','花粥']
        })
    });
    app.post('/api/hotSongs',function (req,res) {
        res.send({
            message:'bongo!',
            data:[
                {
                    name:'你曾说（合唱版）',
                    author:'周品-催子格',
                    album:'那年花开月正圆 电视原声带'
                },
                {
                    name:'time to say goodbye',
                    author:'Alex',
                    album:'小轩窗，正梳妆，相顾无言惟有泪千行'
                },
                {
                    name:'一步成诗',
                    author:'王安诗',
                    album:'一步成诗'
                },
                {
                    name:'Give me a chance',
                    author:'胡彦斌Tiger Hu',
                    album:'give me a chance'
                },
                {
                    name:'小棋童',
                    author:'双笙',
                    album:'小棋童'
                },
                {
                    name:'summertime sadness',
                    author:'Del Rey',
                    album:'打雷啦'
                },
                {
                    name:'莉莉安',
                    author:'宋冬野',
                    album:'你好呀，李银河'
                },
                {
                    name:'明年今日',
                    author:'陈奕迅',
                    album:'人面不知何处去，桃花依旧笑春风'
                },
                {
                    name:'红玫瑰',
                    author:'陈奕迅',
                    album:'雨打梨花深闭门，冷雨敲窗被未温'
                },
                {
                    name:'Lil Mama',
                    author:'jain',
                    album:'may u have a beautiful sunset'
                }
            ]
        })
    });
    //订票系统
    app.post ('/api/getList',function (req,res) {
        res.send({
            message:"bingo!",
            data:[
                {name:'lance1',num:1,gender:'male'},
                {name:'lance2',num:2,gender:'female'},
                {name:'lance3',num:3,gender:'female'},
                {name:'lance4',num:4,gender:'male'},
                {name:'lance5',num:5,gender:'female'}
            ]
        })
    })
    app.post('/getSeatStatus',function (req,res) {
        res.send({
                state: 0,
                message: "ok",
                data: [
                    {
                        "row": "D101",
                        "sits": [
                            {
                                "id": "D10152",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排52座"
                            },
                            {
                                "id": "D10150",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排50座"
                            },
                            {
                                "id": "D10148",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排48座"
                            },
                            {
                                "id": "D10146",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排46座"
                            },
                            {
                                "id": "D10144",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排44座"
                            },
                            {
                                "id": "D10142",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排42座"
                            },
                            {
                                "id": "D10140",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排40座"
                            },


                            {
                                "id": "D1null1",
                                "type": "D",
                                "price": "",
                                "status": "white",
                                "area": "D1",
                                "detail": "过道"
                            },
                            {
                                "id": "D1null2",
                                "type": "D",
                                "price": "",
                                "status": "white",
                                "area": "D1",
                                "detail": "过道"
                            },

                            {
                                "id": "D10138",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排38座"
                            },
                            {
                                "id": "D10136",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排36座"
                            },
                            {
                                "id": "D10134",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排34座"
                            },
                            {
                                "id": "D10132",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排32座"
                            },
                            {
                                "id": "D10130",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排30座"
                            },
                            {
                                "id": "D10128",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排28座"
                            },
                            {
                                "id": "D10126",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区01排26座"
                            }
                        ]
                    },
                    {
                        "row": "D102",
                        "sits": [
                            {
                                "id": "D10252",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排52座"
                            },
                            {
                                "id": "D10250",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排50座"
                            },
                            {
                                "id": "D10248",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排48座"
                            },
                            {
                                "id": "D10246",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排46座"
                            },
                            {
                                "id": "D10244",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排44座"
                            },
                            {
                                "id": "D10242",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排42座"
                            },
                            {
                                "id": "D10240",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排40座"
                            },

                            {
                                "id": "D1null3",
                                "type": "D",
                                "price": "",
                                "status": "white",
                                "area": "D1",
                                "detail": "过道"
                            },
                            {
                                "id": "D1null4",
                                "type": "D",
                                "price": "",
                                "status": "white",
                                "area": "D1",
                                "detail": "过道"
                            },


                            {
                                "id": "D10238",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排38座"
                            },
                            {
                                "id": "D10236",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排36座"
                            },
                            {
                                "id": "D10234",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排34座"
                            },
                            {
                                "id": "D10232",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排32座"
                            },
                            {
                                "id": "D10230",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排30座"
                            },
                            {
                                "id": "D10228",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排28座"
                            },
                            {
                                "id": "D10226",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区02排26座"
                            }
                        ]
                    },
                    {
                        "row": "D103",
                        "sits": [
                            {
                                "id": "D10352",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排52座"
                            },
                            {
                                "id": "D10350",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排50座"
                            },
                            {
                                "id": "D10348",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排48座"
                            },
                            {
                                "id": "D10346",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排46座"
                            },
                            {
                                "id": "D10344",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排44座"
                            },
                            {
                                "id": "D10342",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排42座"
                            },
                            {
                                "id": "D10340",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排40座"
                            },

                            {
                                "id": "D1null5",
                                "type": "D",
                                "price": "",
                                "status": "white",
                                "area": "D1",
                                "detail": "过道"
                            },
                            {
                                "id": "D1null6",
                                "type": "D",
                                "price": "",
                                "status": "white",
                                "area": "D1",
                                "detail": "过道"
                            },

                            {
                                "id": "D10338",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排38座"
                            },
                            {
                                "id": "D10336",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排36座"
                            },
                            {
                                "id": "D10334",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排34座"
                            },
                            {
                                "id": "D10332",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排32座"
                            },
                            {
                                "id": "D10330",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排30座"
                            },
                            {
                                "id": "D10328",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排28座"
                            },
                            {
                                "id": "D10326",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区03排26座"
                            }
                        ]
                    },
                    {
                        "row": "D104",
                        "sits": [
                            {
                                "id": "D10458",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排58座"
                            },
                            {
                                "id": "D10456",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排56座"
                            },
                            {
                                "id": "D10454",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排54座"
                            },
                            {
                                "id": "D10452",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排52座"
                            },
                            {
                                "id": "D10450",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排50座"
                            },
                            {
                                "id": "D10448",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排48座"
                            },
                            {
                                "id": "D10446",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排46座"
                            },
                            {
                                "id": "D10444",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排44座"
                            },
                            {
                                "id": "D10442",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排42座"
                            },
                            {
                                "id": "D10440",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排40座"
                            },
                            {
                                "id": "D10438",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排38座"
                            },
                            {
                                "id": "D10436",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排36座"
                            },
                            {
                                "id": "D10434",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排34座"
                            },
                            {
                                "id": "D10432",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排32座"
                            },
                            {
                                "id": "D10430",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排30座"
                            },
                            {
                                "id": "D10428",
                                "type": "D",
                                "price": "58000",
                                "status": "occupied",
                                "area": "D1",
                                "detail": "D1区04排28座"
                            }
                        ]
                    }
                ]
            }
        )
    })
    app.post('/api/getSeatStatus',function (req,res) {
       res.send({
           "state": 0,
           "message": "ok",
           "data": [
               {
                   "row": "B209",
                   "sits": [
                       {
                           "id": "B20901",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排01座"
                       },
                       {
                           "id": "B20902",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排02座"
                       },
                       {
                           "id": "B20903",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排03座"
                       },
                       {
                           "id": "B20904",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排04座"
                       },
                       {
                           "id": "B20905",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排05座"
                       },
                       {
                           "id": "B20906",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排06座"
                       },
                       {
                           "id": "B20907",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排07座"
                       },
                       {
                           "id": "B20908",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排08座"
                       },
                       {
                           "id": "B20909",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排09座"
                       },
                       {
                           "id": "B20910",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排10座"
                       },
                       {
                           "id": "B20911",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排11座"
                       },
                       {
                           "id": "B20912",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排12座"
                       },
                       {
                           "id": "B20913",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排13座"
                       },
                       {
                           "id": "B20914",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排14座"
                       },
                       {
                           "id": "B20915",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排15座"
                       },
                       {
                           "id": "B20916",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排16座"
                       },
                       {
                           "id": "B20917",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排17座"
                       },
                       {
                           "id": "B20918",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排18座"
                       },
                       {
                           "id": "B20919",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区09排19座"
                       }
                   ]
               },
               {
                   "row": "B208",
                   "sits": [
                       {
                           "id": "B20801",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排01座"
                       },
                       {
                           "id": "B20802",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排02座"
                       },
                       {
                           "id": "B20803",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排03座"
                       },
                       {
                           "id": "B20804",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排04座"
                       },
                       {
                           "id": "B20805",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排05座"
                       },
                       {
                           "id": "B20806",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排06座"
                       },
                       {
                           "id": "B20807",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排07座"
                       },
                       {
                           "id": "B20808",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排08座"
                       },
                       {
                           "id": "B20809",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排09座"
                       },
                       {
                           "id": "B20810",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排10座"
                       },
                       {
                           "id": "B20811",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排11座"
                       },
                       {
                           "id": "B20812",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排12座"
                       },
                       {
                           "id": "B20813",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排13座"
                       },
                       {
                           "id": "B20814",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排14座"
                       },
                       {
                           "id": "B20815",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排15座"
                       },
                       {
                           "id": "B20816",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排16座"
                       },
                       {
                           "id": "B20817",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排17座"
                       },
                       {
                           "id": "B20818",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排18座"
                       },
                       {
                           "id": "B20819",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区08排19座"
                       }
                   ]
               },
               {
                   "row": "B207",
                   "sits": [
                       {
                           "id": "B20701",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排01座"
                       },
                       {
                           "id": "B20702",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排02座"
                       },
                       {
                           "id": "B20703",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排03座"
                       },
                       {
                           "id": "B20704",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排04座"
                       },
                       {
                           "id": "B20705",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排05座"
                       },
                       {
                           "id": "B20706",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排06座"
                       },
                       {
                           "id": "B20707",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排07座"
                       },
                       {
                           "id": "B20708",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排08座"
                       },
                       {
                           "id": "B20709",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排09座"
                       },
                       {
                           "id": "B20710",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排10座"
                       },
                       {
                           "id": "B20711",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排11座"
                       },
                       {
                           "id": "B20712",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排12座"
                       },
                       {
                           "id": "B20713",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排13座"
                       },
                       {
                           "id": "B20714",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排14座"
                       },
                       {
                           "id": "B20715",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排15座"
                       },
                       {
                           "id": "B20716",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排16座"
                       },
                       {
                           "id": "B20717",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排17座"
                       },
                       {
                           "id": "B20718",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排18座"
                       },
                       {
                           "id": "B20719",
                           "type": "B",
                           "price": "12000",
                           "status": "wait_to_order",
                           "area": "B2",
                           "detail": "B2区07排19座"
                       }
                   ]
               }
           ]
       })
   })
    app.post('/api/submitOrder',function (req,res) {
        res.send({
            message:"bingo!",
            data:'收到数据了'
        })
    })
    app.post('/api/searchOrder',function (req,res) {
        res.send({
            message:"bingo!",
            data:{
                area:'A1',
                pos:['A10102','A10103','A10104'],
                price:'1000.00'
            }
        })
    })
    //
    /*['http://p1.music.126.net/tycPEo_4NavAkecZgFrXvA==/19093019416714904.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
       'http://p1.music.126.net/yiQIOykXyrGz9QWILZjcRw==/19207368625983378.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
       'http://p1.music.126.net/nSQ4VP6bJs3xVa3rJH3_VA==/109951162913391080.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
       'http://p1.music.126.net/4917ekuN-PUWqd3xxcxZgw==/19212866184091093.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp'
       'http://p1.music.126.net/R3gczZoPomyrRmOmeSwTbw==/109951162948624915.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
       'http://p1.music.126.net/9l0JFbiWEIwDcmBvcu-3fQ==/109951163023970954.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp'
    ]*/
};

