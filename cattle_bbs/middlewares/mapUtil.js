/**
 * Created by mikebian on 16/7/13.
 */
var express = require('express');
var M_PI = 3.14159265358979324;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var x_pi = M_PI * 3000.0 / 180.0;
var codes = "0123456789abcdefghijkmnpqrstuvwxyz";
module.exports = {
// 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法
    gcj2bd: function (poi) {
        var poi2 = {};
        var x = poi.lng, y = poi.lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        poi2.lng = z * Math.cos(theta) + 0.0065;
        poi2.lat = z * Math.sin(theta) + 0.006;
        return poi2;
    },

    bd2gcj: function (poi) {
        var poi2 = {};
        var x = poi.lng - 0.0065, y = poi.lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        poi2.lng = z * Math.cos(theta);
        poi2.lat = z * Math.sin(theta);
        return poi2;
    },

    __decode: function (pch) {
        var v = 0;
        for (var i = 3; i >= 0; --i)
            v = v * 34 + (codes.indexOf(pch.charAt(i)));
        v = v * 250 / 9;
        return v;
    },

    __encode: function (v) {
        var pch = "";
        v = v * 9 / 250;
        for (var i = 0; i < 4; ++i) {
            pch += codes.charAt(v % 34);
            v /= 34;
        }
        return pch;
    },

    DecodeLon: function (k) {
        var lon = this.__decode(k.substring(1, 5));
        if (k.charAt(0) == '5' || k.charAt(0) == '8')
            lon += 35000000;
        lon += 70000000;
        return lon / 1000000.0;
    },

    DecodeLat: function (k) {
        var lat = this.__decode(k.substring(5, 9));
        if (k.charAt(0) <= '6')
            lat += 35000000;
        lat += 5000000;
        return lat / 1000000.0;
    },

    Encode: function (lat, lon) {
        lat = parseInt(lat * 1000000);
        lon = parseInt(lon * 1000000);
        var k;
        lon -= 70000000;
        lat -= 5000000;
        if (lat > 35000000)
            if (lon <= 35000000)
                k = "6";
            else
                k = "5";
        else if (lon <= 35000000)
            k = "7";
        else
            k = "8";
        if (lon > 35000000)
            lon -= 35000000;
        if (lat > 35000000)
            lat -= 35000000;
        k += this.__encode(lon);
        k += this.__encode(lat);
        return k;
    }
}