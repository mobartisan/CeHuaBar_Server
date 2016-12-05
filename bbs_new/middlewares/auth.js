var jsonWrite = require('./jsonWrite');
var ResultCode = require('../conf/ResultCode');
var logger = require('../middlewares/log').logger;
module.exports = {
    Auth_session: function (req, res, next) {
        if (typeof req.cookies.sid == 'undefined') {
            return jsonWrite(req, res, ResultCode.RESP_ERROR_NOTLOGIN, "用户未登录", null, false);
        }
        if (!req.session.uid) {
            return jsonWrite(req, res, ResultCode.RESP_ERROR_SESSIONILLEGAL, "登录状态已失效，请重新登陆", null, false);
        }
        next();
    },
    Auth_login: function (req, res, next) {
        if (typeof req.cookies.sessionId !== 'undefined') {
            return jsonWrite(req, res, ResultCode.ERROR, "登陆非法", null, false);
        }
        next();
    }
};



