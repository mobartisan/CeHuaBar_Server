var logger = require('../middlewares/log').logger;
Date.prototype.toFomatorString = function (formator) {
    var returnText = formator.toUpperCase();

    if (returnText.indexOf("YYYY") > -1) {
        returnText = returnText.replace("YYYY", this.getYear());
    }

    if (returnText.indexOf("MM") > -1) {
        returnText = returnText.replace("MM", this.getMonth() + 1);
    }

    if (returnText.indexOf("DD") > -1) {
        returnText = returnText.replace("DD", this.getDate());
    }

    if (returnText.indexOf("HH") > -1) {
        returnText = returnText.replace("HH", this.getHours());
    }

    if (returnText.indexOf("MI") > -1) {
        returnText = returnText.replace("MI", this.getMinutes());
    }

    if (returnText.indexOf("SS") > -1) {
        returnText = returnText.replace("SS", this.getSeconds());
    }

    if (returnText.indexOf("SI") > -1) {
        returnText = returnText.replace("SI", this.getMilliseconds());
    }

    return returnText;
}
module.exports = {
    currenttimemillis: function () {
        return new Date().getTime();
    },
    dateFormat: function (date) {
        return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
            + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    hommizationTime: function (dateTimeStamp) {
        var result;
        var minute = 1000 * 60;u
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;

        if (monthC >= 1) {
            result = "" + parseInt(monthC) + "月前";
        }
        else if (weekC >= 1) {
            result = "" + parseInt(weekC) + "星期前";
        }
        else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前";
        }
        else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前";
        } else
            result = "刚刚";
        return result;
    }
}
