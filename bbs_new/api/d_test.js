/**
 * Created by mikebian on 16/7/23.
 */
//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var dUserEntity = require('../mongodb/d_user_schema').DUserEntity;
var Promise = require('bluebird');
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var logger = require('../middlewares/log').logger;
var param
    =
{
    emailString: "woyoushmy8@126.com",
    phoneString: "18652010592",
    usernameString: "bianke",
    passwordString: "123456"
}
module.exports = {

//----------------------------------------------------------------
    //增加一条User数据
    register: function (req, res, next) {
        var fields = {
            email: param.emailString,
            phone: param.phoneString,
            username: param.usernameString,
            password: param.passwordString,
            update_date: Date.now(),
            create_date: Date.now()
        }; // 待返回的字段
        //增加一条互数据
        var obj = {};
        dUserEntity.addRecordAsync(fields).then(function (docs) {
            logger.info("正常时 插入结果为" + docs);
            obj.object = docs;
            obj.message = "插入成功"
            obj.code = ResultCode.SUCCESS
        }, function (error) {
            logger.info("报错后 插入结果为" + error);
            obj.error = error;
            obj.message = "插入失败"
            obj.code = ResultCode.ERROR
        }).then(function () {
            logger.debug("final 发送")
            jsonWrite(req, res, obj.code, obj.message, obj, true);
        });
    }
}