var mongoose = require('./mongodb');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_GROUP = new Schema({
    uid: {
        type: String,
        index: true
    },
    group_name: {
        type: String,
        require: true,
    },
    group_type: {
        type: Number,
        default: 0
    },
    pids: [{
        type: mongoose.Schema.ObjectId,
        ref: "D_PROJECT"
    }],
    group_create_date: {
        type: String,
        default: dateutils.dateFormat(new Date())
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
_D_GROUP.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_GROUP').findOne(conditions, fields, options, callback);
}

//只查询一条
_D_GROUP.methods.findAllByDoc = function (conditions, fields, options, callback) {
    return this.model('D_GROUP').find(conditions, fields, options, callback);
}
_D_GROUP.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_GROUP').update(conditions, update, options, callback);
}
_D_GROUP.methods.addRecord = function (conditions, callback) {
    return this.model('D_GROUP').create(conditions, callback);
}
var D_GROUP = mongoose.model('D_GROUP', _D_GROUP);
Promise.promisifyAll(D_GROUP);
Promise.promisifyAll(D_GROUP.prototype);

exports.DGroup = D_GROUP;
exports.DGroupEntity = D_GROUP({});