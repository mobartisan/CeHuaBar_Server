var express = require('express');
var router = express.Router();
var Auth = require('../middlewares/auth');
var user = require('../api/user');
var logger = require('../middlewares/log').logger;
var jwt = require('express-jwt');
var tokenManager = require('../conf/token_manager');

/* GET users listing. */
router.get('/isAlive', function (req, res, next) {
    user.isAlive(req, res, next);
});
//用户登陆
router.post('/login.app', function (req, res, next) {
    user.login(req, res, next);
});
router.get('/point.app', Auth.Auth_session, function (req, res, next) {
    user.point(req, res, next);

});
router.signin = function (req, res) {
    user.login2(req, res);
}

router.logout = function (req, res) {
    user.logout(req, res);
}
router.getPoint = function (req, res) {
    user.point2(req, res);
}
router.get('/point2.app', tokenManager.verifyToken, function (req, res) {
    user.point2(req, res);

});
module.exports = router;
