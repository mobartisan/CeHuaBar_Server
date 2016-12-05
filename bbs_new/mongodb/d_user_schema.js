var mongoose = require('./mongodb');
//define Userschema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var logger = require('../middlewares/log').logger;
var Schema = mongoose.Schema;
var dateutils = require("../middlewares/dateutils");
var Promise = require("bluebird");
var _D_User = new Schema({
    uid: {type: String},
    email: {type: String},
    phone: {type: String},
    username: {type: String},
    password: {type: String},
    wid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_WX_ACCOUNT"
    },
    prid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_PROFILE"
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

// Bcrypt middleware on UserSchema
_D_User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            logger.debug("salt= " + salt);
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
//只查询一条
_D_User.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_User').findOne(conditions, fields, options, callback);
}

//解密比对密码
_D_User.methods.comparePassword = function (password, dbPassword, cb) {
    bcrypt.compare(password, dbPassword, function (err, isMatch) {
        logger.debug("password 1= " + password);
        logger.debug("password 2= " + dbPassword);
        if (err) return cb(err);
        cb(isMatch);
    });
};

_D_User.methods.addRecord = function (conditions, callback) {
    return this.model('D_User').create(conditions, callback);
}
_D_User.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_User').update(conditions, update, options, callback);
}

_D_User.methods.findAllByCondition = function (conditions, fields, callback) {
    return this.model('D_User').find({})
        .where('uid').in(conditions.uidArray)
        .select(fields)
        .exec(callback);
}
var D_User = mongoose.model('D_User', _D_User);

Promise.promisifyAll(D_User);
Promise.promisifyAll(D_User.prototype);

exports.D_User = D_User;
exports.DUserEntity = D_User({});