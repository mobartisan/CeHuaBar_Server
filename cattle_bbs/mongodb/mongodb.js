var conf = require('../conf/conf').mongodb;
var logger = require('../middlewares/log').logger;
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var options = {promiseLibrary: require('bluebird')};
var dbURL = conf.host;
logger.info("dbURL= " + dbURL)
mongoose.connect(dbURL, options);
var db = mongoose.connection;
db.on('connected', function (err) {
    if (err) logger.error('Database connection failure');
});

db.on('error', function (err) {
    logger.error('Mongoose connected error ' + err);
});

db.on('disconnected', function () {
    logger.error('Mongoose disconnected');
});
process.on('SIGINT', function () {
    db.close(function () {
        logger.info('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
module.exports = mongoose;