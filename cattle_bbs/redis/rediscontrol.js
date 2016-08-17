var conf = require('../conf/conf');
var logger = require('../middlewares/log').logger;
var redisclient = require('./redis_database').redisClient;
module.exports = {
    setToken: function (uid, token) {
        redisclient.select('0', function (err) {
            if (err) {
                logger.error(err);
            }
            else {
                var key = conf.redisschema.id_token + uid;
                var val = token;
                redisclient.get(key, function (err, value) {
                    if (err) {
                        logger.error(err);
                    }
                    else {
                        if (value) {
                            //TODO 强制下线
                            logger.debug("reset");
                            redisclient.del(value);
                        }
                        redisclient.set(key, val, function (err) {
                            if (err) {
                                logger.error(err);
                            }
                            else {
                                redisclient.expire(key, conf.redis.ttl);
                            }
                        });
                    }
                });
            }
        });
    },
    ClearCache: function (key) {
        redisclient.del(key);
    },
    expireToken: function (uid) {
        var key = conf.redisschema.id_token + uid;
        logger.debug("key= " + key);
        this.ClearCache(key);
    },
    refresh: function (key, ttl) {
        redisclient.expire(key, ttl);
    }
};