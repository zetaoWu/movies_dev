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
var users = require('./routes/users');
var app = express();
app.locals.moment = require('moment');
mongoose.Promise = global.Promise
var dbUrl='mongodb://127.0.0.1:27017/movie';
mongoose.connect(dbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//bodyParser.json 与 bodyParser.urlencoded 的解析功能
//bodyParser.json是用来解析json数据格式的。
//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded

// app.use(express.cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session());

app.use(session({
  secret:'imooc',
  store:new mongoStore({
    url:dbUrl,
    collection:'session',
  }),
  resave:false,
	saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// app.listen(port);
console.log('imooc started on port ' + port);

module.exports = app;
