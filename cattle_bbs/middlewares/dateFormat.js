/**
 * Created by kingsheol on 2016/5/10.
 */
var dateFormat = function (date) {
    return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
        + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};
module.exports = {
    dateFormatByFmt: function (datetime, fmt) { //author: meizz
        var o = {
            "M+": datetime.getMonth() + 1, //月份
            "d+": datetime.getDate(), //日
            "h+": datetime.getHours(), //小时
            "m+": datetime.getMinutes(), //分
            "s+": datetime.getSeconds(), //秒
            "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
        //var time1 = new Date().Format("yyyy-MM-dd");
        //var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
    },
    dateFormatByDate: function (date) {
        return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
            + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
}
module.exports = dateFormat;