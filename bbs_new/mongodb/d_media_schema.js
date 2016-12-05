var mongoose = require('./mongodb');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_MEDIA = new Schema({
    uid: {
        type: String,
        index: true
    },
    type: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        require: true,
    },
    from: {
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

//只查询一条
_D_MEDIA.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_MEDIA').findOne(conditions, fields, options, callback);
}
//只查询一条
_D_MEDIA.methods.findAllByDoc = function (conditions, fields, options, callback) {
    return this.model('D_MEDIA').find(conditions, fields, options, callback);
}
_D_MEDIA.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_MEDIA').update(conditions, update, options, callback);
}
_D_MEDIA.methods.addRecord = function (conditions, callback) {
    return this.model('D_MEDIA').create(conditions, callback);
}
var D_MEDIA = mongoose.model('D_MEDIA', _D_MEDIA);
Promise.promisifyAll(D_MEDIA);
Promise.promisifyAll(D_MEDIA.prototype);

exports.DMedia = D_MEDIA;
exports.DMediaEntity = D_MEDIA({});