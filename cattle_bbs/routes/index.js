var express = require('express');
var router = express.Router();
var Auth = require('../middlewares/auth');
var index = require('../api/Index');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('demo', {title: 'fuck'});
});
router.get('/res', function (req, res, next) {
    res.render('repository', {title: 'fuck'});
});
router.get('/login', function (req, res, next) {
    index.login(req, res, next);
    //res.render('login', {title: 'Express'});
});
router.get('/loginByid', function (req, res, next) {
    index.loginByid(req, res, next);
});
router.get('/gotoDemo', function (req, res, next) {
    index.gotoDemo(req, res, next);
});
router.get('/gotoDemo2', function (req, res, next) {
    index.gotoDemo2(req, res, next);
});

module.exports = router;
