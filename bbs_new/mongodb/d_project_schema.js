var mongoose = require('./mongodb');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_PROJECT = new Schema({
    uid: {
        type: String,
        index: true
    },
    prid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_PROFILE"
    },
    name: {
        type: String,
        require: true,
    },
    description: String,
    project_create_date: {
        type: String,
        default: dateutils.dateFormat(new Date())
    },
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "D_MEMBER"
        }
    ],
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
_D_PROJECT.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_PROJECT').findOne(conditions, fields, options, callback);
}

_D_PROJECT.methods.addRecord = function (conditions, callback) {
    return this.model('D_PROJECT').create(conditions, callback);
}

_D_PROJECT.methods.findAllByDocStaticPage = function (conditions, pidArray, fields, options, callback) {
    return this.model('D_PROJECT').find({})
        .where(conditions)
        .where('_id').in(pidArray)
        .select(fields)
        .sort({project_create_date: -1})
        .exec(callback);
}
var D_PROJECT = mongoose.model('D_PROJECT', _D_PROJECT);
Promise.promisifyAll(D_PROJECT);
Promise.promisifyAll(D_PROJECT.prototype);

exports.DProject = D_PROJECT;
exports.DProjectEntity = D_PROJECT({});