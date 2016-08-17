//将数据库结果集转化为定义的响应结果格式
var conf=require('../conf/conf');
var toUserView = function (resultJson) {
    var userview={};
    userview.uid=resultJson.id;
    //userview.loginName=resultJson.login_name;
    userview.org=resultJson.org.name;
    userview.dept=resultJson.dept.name;
    userview.position=resultJson.position;
    userview.realName=resultJson.real_name;
    userview.email=resultJson.email;
    userview.mobile=resultJson.main_mobile;
    avatar=resultJson.avatar;
    if (avatar){
        avatar=conf.imagebaseurl+avatar;
    }
    userview.avatar=avatar;
    userview.sipid=resultJson.sip_id;
    userview.sex=resultJson.sex;
    return userview;
};

module.exports = toUserView;