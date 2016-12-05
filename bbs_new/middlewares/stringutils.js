var logger = require('../middlewares/log').logger;
module.exports = {
    sliceString: function (string, pattern) {
        var arr;
        if (typeof string[0] == 'string') {
            arr = string.split(pattern).map(val=> {
                return val;
            });
        } else {
            arr = [];
        }
        logger.debug(arr);
        return arr;
    },

    stringIndex: function (str, char, indexPlus, islast) {
        let index = str.indexOf(char);
        logger.debug("index= " + index);
        let s = "";
        if (islast) {
            s = str.substring(index + indexPlus)
        } else {
            s = str.substring(0, index)
        }
        logger.debug("s= " + s);
        return (s);
    }

}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};



