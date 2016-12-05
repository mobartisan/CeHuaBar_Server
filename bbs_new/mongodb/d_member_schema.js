var mongoose = require('./mongodb');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_MEMBER = new Schema({
    uid: {type: String},
    wid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_WX_ACCOUNT"
    },
    prid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_PROFILE"
    },
    pid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_PROJECT"
    },
    member_date: {
        type: String,
        default: dateutils.dateFormat(new Date())
    },
    member_type: {
        type: Number,
        default: 0
    },
    update_id: {type: String},
    update_date: {
        type: String,
        default: dateutils.dateFormat(new Date())
    },
    create_id: {type: String},
    create_date: {
        type: String,
        default: dateutils.dateFormat(new Date())
    },
    deleted: {
        type: Number,
        default: 0
    }
});

_D_MEMBER.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_MEMBER').update(conditions, update, options, callback);
}
//只查询一条
_D_MEMBER.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_MEMBER').findOne(conditions, fields, options, callback);
}
//查询全部
_D_MEMBER.methods.findAllByDocStatic = function (conditions, fields, options, callback) {
    return this.model('D_MEMBER').find(conditions, fields, options, callback);
}
_D_MEMBER.methods.addRecord = function (conditions, callback) {
    return this.model('D_MEMBER').create(conditions, callback);
}
var D_MEMBER = mongoose.model('D_MEMBER', _D_MEMBER);
Promise.promisifyAll(D_MEMBER);
Promise.promisifyAll(D_MEMBER.prototype);

exports.DMember = D_MEMBER;
exports.DMemberEntity = D_MEMBER({});