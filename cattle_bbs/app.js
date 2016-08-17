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
// var RedisStore = require('connect-redis')(session);
var log4js = require('./middlewares/log');
var fileLog = require('./middlewares/log').logger;
var ResultCode = require('./conf/ResultCode');
var jsonWrite = require('./middlewares/jsonWrite');
// var users = require('./routes/users');
var jwt = require('express-jwt');
// var webs = require('./controllers/web');
// var mongod = require('./routes/mongod');
var tokenManager = require('./conf/token_manager');

// var promise = require('./routes/promise');
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
routes.users = require('./routes/users');
routes.project = require('./routes/project');
routes.web = require('./controllers/web');
routes.mongod = require('./routes/mongod');

app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.use(express.static(path.join(__dirname, 'controllers')));
app.use('/', routes.web);
// app.use('/bbs/api/v1.0/', routes.users);
app.use('/bbs/api/v1.0/mongod', routes.mongod);
//用户登陆
app.post('/user/login2.app', routes.users.signin);
//用户登陆
//Logout
app.get('/user/logout.app', jwt({secret: secret.secretToken}), routes.users.logout);

app.get('/bbs/api/v1.0/point2.app',
    jwt({secret: secret.secretToken}),
    tokenManager.verifyToken, routes.users.getPoint);

app.post('/bbs/api/v1.0/project/create.app',
    jwt({secret: secret.secretToken}),
    tokenManager.verifyToken, routes.project.createProject);

app.get('/bbs/api/v1.0/project/list.app',
    jwt({secret: secret.secretToken}),
    tokenManager.verifyToken, routes.project.findList);

app.post('/bbs/api/v1.0/project/member.app',
    jwt({secret: secret.secretToken}),
    tokenManager.verifyToken, routes.project.addMember);

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
