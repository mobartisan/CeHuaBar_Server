var mongoose = require('./mongodb');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_USER_LOG = new Schema({
    uid: {
        type: String,
        index: true
    },
    username: {
        type: String
    },
    remoteAddress: String,
    loginTime: {
        type: String,
        default: dateutils.dateFormat(new Date())
    },
    os_description: String,
    os_type: String,
    client_version: String
});

//只查询一条
_D_USER_LOG.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_USER_LOG').findOne(conditions, fields, options, callback);
}

_D_USER_LOG.methods.addRecord = function (conditions, callback) {
    return this.model('D_USER_LOG').create(conditions, callback);
}
var D_USER_LOG = mongoose.model('D_USER_LOG', _D_USER_LOG);
Promise.promisifyAll(D_USER_LOG);
Promise.promisifyAll(D_USER_LOG.prototype);

exports.DUsersLog = D_USER_LOG;
exports.DUsersLogEntity = D_USER_LOG({});