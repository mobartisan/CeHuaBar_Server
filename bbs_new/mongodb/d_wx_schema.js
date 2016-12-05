var mongoose = require('./mongodb');
//define Userschema;

var logger = require('../middlewares/log').logger;
var Schema = mongoose.Schema;
var dateutils = require("../middlewares/dateutils");
var Promise = require("bluebird");
var _D_WX_ACCOUNT = new Schema({
    unionid: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    uid: {
        type: String
    },
    nick_name: {type: String},
    openid: {type: String},
    head_img_url: {type: String},
    language: {type: String},
    city: {type: String},
    sex: {type: String},
    country: {type: String},
    update_id: {type: String},
    privilege:{type:String},
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
_D_WX_ACCOUNT.methods.addRecord = function (conditions, callback) {
    return this.model('D_WX_ACCOUNT').create(conditions, callback);
}
_D_WX_ACCOUNT.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_WX_ACCOUNT').update(conditions, update, options, callback);
}
_D_WX_ACCOUNT.methods.findAllByDoc = function (conditions, callback) {
    return this.model('D_WX_ACCOUNT').find(conditions, callback);
}
_D_WX_ACCOUNT.methods.findAllByDocStatic = function (conditions, fields, options, callback) {
    return this.model('D_WX_ACCOUNT').find(conditions, fields, options).exec(callback);
}

//只查询一条
_D_WX_ACCOUNT.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_WX_ACCOUNT').findOne(conditions, fields, options, callback);
}
var D_WX_ACCOUNT = mongoose.model('D_WX_ACCOUNT', _D_WX_ACCOUNT);

Promise.promisifyAll(D_WX_ACCOUNT);
Promise.promisifyAll(D_WX_ACCOUNT.prototype);

exports.DWxAccount = D_WX_ACCOUNT;
exports.DWxAccountEntity = D_WX_ACCOUNT({});