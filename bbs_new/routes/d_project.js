var express = require('express');
var router = express.Router();
var d_project = require('../api/d_project');
var logger = require('../middlewares/log').logger;
router.addProject = function (req, res) {
    d_project.addProject(req, res, data=> {
        logger.debug("callback = " + data);
    });
}

router.findMyAllProject = function (req, res) {
    d_project.findMyAllProject(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
router.findPartProjectByGroup = function (req, res) {
    d_project.findPartProjectByGroup(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
router.findPartProjectByProject = function (req, res) {
    d_project.findPartProjectByProject(req, res, data=> {
        logger.debug("callback = " + data);
    });
}
module.exports = router;
