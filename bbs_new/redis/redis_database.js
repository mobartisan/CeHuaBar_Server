var redis = require('redis');
var conf = require('../conf/conf');
var redisClient = redis.createClient(conf.redis.port, conf.redis.host, conf.redis_option);

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

exports.redis = redis;
exports.redisClient = redisClient;