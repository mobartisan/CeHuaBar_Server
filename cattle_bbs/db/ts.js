var mppBookshelf = require('./base');
var uuid = require('node-uuid');

var ts = mppBookshelf.Model.extend({
    tableName: 'exam_questions'
}, {
    //根据ID查询一条唯一的知识库
    /*select * from user where login_name=$name*/
    findExamById: function findExamById(question_id) {
        console.log("question_id = " + question_id)
        return this.forge({question_id: question_id}).fetch();
    }
});
var tss = mppBookshelf.Collection.extend({
        model: ts
    }, {
        findExamByAll: function () {
            return this.query(function (qb) {
                qb.orderBy('question_id', 'asc');
            }).fetch()
        },
        findExamByType: function () {
            return this.query(function (qb) {
                qb.orderBy('question_id', 'asc');
            }).fetch()
        }
    }
);

module.exports = {
    ts: mppBookshelf.model('ts', ts),
    tss: mppBookshelf.collection('tss', tss)
};