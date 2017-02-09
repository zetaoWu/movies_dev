var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
var mongoose =require('mongoose');
var mongoStore=require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var port = 3000;
var index = require('./routes/index');
var app = express();
var serveStatic=require('serve-static');
app.locals.moment = require('moment');
mongoose.Promise = global.Promise
// var dbUrl='mongodb://127.0.0.1:27017/movie';
// var dbUrl='mongodb://<dbuser>:<dbpassword>@ds147799.mlab.com:47799/movie';
var dbUrl='mongodb://admin:123456@ds147799.mlab.com:47799/movie';
mongoose.connect(dbUrl);
// view engine setup
app.set('views', path.join(__dirname, '/app/views/pages'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//bodyParser.json 与 bodyParser.urlencoded 的解析功能
//bodyParser.json是用来解析json数据格式的。
//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
// app.use(cookieParser);

// app.use(logger('dev')); express 4.0 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session());
app.use(serveStatic(path.join(__dirname, 'public')));

app.use(session({
  secret:'imooc',
  store:new mongoStore({
    url:dbUrl,
    collection:'session',
  }),
  resave:false,
	saveUninitialized:true
}));

//配置  生产 开发环境
var env=process.env.NODE_ENV||'development';

if('development'===env){
  app.set('showStackError',true);//在屏幕上获取error
  app.use(logger(':method :url :status')); //log配置
  app.locals.pretty=true; //格式化
  mongoose.set('debug',true);
}

//路由
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// app.listen(port);
console.log('imooc started on port ' + port);

module.exports = app;
