var express = require('express');
var router = express.Router();
var Auth = require('../middlewares/auth');
var knowledge = require('../api/knowledge');
/* GET users listing. */
router.get('/search', function (req, res, next) {
    knowledge.search(req, res, next);
});
router.get('/device_info', function (req, res, next) {
    knowledge.device_info(req, res, next);
});
module.exports = router;
