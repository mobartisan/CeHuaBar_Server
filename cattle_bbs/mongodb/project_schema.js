var mongoose = require('./mongodb');
//define Userschema;
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var _Project = new Schema({
    project_id: {
        type: String,
        index: true
    },
    name: String,
    description: String,
    is_private: {
        type: Boolean,
        default: false
    },
    current_state: {
        type: Number,
        default: 0
    },
    is_allow_delete: {
        type: Boolean,
        default: false
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
_Project.methods.findAllByDoc = function (conditions, callback) {
    return this.model('TT_Project').find(conditions, callback);
}

_Project.methods.addRecord = function (conditions, callback) {
    return this.model('TT_Project').create(conditions, callback);
}

var Project = mongoose.model('TT_Project', _Project);

Promise.promisifyAll(Project);
Promise.promisifyAll(Project.prototype);

exports.Project = Project;
exports.ProjectEntity = Project({});