var redisClient = require('../redis/redis_database').redisClient;
var redisController = require('../redis/rediscontrol');
var TOKEN_EXPIRATION = 60;
var conf = require('../conf/conf');
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;
var logger = require('../middlewares/log').logger;
// Middleware for token verification
exports.verifyToken = function (req, res, next) {
    var token = getToken(req.headers);
    //next();
    var key = conf.redisschema.id_token + req.user.id;
    redisClient.get(key, function (err, reply) {
        if (err) {
            console.log(err);
            return res.send(500);
        }
        else {
            if (reply) {
                logger.debug("reply=" + reply);
                return next();
            }
            return res.send(401);
        }
    });
};

exports.expireToken = function (req) {
    logger.debug("expireToken->)");
    if (req.user != null) {
        redisController.expireToken(req.user.id);
    }
};
exports.saveToken = function (uid, token) {
    logger.debug("saveToken->)");
    if (uid && token) {
        redisController.setToken(uid, token);
    }
};

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        //return authorization;
        var part = authorization.split(' ');

        if (part.length == 2) {
            var token = part[1];
            return token;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;