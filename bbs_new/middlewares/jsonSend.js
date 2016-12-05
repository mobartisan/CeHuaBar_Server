var redis=require('../redis/rediscontrol');
var conf=require('../conf/conf');
var jsonSend = function (req,res, resultcode, message, ret, succ) {
    var r={code:{ type: Number},
           msg:{ type: String},
           obj:null,
           success:{ type: Boolean, default: false }};
    r.code=resultcode;
    r.msg=message;
    r.obj=ret;
    r.success=succ;
    // if ((message!="注销成功")&&(typeof req.session!='undefined')){
    //     redis.refresh(conf.redisschema.id_session+req.session.userid,conf.redis.ttl);}
    res.json(r);
};

module.exports = jsonSend;