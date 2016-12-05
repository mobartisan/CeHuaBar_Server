var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var conf = require('./conf/conf');
var secret = require('./conf/secret');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')({session: session});
var log4js = require('./middlewares/log');
var fileLog = require('./middlewares/log').logger;
var ResultCode = require('./conf/ResultCode');
var jsonWrite = require('./middlewares/jsonWrite');
var jwt = require('express-jwt');
var tokenManager = require('./conf/token_manager');
var app = express();
var store = new MongoStore({
  url: conf.mongodb.host,
  interval: 120000 // expiration check worker run interval in millisec (default: 60000)
});
app.use(log4js.useLog());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser({uploadDir: './uploads'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: conf.session_option.secret,
  store: store,
  name: conf.session_option.name,
  cookie: conf.session_option.cookie, // expire session in 15 min or 900 seconds
  resave: conf.session_option.resave,
  saveUninitialized: conf.session_option.saveUninitialized
}));

app.use(express.static(path.join(__dirname, 'public')));
//Routes
var routes = {};
routes.dusers = require('./routes/d_users');
routes.dproject = require('./routes/d_project');
routes.dgroup = require('./routes/d_group');
routes.dmoment = require('./routes/d_moment');

app.all('*', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

/**
 * new登陆
 */
app.post('/bbs/api/v1.0/user/login.app', routes.dusers.signin);

/**
 * 注册
 */
app.post('/bbs/api/v1.0/user/register.app', routes.dusers.register);

/**
 * 登出
 */
app.get('/bbs/api/v1.0/user/logout.app', jwt({secret: secret.secretToken}), routes.dusers.logout);
//----------------------------------project-----------------------------------//
/**
 * 添加项目
 */
app.post('/bbs/api/v1.0/project/add.app', jwt({secret: secret.secretToken}), tokenManager.verifyToken, routes.dproject.addProject);

/**
 * 查找所有project
 */
app.get('/bbs/api/v1.0/project/list.app', jwt({secret: secret.secretToken}), tokenManager.verifyToken, routes.dproject.findMyAllProject);
//----------------------------------group-----------------------------------//
/**
 * 添加组
 */
app.post('/bbs/api/v1.0/group/add.app', routes.dgroup.addGroup);

/**
 * 添加组
 */
app.get('/bbs/api/v1.0/group/list.app', routes.dgroup.findGroup);

//----------------------------------moment-----------------------------------//
/**
 * 添加MOMENT
 */
app.post('/bbs/api/v1.0/moment/add.app', jwt({secret: secret.secretToken}), tokenManager.verifyToken, routes.dmoment.addMoment);

/**
 * 添加DISCUSS
 */
app.post('/bbs/api/v1.0/discuss/add.app', jwt({secret: secret.secretToken}), tokenManager.verifyToken, routes.dmoment.addDiscuss);

/**
 * 查找所有moments
 */
app.get('/bbs/api/v1.0/moment/list.app', jwt({secret: secret.secretToken}), tokenManager.verifyToken, routes.dmoment.findPartProjectByAll);

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = app;
