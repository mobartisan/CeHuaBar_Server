var express = require('express');
var web = require('../api/web');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('demo', {title: 'HOME'});
});
/* 登陆 */
router.get('/login', function (req, res, next) {
    res.render('login', {title: '登陆'});
});
/* 登陆 */
router.get('/login2', function (req, res, next) {
    res.render('login2', {title: '登陆'});
});
/* 主页 */
router.get('/index', function (req, res, next) {
    res.render('index', {title: '首页'});
});
/* 登出 */
router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});
module.exports = router;
