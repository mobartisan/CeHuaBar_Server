/**
 * Created by kingsheol on 2016/5/5.
 */
var conf = require("../conf/conf");
var log4js = require("log4js");
var dateutils = require("../middlewares/dateutils");
log4js.configure(conf.log4js);
var dateFileLog = log4js.getLogger(dateutils.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"));

exports.logger = dateFileLog;
dateFileLog.setLevel('DEBUG');
exports.useLog = function () {
    return log4js.connectLogger(dateFileLog, {level: log4js.levels.INFO});
};