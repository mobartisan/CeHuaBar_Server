//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var MD5Crypto = require('../middlewares/MD5Crypto');
var conf = require('../conf/conf');
var uuid = require('node-uuid');
var logger = require('../middlewares/log').logger;
var regexCheck = require('../middlewares/regexCheck');
var httpSend = require('../middlewares/httpSend');
module.exports = {
    initTestPost: function (req, res, next) {
        logger.debug("initTestPost");
        var bodyParam = {
            uid: '1000'
        }
        var queryParam = {
            sessionId: '123123123'
        }
        var path = '/mpp/api/v1.0/test/initTestMainPage';
        httpSend.post(path, bodyParam, queryParam, function (data) {
            logger.debug(data);
            var result = JSON.parse(data);
            if (result["success"] == true) {
                var obj = result.obj;
                res.render('my_test_main', {
                    "monthCount": obj["monthCount"],
                    "accuracy": obj["accuracy"],
                    "outrate": obj["outrate"],
                    "title": "在线考试"
                });
            }
        }, function (e) {
            logger.error('problem with request: ' + e.message);
        }, function () {
            logger.info("complete");
        });
    },
    initTestGet: function (req, res, next) {
        logger.debug("initTestGet");
        var param = {
            uid: '1000'
        }
        var path = '/mpp/api/v1.0/test/initTestMainPage2';
        httpSend.get(path, param, function (data) {
            logger.debug(data);
            var result = JSON.parse(data);
            if (result["success"] == true) {
                var obj = result.obj;
                res.render('my_test_main', {
                    "monthCount": obj["monthCount"],
                    "accuracy": obj["accuracy"],
                    "outrate": obj["outrate"],
                    "title": "在线考试"
                });
            }
        }, function (e) {
            logger.error('problem with request: ' + e.message);
        }, function () {
            logger.info("complete");
        });
    },
    initTestPut: function (req, res, next) {
        logger.debug("initTestPut");
        var bodyParam = {
            uid: '1000'
        }
        var queryParam = {
            sessionId: '123123123'
        }
        var path = '/mpp/api/v1.0/test/initTestMainPage3';
        httpSend.put(path, bodyParam, queryParam, function (data) {
            logger.debug(data);
            var result = JSON.parse(data);
            if (result["success"] == true) {
                var obj = result.obj;
                res.render('my_test_main', {
                    "monthCount": obj["monthCount"],
                    "accuracy": obj["accuracy"],
                    "outrate": obj["outrate"],
                    "title": "在线考试"
                });
            }
        }, function (e) {
            logger.error('problem with request: ' + e.message);
        }, function () {
            logger.info("complete");
        });
    },
    initTestDelete: function (req, res, next) {
        logger.debug("initTestDelete");
        var param = {
            uid: '1000'
        }
        var path = '/mpp/api/v1.0/test/initTestMainPage2';
        httpSend.get(path, param, function (data) {
            logger.debug(data);
            var result = JSON.parse(data);
            if (result["success"] == true) {
                var obj = result.obj;
                res.render('my_test_main', {
                    "monthCount": obj["monthCount"],
                    "accuracy": obj["accuracy"],
                    "outrate": obj["outrate"],
                    "title": "在线考试"
                });
            }
        }, function (e) {
            logger.error('problem with request: ' + e.message);
        }, function () {
            logger.info("complete");
        });
    }
}
;