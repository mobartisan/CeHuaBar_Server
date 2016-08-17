var mongoose = require('./mongodb');
//define Userschema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var _SESSION = new Schema({
    session: {type: String},
    expires: {type: String}
});

//只查询一条
SESSION.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('sessions').findOne(conditions, fields, options, callback);
}

var SESSION = mongoose.model('SESSIONS', _SESSION);
//Password verification

Promise.promisifyAll(SESSION);
Promise.promisifyAll(SESSION.prototype);

exports.Session = SESSION;
exports.SessionEntity = SESSION({});