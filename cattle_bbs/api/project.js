//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var MD5Crypto = require('../middlewares/MD5Crypto');
var uuid = require('node-uuid');
var projectEntity = require('../mongodb/project_schema').ProjectEntity;
var projectSchema = require('../mongodb/project_schema').Project;

var memberEntity = require('../mongodb/member_schema').MemberEntity;
var memberSchema = require('../mongodb/member_schema').Member;
var logger = require('../middlewares/log').logger;
module.exports = {
    //增加一条Project数据
    addProject: function (req, res) {
        var uid = req.user.id;
        logger.debug("createProject");
        var projectId = uuid.v1();
        //创建TT_Project数据
        var projectData = {
            project_id: projectId,
            name: res.body.name,
            description: res.body.description,
            is_private: res.body.is_private,
            current_state: res.body.current_state,
            is_allow_delete: res.body.is_allow_delete,
            create_date: Date.now(),
            create_user_id: req.user.id,
            last_edit_date: Date.now(),
            last_edit_user_id: req.user.id
        };

        function addMember(projectDoc) {
            var memId = uuid.v1();
            var memberData = {
                project_members_id: memId,
                project_id: projectId,
                user_id: uid,
                projectId: projectDoc._id,
                create_date: Date.now(),
                create_user_id: uid,
                last_edit_date: Date.now(),
                last_edit_user_id: uid
            };
            //增加一条互数据
            memberEntity.addRecordAsync(memberData).then(function (docs) {
                logger.info(docs);
                res.json(docs);
            }, function (error) {
                logger.error(error);
                res.send(error);
                return;
            });
        }

        //增加一条互数据
        projectEntity.addRecordAsync(projectData).then(function (docs) {
            logger.info(docs);
            addMember(docs);
        }, function (error) {
            logger.error(error);
            res.send(error);
            return;
        });
    },
    addMember: function (req, res) {
        var uid = req.user.id;
        var memId = uuid.v1();
        var proId = req.body._id;
        var projectId = req.body.project_id;
        var memberData = {
            project_members_id: memId,
            project_id: projectId,
            projectId: proId,
            user_id: req.body.user_id,
            create_date: Date.now(),
            create_user_id: uid,
            last_edit_date: Date.now(),
            last_edit_user_id: uid
        };
        //增加一条互数据
        memberEntity.addRecord(memberData, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //增加一条Project数据
    findMyProject: function (req, res) {
        var uid = req.user.id;
        var conditions = {user_id: uid};
        var fields = {projectId: 1}; // 待返回的字段
        var options = {};
        memberSchema.findAllByDocStaticAsync(conditions, fields, options).then(function (docs) {
            var obj = {};
            obj.list = docs;
            jsonWrite(req, res, ResultCode.SUCCESS, "查询成功", obj, true);
            //res.json(docs);
        }, function (error) {
            logger.error(error);
            //res.send(error);
            jsonWrite(req, res, ResultCode.SUCCESS, "查询成功", null, true);
            return;
        });
    }
};