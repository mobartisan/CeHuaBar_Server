var express = require('express');
var router = express.Router();
var d_group = require('../api/d_group');
var logger = require('../middlewares/log').logger;
router.addGroup = function (req, res) {
    d_group.addGroup(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
router.findGroup = function (req, res) {
    d_group.findGroup(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
module.exports = router;
