var express = require('express');
var router = express.Router();
var mongod = require('../api/mongodtest')
var mTest = require('../api/m_test')
/* GET users listing. */
router.get('/init', function (req, res, next) {
    mongod.userOpeate(req, res, next)
});
router.get('/test', function (req, res, next) {
    mongod.testOpeate(req, res, next)
});
router.get('/object', function (req, res, next) {
    mongod.testObject(req, res, next)
});
router.get('/object2', function (req, res, next) {
    mongod.testObject2(req, res, next)
});
router.get('/object3', function (req, res, next) {
    mongod.testObject3(req, res, next)
});
router.get('/findByQid', function (req, res, next) {
    mTest.findByQid(req, res, next)
});
router.get('/findByType', function (req, res, next) {
    mTest.findByType(req, res, next)
});
router.get('/findPart', function (req, res, next) {
    mTest.findPartByCondition(req, res, next)
});
router.get('/findByCorrOption', function (req, res, next) {
    mTest.findQuestionByCorrOption(req, res, next)
});
router.get('/addQuestion', function (req, res, next) {
    mTest.addQuestion(req, res, next)
});
router.get('/deleteAllQuestion', function (req, res, next) {
    mTest.deleteQuestionByAll(req, res, next)
});
router.get('/deleteQuestion', function (req, res, next) {
    mTest.deleteQuestionByQid(req, res, next)
});
router.get('/updateQuestionByQid', function (req, res, next) {
    mTest.updateQuestionByQid(req, res, next)
});
router.get('/updateQuestionByType', function (req, res, next) {
    mTest.updateQuestionByType(req, res, next)
});
router.get('/countQuestionByType', function (req, res, next) {
    mTest.countQuestionByType(req, res, next)
});
router.get('/distinctQuestionByType', function (req, res, next) {
    mTest.findOneQuestionByConditionDb(req, res, next)
});
router.get('/findByParam', function (req, res, next) {
    mTest.findQuestionByParam(req, res, next)
});
router.get('/findByWhere', function (req, res, next) {
    mTest.findQuestionByWhere(req, res, next)
});

router.get('/dbOneFind', function (req, res, next) {
    mTest.findOneQuestionByConditionDb(req, res, next)
});
router.get('/dbFind', function (req, res, next) {
    mTest.findQuestionByConditionDb(req, res, next)
});
router.get('/dbAdd', function (req, res, next) {
    mTest.addQuestionByConditionDb(req, res, next)
});
router.get('/dbDelete', function (req, res, next) {
    mTest.deleteQuestionByConditionDb(req, res, next)
});
router.get('/addProject', function (req, res, next) {
    mTest.addProject(req, res, next)
});
router.get('/addMember', function (req, res, next) {
    mTest.addMember(req, res, next)
});
router.get('/addUser', function (req, res, next) {
    mTest.addUser(req, res, next)
});
router.get('/findMyProject', function (req, res, next) {
    mTest.findMyProject(req, res, next)
});
module.exports = router;
