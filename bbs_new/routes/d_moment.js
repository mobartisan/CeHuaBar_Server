var express = require('express');
var router = express.Router();
var d_moment = require('../api/d_moment');
var logger = require('../middlewares/log').logger;
router.addMoment = function (req, res) {
    d_moment.addMoment(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
router.addDiscuss = function (req, res) {
    d_moment.addDiscuss(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
router.findPartProjectByAll = function (req, res) {
    d_moment.findPartProjectByAll(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
module.exports = router;