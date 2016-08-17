//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonpSend = require('../middlewares/jsonpSend');
var MD5Crypto = require('../middlewares/MD5Crypto');
var sessionCrypto = require('../middlewares/sessionCrypto');
var toUserView = require('../middlewares/toUserView');
var user = require('./user');
var rediscontrol = require('../redis/rediscontrol');
var conf = require('../conf/conf');
var uuid = require('node-uuid');
var logger = require('../middlewares/log').logger;
var regexCheck = require('../middlewares/regexCheck');

module.exports = {
    //健康状态监测
    isAlive: function (req, res, next) {
        jsonpSend(req, res, ResultCode.SUCCESS, "API IS RUN!", null, true);
    },
    //用户登陆处理
    login: function (req, res, next) {
        var userName = req.query.username;
        var password = req.query.password;
        console.log("username = " + userName);
        var type = (typeof req.query.type === 'undefined') ? 1 : req.query.type;
        if ((typeof userName === 'undefined') || (typeof password === 'undefined')) {
            return jsonpSend(req, res, ResultCode.ERROR, "参数错误", null, false);
        }
        var done = function (result) {
            if (password == result.password) {
                logger.info("login successful........");
                var obj = {};
                req.sessionID = 'dfdsf';
                req.session.regenerate(function (err) {
                    if (err) {
                        logger.error('重新生成session失败:' + err);
                        jsonpSend(req, res, ResultCode.RESP_ERROR_UNKNOW, "登陆失败，未知错误", null, false);
                    }
                    else {
                        req.session.username = result.username;
                        req.session.uid = result.uid;
                        obj.sid = sessionCrypto(req.sessionID, conf.session_option.secret);
                        jsonpSend(req, res, ResultCode.SUCCESS, "登录成功", obj, true);
                        user.Login_log.createLoginLog(result.uid, req.header('user-agent'), req.connection.remoteAddress);//记录用户登陆日志
                        rediscontrol.setid_session(req.session.uid.toString(), req.session.uid);
                    }
                });
            }
            else {
                jsonpSend(req, res, ResultCode.RESP_LOGINERROR_PASSWORD, "登陆失败，密码错误", null, false);
            }
        };
        if (type == 1) {
            console.log("type = " + type)
            user.User.findUserByAccountName(userName).then(function (result) {

                if (!result) {
                    logger.debug("login failed........登录失败，用户不存在");
                    return jsonpSend(req, res, ResultCode.RESP_LOGINERROR_USER, "登录失败，用户不存在", null, false);
                }
                done(result.toJSON());
            }).catch(function (err) {
                logger.error('处理登录出错:' + err.stack);
                jsonpSend(req, res, ResultCode.RESP_ERROR_UNKNOW, "登陆失败，未知错误", null, false);
            });
        }
        ;
    },
    loginByid: function (req, res, next) {
        var uid = req.query.uid;
        console.log("uid = " + uid);
        var type = (typeof req.query.type === 'undefined') ? 1 : req.query.type;
        if ((typeof uid === 'undefined') || (typeof type === 'undefined')) {
            return jsonpSend(req, res, ResultCode.ERROR, "参数错误", null, false);
        }
        if (type == 1) {
            console.log("type = " + type)
            user.User.findUserById(uid).then(function (result) {

                console.log("result= " + result.uid);
                if (!result) {
                    logger.debug("login failed........登录失败，用户不存在");
                    return jsonpSend(req, res, ResultCode.RESP_LOGINERROR_USER, "登录失败，用户不存在", null, false);
                }
                //done(result.toJSON());
            }).catch(function (err) {
                logger.error('处理登录出错:' + err.stack);
                jsonpSend(req, res, ResultCode.RESP_ERROR_UNKNOW, "登陆失败，未知错误", null, false);
            });
        }
    },
    gotoDemo:function (req, res, next) {
        res.render('demo', {title: 'Express'});
    },
    gotoDemo2:function (req, res, next) {
        res.render('demo2', {title: 'Express'});
    }
}
;