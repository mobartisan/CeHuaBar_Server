var mongoose = require('./mongodb');
//define Userschema;
var Schema = mongoose.Schema;
var Promise = require("bluebird");
var _Test = new Schema({
    question_id: {type: String, index: true},
    question_type: {type: Number, default: 0},
    question_content: {type: String},
    optiones: {type: String},
    correct_option: {type: String},
    anwser: {type: String},
    score: {type: Number, default: 1},
    create_time: {type: Date, default: Date.now}
});
_Test.methods.findAllByDoc = function (conditions, callback) {
    return this.model('Test').find(conditions, callback);
}
// 添加 mongoose 静态方法，静态方法在Model层就能使用
_Test.statics.findAllByDocStatic = function (conditions, callback) {
    return this.model('Test').find(conditions, callback);
}
_Test.methods.findPartByDoc = function (conditions, fields, options, callback) {
    return this.model('Test').find(conditions, fields, options, callback);
}
//只查询一条
_Test.methods.findOneByDoc = function (conditions, callback) {
    return this.model('Test').findOne(conditions, callback);
}
//count
_Test.methods.countByDoc = function (conditions, callback) {
    return this.model('Test').count(conditions, callback);
}
//distict查询符合条件的文档并返回根据键分组的结果。
_Test.methods.distinctByDoc = function (conditions, callback) {
    return this.model('Test').find({})
        .where(conditions)
        .where('correct_option').in(['C'])
        .distinct('correct_option')
        .exec(callback);
}
//复杂查询。
_Test.methods.findByParam = function (conditions, fields, callback) {
    return this.model('Test').find({})
        .where(conditions)
        .where('correct_option').in(['B'])
        .select(fields)
        //.limit(1)
        .exec(callback);
}
_Test.methods.findByWhere = function (conditions, fields, callback) {
    logger.info("findByWhere");
    return this.model('Test').findOne({})
        .$where(conditions)
        .select(fields)
        .exec(callback)
}
_Test.methods.findAfter = function (conditions, fields, callback) {
    return this.model('Test').find({})
        .where(conditions)
        .where('correct_option').in(['B'])
        .select(fields)
        //.limit(1)
        .exec(callback);
}
_Test.methods.deleteRecord = function (conditions, callback) {
    return this.model('Test').remove(conditions, callback);
}
_Test.methods.addRecord = function (conditions, callback) {
    return this.model('Test').create(conditions, callback);
}
_Test.methods.updateRecord = function (conditions, update, options, callback) {
    return this.model('Test').update(conditions, update, options, callback);
}

var Test = mongoose.model('Test', _Test);
//export them
// exports.Test = mongoose.model('Test', _Test);
// exports.TestEntity = mongoose.model('Test', _Test)({});

Promise.promisifyAll(Test);
Promise.promisifyAll(Test.prototype);

exports.Test = Test;
exports.TestEntity = Test({});