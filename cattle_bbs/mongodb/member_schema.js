var mongoose = require('./mongodb');
//define Userschema;
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var _Member = new Schema({
    project_members_id: {
        type: String,
        index: true
    },
    project_id: {
        type: String,
    },
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: 'TT_Project'
    },
    user_id: {
        type: String,
    },
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
// _Member.methods.findAllByDoc = function (conditions, callback) {
//     return this.model('TT_Project_Members').find(conditions, callback);
// }

_Member.methods.addRecord = function (conditions, callback) {
    return this.model('TT_Project_Members').create(conditions, callback);
}
// 添加 mongoose 静态方法，静态方法在Model层就能使用
_Member.statics.findAllByDocStatic = function (conditions, fields, options, callback) {
    return this.model('TT_Project_Members').find(conditions, fields, options).populate("projectId").exec(callback);
}
var Member = mongoose.model('TT_Project_Members', _Member);

Promise.promisifyAll(Member);
Promise.promisifyAll(Member.prototype);

exports.Member = Member;
exports.MemberEntity = Member({});