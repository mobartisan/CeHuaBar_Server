//将数据库结果集转化为定义的响应结果格式
var conf = require('../conf/conf');
var dateutil = require("../middlewares/dateFormat");
var toKnView = function (resultJson) {
    var knview = {};
    knview.kn_id = resultJson.kn_id;
    knview.kn_name = resultJson.kn_name;
    knview.kn_type = resultJson.kn_type;
    knview.kn_desc = resultJson.kn_desc;
    knview.kn_writer_name = resultJson.kn_writer_name;
    //dateutil.dateFormatByFmt(new Date(),"yyyy-MM-dd");
    knview.kn_date = "2016-09-09";//dateutil.dateFormatByFmt(new Date(resultJson.kn_date), "yyyy-MM-dd");
    knview.kn_brw_count = resultJson.kn_brw_count;
    knview.kn_device_code = resultJson.kn_device_code;
    return knview;
};

module.exports = toKnView;