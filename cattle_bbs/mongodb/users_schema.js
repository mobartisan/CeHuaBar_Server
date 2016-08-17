var mongoose = require('./mongodb');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var _Users = new Schema({
    user_id: {
        type: String,
        index: true
    },
    password: String,
    name: String,
    nick_name: String,
    wx_account: String,
    phone: String,
    head_img_url: String,
    os_type: String,
    os_description: String,
    device_identify: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    create_user_id: String,
    last_edit_date: {
        type: Date,
        default: Date.now
    },
    last_edit_user_id: String
});

//只查询一条
_Users.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('TT_User').findOne(conditions, fields, options, callback);
}

_Users.methods.addRecord = function (conditions, callback) {
    return this.model('TT_User').create(conditions, callback);
}
var Users = mongoose.model('TT_User', _Users);
Promise.promisifyAll(Users);
Promise.promisifyAll(Users.prototype);

exports.Users = Users;
exports.UsersEntity = Users({});