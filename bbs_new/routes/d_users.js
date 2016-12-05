var express = require('express');
var router = express.Router();
var d_user = require('../api/d_user');

router.signin = function (req, res) {
    d_user.login(req, res);
}
router.register = function (req, res) {
    d_user.register(req, res);
}
router.logout = function (req, res) {
    d_user.logout(req, res);
}
module.exports = router;
