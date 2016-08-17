/**
 * Created by mikebian on 16/7/23.
 */
//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonSend = require('../middlewares/jsonWrite');
var logger = require('../middlewares/log').logger;
var Promise = require('bluebird');
var DB = require('../mongodb/mongo_helper');
var uuid = require('node-uuid');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

module.exports = {
    /**
     * 通过question_id找到一条数据(基于实例方法的查询)
     * @param req
     * @param res
     * @param next
     */
    operate: function (req, res, next) {
        var doneList = function (result) {
            var obj = {};
            var exlist = [];
            for (var i = 0; i < result.length; i++) {
                exlist[i] = toView(result[i]);
            }
            obj.list = exlist;
            jsonSend(req, res, ResultCode.SUCCESS, "发送成功", obj, true);
        };
        var preadFile = function () {
            var filename = path.join(path.dirname(__dirname), 'table.json');
            // var readFileAsync = Promise.promisify(fs.readFile);
            fs.readFileAsync(filename, "utf8")
                .then(function (data) {
                    logger.debug(data);
                    //return readFileAsync(filename, "utf8");
                }).catch(function (err) {
                console.log(err);
            });
        };
        var toView = function (item) {
            var view = {};
            view.email = item.email;
            logger.debug("email = " + item.email);
            return view;
        }
        var conditions = {};
        var fields = {email: 1}; // 待返回的字段
        //查询duo条数据
        preadFile();
        // DB.find('t_user', conditions, fields, function (error, docs) {
        //     if (error) {
        //         logger.error(error);
        //         jsonSend(req, res, ResultCode.RESP_ERROR_UNKNOW, "错误", null, false);
        //         return;
        //     }
        //     doneList(docs);
        // });
        DB.findAsync('t_user', conditions, fields).then(function (data) {
            logger.info("findAsync");
            doneList(data);
        }).catch(function (err) {
            logger.error(err);
            jsonSend(req, res, ResultCode.RESP_ERROR_UNKNOW, "错误", null, false);
            return;
        });
    },
}