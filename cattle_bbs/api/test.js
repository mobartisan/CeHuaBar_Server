//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var logger = require('../middlewares/log').logger;
var toTsView = require('../middlewares/toTsView');
var ts = require('../db/ts');
module.exports = {
    getTestPage: function (req, res, next) {
        var count = req.query.count;
        var done = function (result) {
            var obj = {};
            //var exlist = [];
            // for (var i = 0; i < result.length; i++) {
            //     exlist[i] = toTsView(result[i]);
            // }
            obj.data = toTsView(result);
            //obj.list = exlist;
            //logger.debug("list= " + obj.list);

            obj.count = Number(count) + 1;
            obj.question = "请问小明和小红何时结婚"
            obj.answerList = [{num: "1", value: "fuckyou"}, {num: "2", value: "fuckme"}, {
                num: "3",
                value: "fuckother"
            }];
            jsonWrite(req, res, ResultCode.SUCCESS, "发送成功", obj, true);
        };

        var id = "exam-00" + (Number(count) + 1);
        ts.ts.findExamById(id).then(function (result) {
            if (!result) {
                logger.debug("失败");
                return jsonWrite(req, res, ResultCode.RESP_LOGINERROR_USER, "获取失败", null, false);
            }
            done(result.toJSON());
        }).catch(function (err) {
            logger.error('处理登录出错:' + err.stack);
            jsonWrite(req, res, ResultCode.RESP_ERROR_UNKNOW, "登陆失败，未知错误", null, false);
        });
    },
    answerQuestion: function (req, res, next) {
        //var serial_num = req.param('serial_num')
        //logger.debug("serial_num= " + serial_num);
        var submit_content = req.body.submit_content;
        logger.debug("submit_conten = " + submit_content);
        var question_id = req.body.question_id;
        logger.debug("question_id = " + question_id);
        var sessionId = req.query.sessionId;
        logger.debug("sessionId = " + sessionId);
        var obj = {};
        //本月共答对
        obj.ok = 0;
        jsonWrite(req, res, ResultCode.SUCCESS, "答题成功", obj, true);
    },
    //post
    initTestMainPage: function (req, res, next) {
        var uid = req.body.uid;
        logger.debug("=======" + uid);

        var sessionId = req.query.sessionId;
        logger.debug("=======" + sessionId);
        var obj = {};
        //本月共答对
        obj.monthCount = 26;
        //本月正确率
        obj.accuracy = "40%"
        //超过了
        obj.outrate = "80%";
        jsonWrite(req, res, ResultCode.SUCCESS, "获取成功", obj, true);
    },
    //get
    initTestMainPageget: function (req, res, next) {
        var sessionId = req.query.sessionId;
        logger.debug(sessionId);
        var obj = {};
        //本月共答对
        obj.monthCount = 26;
        //本月正确率
        obj.accuracy = "40%"
        //超过了
        obj.outrate = "80%";
        jsonWrite(req, res, ResultCode.SUCCESS, "获取成功", obj, true);
    },
    //put
    initTestMainPagePut: function (req, res, next) {
        var uid = req.body.uid;
        logger.debug("=======" + uid);

        var sessionId = req.query.sessionId;
        logger.debug("=======" + sessionId);
        var obj = {};
        //本月共答对
        obj.monthCount = 26;
        //本月正确率
        obj.accuracy = "40%"
        //超过了
        obj.outrate = "80%";
        jsonWrite(req, res, ResultCode.SUCCESS, "获取成功", obj, true);
    },
    //delete
    initTestMainPageDelete: function (req, res, next) {
        var sessionId = req.query.sessionId;
        logger.debug(sessionId);
        var obj = {};
        //本月共答对
        obj.monthCount = 26;
        //本月正确率
        obj.accuracy = "40%"
        //超过了
        obj.outrate = "80%";
        jsonWrite(req, res, ResultCode.SUCCESS, "获取成功", obj, true);
    }
}