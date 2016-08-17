/**
 * Created by mikebian on 16/7/12.
 */
//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonSend = require('../middlewares/jsonSend');
var maputil = require('../middlewares/mapUtil');
module.exports = {
    //健康状态监测
    getBaiduLnglat: function (req, res, next) {
        var poi = {};
        poi.lng = req.query.lng;
        poi.lat = req.query.lat;
        //poi.lng = req.body.lng;
        //poi.lat = req.body.lat;
        var poi2 = maputil.gcj2bd(poi)
        jsonSend(req, res, ResultCode.SUCCESS, "success", poi2, true);
    },
}