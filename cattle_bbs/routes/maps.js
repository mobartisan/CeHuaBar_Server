var express = require('express');
var router = express.Router();
var map = require('../api/maps');
//百度转火星
router.get('/gcj2bd', function (req, res, next) {
    map.getBaiduLnglat(req, res, next);
});

//转换成k码
router.get('/k', function (req, res, next) {
    // var poi = {},
    //     poi
    // .
    // lng = 118.865427
    // poi.lat = 32.1477806
    // var kk = Encode(poi.lat, poi.lng)
    // res.render('index', {title: "k = " + kk}),
});

//百度转火星
router.get('/decodek', function (req, res, next) {
    // var k = "8zykc7ctq",
    // var
    // la = DecodeLat(k)
    // var lon = DecodeLon(k)
    // res.render('index', {title: "la = " + la + " lon= " + lon}),
});
module.exports = router;
