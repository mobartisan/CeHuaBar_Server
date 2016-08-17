var express = require('express');
var router = express.Router();
var project = require('../api/project');

router.createProject = function (req, res) {
    project.addProject(req, res);
}

router.findList = function (req, res) {
    project.findMyProject(req, res);
}

router.addMember = function (req, res) {
    project.addMember(req, res);
}
module.exports = router;
