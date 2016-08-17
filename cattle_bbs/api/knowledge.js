//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var MD5Crypto = require('../middlewares/MD5Crypto');
var toKnView = require('../middlewares/toKnView');
var Kn = require('../db/kn');
var logger = require('../middlewares/log').logger;

module.exports = {
    search: function (req, res, next) {
        var done = function (result) {
            var obj = {};
            var knlist = [];
            for (var i = 0; i < result.length; i++) {
                knlist[i] = toKnView(result[i]);
            }
            obj.list = knlist;
            logger.debug("list= " + obj.list);
            jsonWrite(req, res, ResultCode.SUCCESS, "登录成功", obj, true);
        };
        var code = req.query.keyword;
        Kn.Kns.findKnByCode(code).then(function (result) {
            if (!result) {
                logger.debug("login failed........登录失败，用户不存在");
                return jsonWrite(req, res, ResultCode.RESP_LOGINERROR_USER, "登录失败，用户不存在", null, false);
            }
            done(result.toJSON());
        }).catch(function (err) {
            logger.error('处理登录出错:' + err.stack);
            jsonWrite(req, res, ResultCode.RESP_ERROR_UNKNOW, "登陆失败，未知错误", null, false);
        });
    },
    device_info: function (req, res, next) {
        var device_code = req.query.device_code;
        var obj = {};
        obj.device_code = device_code;
        jsonWrite(req, res, ResultCode.SUCCESS, "登录成功", obj, true);
    }
}
;