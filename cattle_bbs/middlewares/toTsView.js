//将数据库结果集转化为定义的响应结果格式
var conf = require('../conf/conf');
var dateutil = require("../middlewares/dateFormat");
var toTsView = function (resultJson) {
    var tsview = {};
    tsview.question_id = resultJson.question_id;
    tsview.question_type = resultJson.question_type;
    tsview.question_content = resultJson.question_content;
    tsview.optiones = resultJson.optiones;
    tsview.correct_option = resultJson.correct_option;
    tsview.anwser = resultJson.anwser;
    tsview.score = resultJson.score;
    tsview.create_time = "2016-09-09";
    return tsview;
};

module.exports = toTsView;