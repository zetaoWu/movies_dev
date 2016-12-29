/**
 * 中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
var mongoose =require('mongoose');
var mongoStore=require('connect-mongo')(session);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var index = require('./routes/index');
var app = express();
app.locals.moment = require('moment');
mongoose.Promise = global.Promise
var dbUrl='mongodb://127.0.0.1:27017/movie';
mongoose.connect(dbUrl);
// 设置模板目录
app.set('views', path.join(__dirname, '/app/views/pages'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//bodyParser.json 与 bodyParser.urlencoded 的解析功能
//bodyParser.json是用来解析json数据格式的。
//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded

// app.use(express.cookieParser());  //cookie解析中间件

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session());
//静态文件 js css lib(bootstrap,jquery)
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  name:'session_id',//设置cookie 中保存 session_id的字段名称
  secret:'imooc',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie:{
    maxAge:6000*60*24 //cookie 的保留时间
  },
  store:new mongoStore({
    url:dbUrl,
    collection:'session',
  }),
  resave:false,
	saveUninitialized:true
}));

//配置  生产 开发环境
if('development'===app.get('env')){
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

module.exports= app;
