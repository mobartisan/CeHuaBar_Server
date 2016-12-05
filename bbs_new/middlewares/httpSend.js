var http = require('http');
var querystring = require('querystring');
var logger = require('../middlewares/log').logger;
var httpSend = function (options, contents, success, error, complete) {
    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        if (res.headers) {
            console.log('HEADERS: ' + JSON.stringify(res.headers));
        }
        res.setEncoding('utf8');
        res.on('data', success);
        res.on('end', complete);
    });
    req.on('error', error);
    if (contents != null) {
        req.write(contents);
    }
    req.end();  //不能漏掉，结束请求，否则服务器将不会收到信息。
};
var commonUrl = "127.0.0.1";
var commonPort = 3000;
module.exports = {
    post: function (path, bodyParam, queryParam, success, error, complete) {
        logger.debug("===post===");
        var bodyContents = querystring.stringify(bodyParam)
        var queryContents = querystring.stringify(queryParam)
        var def = {
            host: commonUrl,
            port: commonPort,
            path: path + "?" + queryContents,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': bodyContents.length
            }
        };
        httpSend(def, bodyContents, success, error, complete);
    },
    get: function (path, queryParam, success, error, complete) {
        logger.debug("===get===");
        var queryContents = querystring.stringify(queryParam)
        var def = {
            host: commonUrl,
            port: commonPort,
            path: path + "?" + queryContents,
            method: 'GET'
        };
        httpSend(def, null, success, error, complete);
    },
    put: function (path, bodyParam, queryParam, success, error, complete) {
        logger.debug("===put===");
        var bodyContents = querystring.stringify(bodyParam)
        var queryContents = querystring.stringify(queryParam)
        var def = {
            host: commonUrl,
            port: commonPort,
            path: path + "?" + queryContents,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': bodyContents.length
            }
        };
        httpSend(def, bodyContents, success, error, complete);
    },
    delete: function (path, queryParam, success, error, complete) {
        logger.debug("===delete===");
        var queryContents = querystring.stringify(queryParam)
        logger.debug("=====contents=  " + queryContents);
        var def = {
            host: commonUrl,
            port: commonPort,
            path: path + "?" + queryContents,
            method: 'DELETE'
        };
        httpSend(def, null, success, error, complete);
    }
}