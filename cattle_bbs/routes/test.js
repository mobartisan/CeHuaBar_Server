var express = require('express');
var router = express.Router();
var test = require('../api/test');
/* GET users listing. */
router.get('/getTestPage', function (req, res, next) {
    test.getTestPage(req, res, next);
});
// router.post(':serial_num/test', function (req, res, next) {
//     test.answerQuestion(req, res, next);
// });
router.post('/test', function (req, res, next) {
    test.answerQuestion(req, res, next);
});
//post
router.post('/initTestMainPage', function (req, res, next) {
    test.initTestMainPage(req, res, next);
});
//get
router.get('/initTestMainPage2', function (req, res, next) {
    test.initTestMainPageget(req, res, next);
});
//put
router.put('/initTestMainPage3', function (req, res, next) {
    test.initTestMainPagePut(req, res, next);
});
//delete
router.delete('/initTestMainPage4', function (req, res, next) {
    test.initTestMainPageDelete(req, res, next);
});
module.exports = router;
