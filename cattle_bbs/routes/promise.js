var express = require('express');
var router = express.Router();
var pro = require('../api/promise_test')
/* GET users listing. */
router.get('/test', function (req, res, next) {
    pro.operate(req, res, next)
});
module.exports = router;
