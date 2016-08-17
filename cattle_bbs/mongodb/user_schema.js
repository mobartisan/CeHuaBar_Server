var mongoose = require('./mongodb');
//define Userschema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var _User = new Schema({
    uid: {type: String},
    email: {type: String},
    username: {type: String},
    salt: {type: String},
    password: {type: String},
    create_date: {type: String, default: Date.now}
});

//只查询一条
_User.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('User').findOne(conditions, fields, options, callback);
}
// Bcrypt middleware on UserSchema
_User.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
var User = mongoose.model('User', _User);
//Password verification
_User.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

exports.User = User;
exports.UserEntity = User({});