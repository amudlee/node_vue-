var createError = require('http-errors');
var express = require('express');
var path = require('path');//
var cookieParser = require('cookie-parser');//获取cookie信息进行转化
var logger = require('morgan');//日志输出
var ejs = require('ejs');

var app = express();
//使用cors解决跨域问题，并设置响应头。注意的是一定要写在引入路由前
var cors = require('cors'); 
app.use(cors());
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

// 引入对应的二级路由的模板
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
// view engine setup
//制定视图引擎是指向views这个文件夹的
app.set('views', path.join(__dirname, 'views'));
// 设置视图引擎后缀为html
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.js只定义一级路由
app.use('/', indexRouter);//仅仅针对访问地址是首页就会加载index模块下的数据
app.use('/users', usersRouter);//仅仅针对访问地址是用户管理的返回
app.use('/goods', goodsRouter);

app.use(cors());  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
  next(createError(404));
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
