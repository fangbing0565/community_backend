var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var compression = require('compression')
var app = express();  //生成一个app实例
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'public'));//设置模板文件所在文件夹
/*app.set('view engine', 'ejs');// 模板引擎为ejs*/
// 这里可以设置为支持html文件
 var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//  加载日志中间件
app.use(bodyParser.json());//加载json的中间件
app.use(bodyParser.urlencoded({ extended: false }));// 加载加载解析urlencoded请求体的中间价
app.use(cookieParser());//解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件目录

//路由放在这里不太好，但是这样写可以将每个路由处理器分成单个的模块，如果路由处理器比较大的话其实也还行；总之这里是可以分离的
/*app.use('/',routes);
app.use('/users', users);*/
/*怎么解决呢？我们把app传递给index文件，app.js作为程序的入口，而index.js作为路由处理器的入口*/
routes(app);
// catch 404 and forward to error handler捕获404错误并且转发到相应的错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
