var mongoose = require('./mongodb');
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var dateutils = require("../middlewares/dateutils");
var _D_COMMENT = new Schema({
    uid: {
        type: String,
        index: true
    },
    pid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_PROJECT"
    },

    prid: {
        type: mongoose.Schema.ObjectId,
        ref: "D_Profile"
    },
    comment_date: {
        type: String,
        default: dateutils.dateFormat(new Date())
    },
    type: {
        type: Number,
        default: 0
    },
    medias: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "D_MEDIA"
        }
    ],
    text: {
        type: String,
    },
    vote_title: {
        type: String,
    },
    votes: [
        {
            type: String,
        }
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "D_COMMENT"
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
_D_COMMENT.methods.findOneByDoc = function (conditions, fields, options, callback) {
    return this.model('D_COMMENT').findOne(conditions, fields, options, callback);
}
//只查询一条
_D_COMMENT.methods.findAllByDoc = function (conditions, fields, options, callback) {
    return this.model('D_COMMENT').find(conditions, fields, options, callback);
}
_D_COMMENT.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('D_COMMENT').update(conditions, update, options, callback);
}
_D_COMMENT.methods.findAllByDocStaticPage = function (conditions, array, pidArray, fields, options, rows, skippage, callback) {
    return this.model('D_COMMENT').find({})
        .where(conditions)
        .where('pid').in(pidArray)
        .where('type').in(array)
        .select(fields)
        .populate([
            {path: 'comments', select: '-_id text'},
        ])
        .populate([
            {path: 'pid', select: '-_id name'},
        ])
        .populate([
            {path: 'medias', select: '-_id url',sort: {create_date: -1}},
        ])
        .populate([
            {path: 'prid', select: '-_id username nick_name'},
        ])

        .limit(rows).skip(skippage)
        .exec(callback);
}
_D_COMMENT.methods.addRecord = function (conditions, callback) {
    return this.model('D_COMMENT').create(conditions, callback);
}
var D_COMMENT = mongoose.model('D_COMMENT', _D_COMMENT);
Promise.promisifyAll(D_COMMENT);
Promise.promisifyAll(D_COMMENT.prototype);

exports.DComment = D_COMMENT;
exports.DCommentEntity = D_COMMENT({});