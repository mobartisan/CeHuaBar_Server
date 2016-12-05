var mongoose = require('./mongodb');
var bcrypt = require('bcrypt');
var logger = require('../middlewares/log').logger;
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_Profile = new Schema({
    uid: {type: String},
    email: {type: String},
    phone: {type: String},
    nick_name: {type: String},
    username: {type: String},
    head_img_url: {type: String},
    head_img_from: {
        type: Number,
        default: 0
    },
    city: {type: String},
    country: {type: String},
    province:{type:String},
    language: {type: String},
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

//只查询一条
_D_Profile.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_Profile').findOne(conditions, fields, options, callback);
}

_D_Profile.methods.addRecord = function (conditions, callback) {
    return this.model('D_Profile').create(conditions, callback);
}
_D_Profile.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_Profile').update(conditions, update, options, callback);
}
var D_Profile = mongoose.model('D_Profile', _D_Profile);

Promise.promisifyAll(D_Profile);
Promise.promisifyAll(D_Profile.prototype);

exports.D_Profile = D_Profile;
exports.DProfileEntity = D_Profile({});