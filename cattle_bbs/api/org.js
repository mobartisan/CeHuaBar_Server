/**
 * Created by LENOVO on 2016/6/2.
 */
//var redisclient = require('../db/redisclient');
var org = require('../db/Org');
var user = require('../db/user');
var check = function (number) {
    var isChinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; //移动方面最新答复
    var isChinaUnion = /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/; //向联通微博确认并未回复
    var isChinaTelcom = /^(?:133|153|177|18[019])\d{8}$/; //1349号段 电信方面没给出答复，视作不存在
    var isOtherTelphone = /^170([059])\d{7}$/;//其他运营商
    var telphone = number.toString().trim();
    if (telphone.length !== 11) {
        return false;
    }
    if (isChinaMobile.test(telphone)) {
        return true;
    }
    if (isChinaUnion.test(telphone)) {
        return true;
    }
    if (isChinaTelcom.test(telphone)) {
        return true;
    }
    if (isOtherTelphone.test(telphone)) {
        return true;
    }
    return false;
};
org.Depts.getSubDeptsInOrg('302d0c50-3560-11e6-92e1-ffd9ddccc3d7', '', 10).then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err.stack);
});