//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var MD5Crypto = require('../middlewares/MD5Crypto');
var sessionCrypto = require('../middlewares/sessionCrypto');
var toUserView = require('../middlewares/toUserView');
var user = require('../db/user');
var conf = require('../conf/conf');
var uuid = require('node-uuid');
var usersEntity = require('../mongodb/users_schema').UsersEntity;
var usersSchema = require('../mongodb/users_schema').Users;
var logger = require('../middlewares/log').logger;
var regexCheck = require('../middlewares/regexCheck');
var jwt = require('jsonwebtoken');
var secret = require('../conf/secret');
var tokenManager = require('../conf/token_manager');

//原型方式查询一条
var createLoginLog = function (result, req) {
    var fields = {
        uid: result.uid,
        header: req.header('user-agent'),
        username: result.username,
        remoteAddress: req.connection.remoteAddress,
        create_date: Date.now()
    }
    //增加一条互数据
    DB.save('t_user_log', fields, function (error, docs) {
        if (error) {
            logger.error(error);
            res.send(error);
            return;
        }
        logger.info(docs);
        //res.json(docs);
    });
};
module.exports = {
    //用户登陆处理
    login2: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        logger.debug("username = " + username);
        logger.debug("password = " + password);
        if (username == '' || password == '') {
            return jsonWrite(req, res, ResultCode.ERROR, "账号密码为空", null, false);
        }
        //原型方式查询一条
        var findOneUserByLoginInfo = function (username, password) {
            var conditions = {
                name: username
            };
            var fields = {
                user_id: 1,
                name: 1,
                password: 1,
                nick_name: 1,
                wx_account: 1,
                phone: 1,
                head_img_url: 1,
                os_type: 1,
                os_description: 1,
                device_identify: 1,
                create_date: 1,
                create_user_id: 1,
                last_edit_date: 1,
                last_edit_user_id: 1
            }; // 待返回的字段
            //查询一条数据
            usersEntity.findOneByDocAsync( conditions, fields).then(function (docs) {
                done(docs);
            }, function (error) {
                if (error) {
                    logger.error(error);
                    jsonWrite(req, res, ResultCode.ERROR, "参数错误", null, false);
                    return;
                }
            });
            var done = function (docs) {
                if (password == docs.password) {
                    logger.info("login2 successful........");
                    var obj = {};
                    var token = jwt.sign({id: docs.user_id}, secret.secretToken, {expiresInMinutes: tokenManager.TOKEN_EXPIRATION});
                    tokenManager.saveToken(docs.user_id, token);
                    logger.debug("debug =" + token);
                    obj.user_id = docs.user_id;
                    obj.token = token;
                    //logger.debug("sid= " + obj.sid);
                    logger.debug("user_id= " + obj.user_id);
                    jsonWrite(req, res, ResultCode.SUCCESS, "登录成功", obj, true);
                    //createLoginLog(docs, req);//记录用户登陆日志
                }
                else {
                    jsonWrite(req, res, ResultCode.RESP_LOGINERROR_PASSWORD, "登陆失败，密码错误", null, false);
                }
            };

        };

        findOneUserByLoginInfo(username, password);
    },
    point2: function (req, res) {
        var obj = {}
        obj.point = 12;
        logger.debug("get uid" + req.user.id)
        jsonWrite(req, res, ResultCode.SUCCESS, "success", obj, true);
    },
    logout: function (req, res) {
        logger.debug("logout");
        if (req.user) {
            tokenManager.expireToken(req);
            delete req.user;
            jsonWrite(req, res, ResultCode.SUCCESS, "success", null, true);
        }
        else {
            jsonWrite(req, res, ResultCode.RESP_ERROR_NOTLOGIN, "未登录", null, false);
        }
    }
}
;