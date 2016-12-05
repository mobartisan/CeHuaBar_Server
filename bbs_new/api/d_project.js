/**
 * Created by mikebian on 16/7/23.
 */
//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var dUserEntity = require('../mongodb/d_user_schema').DUserEntity;
var dProjectEntity = require('../mongodb/d_project_schema').DProjectEntity;
var dProfileEntity = require('../mongodb/d_profile_schema').DProfileEntity;
var dMemberEntity = require('../mongodb/d_member_schema').DMemberEntity;
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var logger = require('../middlewares/log').logger;
var dateutils = require("../middlewares/dateutils");
var dGroupEntity = require('../mongodb/d_group_schema').DGroupEntity;
const REQ_PARAM
    =
{
    uid: "30fb2a10-ba9c-11e6-8d67-8db0a5730ba6",
}
var findUsrObjectIdByUid = function (uid) {
    var conditions = {
        uid: uid
    };
    var userfields = {
        _id: 1,
    }; // 待返回的字段
    dUsersEntity.findOneByDocAsync(conditions, userfields).then(docs=> {
        logger.info("查询user数据库");
        if (docs) {
            logger.info("wxDoics =" + docs);
            return docs._id
        }
    }, error=> {
        logger.info("login error........");
        logger.error(error);
        return null;
    });
}
module.exports = {

//----------------------------------------------------------------
//增加一条Project数据
    addProject: function (req, res, next) {
        var addMember = function (param) {
            param.uidArray.push(param.uid);
            logger.debug(param.uidArray)
            logger.debug("userArray = " + param.uidArray)
            findUserByUid(param);
        }
        var addMemberInfo = function (param, objArray) {
            if (objArray && objArray.length > 0) {
                logger.debug("objArray = " + objArray)
            } else {
                logger.debug("获得不了user信息")
            }
            let memberInfoArray = [];
            for (let i = 0; i < objArray.length; i++) {
                let memberfields = {
                    uid: objArray[i].uid,
                    wid: objArray[i].wid,
                    prid: objArray[i].prid,
                    member_type: 1,//0是一般成员 1是管理员
                    update_id: objArray[i].uid,
                    create_id: objArray[i].uid,
                }; // 待返回的字段
                memberInfoArray.push(memberfields);
            }

            //增加一条互数据
            let obj = {};
            var count = 0;
            var memberIdArray = [];
            var insertMember = function (count, memberInfoArray) {
                logger.info("正常时 count= " + count);
                dMemberEntity.addRecordAsync(memberInfoArray[count]).then(docs=> {
                    //logger.info("正常时 插入结果为" + docs);
                    logger.info("==============正常时 插入结果为" + docs._id);
                    memberIdArray.push(docs._id);
                }, error => {
                    logger.info("报错后 插入结果为" + error);
                    obj.error = error;
                    obj.message = "插入失败"
                    obj.code = ResultCode.ERROR
                }).then(function () {
                    count++;
                    if (count < memberInfoArray.length) {
                        insertMember(count, memberInfoArray);
                    } else {
                        addProject(param, memberIdArray)
                    }
                });
            }
            insertMember(count, memberInfoArray)

        }
        var findUserByUid = function (param) {
            var uidArray = param.uidArray
            //原型方式查询一条
            var obj = [];
            logger.debug("findUserByUid uid = " + uidArray);
            var conditions = {
                uidArray: uidArray
            };
            var userFindfields = {
                uid: 1,
                username: 1,
                prid: 1,
                wid: 1,
            }; // 待返回的字段
            dUserEntity.findAllByConditionAsync(conditions, userFindfields).then(docs=> {
                logger.info("查询user数据库");
                if (docs) {
                    obj = docs;
                }
            }, error=> {
                addMemberInfo(param, obj);
            }).then(function () {
                addMemberInfo(param, obj);
            });
        }

        var updateMember = function (param, projectDocs) {
            var obj = {};
            var count = 0;
            var memberIdArray = projectDocs.members;
            var upMember = function (count, memberIdArray) {
                var conditions = {_id: memberIdArray[count]};
                var update = {
                    $set: {
                        pid: projectDocs._id,
                        update_date: dateutils.dateFormat(new Date()),
                        update_id: param.uid
                    }
                };
                var options = {upsert: false};
                dMemberEntity.updateRecordAsync(conditions, update, options).then(function (numberAffected) {
                    console.log("numberAffected= " + numberAffected.nModified);
                    obj.message = "插入成功"
                    obj.code = ResultCode.SUCCESS
                }, function (error) {
                    console.log(error)
                    obj.error = error;
                    obj.message = "插入失败"
                    obj.code = ResultCode.ERROR
                    jsonWrite(req, res, ResultCode.ERROR, "插入失败", obj, false);
                }).then(function () {
                    count++;
                    if (count < memberIdArray.length) {
                        upMember(count, memberIdArray);
                    } else {
                        logger.debug("final 发送")
                        jsonWrite(req, res, obj.code, obj.message, obj, true);
                    }
                });
            }
            upMember(count, memberIdArray);
        }

        var addGroup = function (param, projectDocs) {
            var conditions = {
                uid: param.uid,
                group_type: 1,
            };
            var fields = {
                pids: 1
            }; // 待返回的字段
            dGroupEntity.findOneByDocAsync(conditions, fields).then(docs=> {
                logger.info("查询Group数据库");
                if (docs) {
                    uppGroup(docs, param, projectDocs);
                }
            }, error=> {
                logger.info("查询失败" + error);
            });
        }
        var uppGroup = function (groupDcs, param, projectDocs) {
            groupDcs.pids.push(projectDocs._id)
            var conditions = {
                uid: param.uid,
                group_type: 1,
            };
            var update = {
                $set: {
                    pids: groupDcs.pids,
                    update_date: dateutils.dateFormat(new Date()),
                    update_id: param.uid
                }
            };
            var options = {upsert: false};
            dGroupEntity.updateRecordAsync(conditions, update, options).then(function (numberAffected) {
                console.log("numberAffected= " + numberAffected.nModified);
            }, function (error) {
                console.log(error)
            }).then(function () {
                console.log("插入group数据库成功");
            });
        }

        var addProject = function (param, members) {
            logger.info("addProject  param.prid= " + param.prid);
            logger.debug("members = " + members);
            var fields = {
                uid: param.uid,
                prid: param.prid,//profile object
                name: param.name,
                description: "",
                //members: ["5843d794d2634f78fcf93556","5843d794d2634f78fcf93557"],//D_MEMBER object
                members: members,//D_MEMBER object
            }; // 待返回的字段
            //增加一条互数据
            var obj = {};
            dProjectEntity.addRecordAsync(fields).then(function (docs) {
                logger.info("正常时 插入结果为" + docs);
                updateMember(param, docs)
                addGroup(param, docs);
            }, error=> {
                logger.info("报错后 插入结果为" + error);
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }
        var findProfileObjectIdByUid = function (param) {
            var obj = {};
            var conditions = {
                uid: param.uid
            };
            var userfields = {
                _id: 1,
            }; // 待返回的字段
            dProfileEntity.findOneByDocAsync(conditions, userfields).then(docs=> {
                logger.info("查询prifle数据库");
                if (docs) {
                    logger.info("wxDoics =" + docs);
                    param.prid = docs._id;
                    addMember(param);
                }
            }, error=> {
                logger.info("查询失败" + error);
                obj.error = error;
                obj.message = "查询失败"
                obj.code = ResultCode.ERROR
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }

        var checkNameExist = function (param) {
            var obj = {};
            var conditions = {
                name: param.name
            };
            var projectFindfields = {
                _id: 1,
            }; // 待返回的字段
            dProjectEntity.findOneByDocAsync(conditions, projectFindfields).then(docs=> {
                logger.info("查询project数据库 查看是否存在name " + param.name);
                if (docs) {
                    obj.message = "项目名称重复"
                    obj.code = ResultCode.ERROR
                    logger.debug("chaxun 发送")
                    jsonWrite(req, res, obj.code, obj.message, obj, true);
                } else {
                    findProfileObjectIdByUid(param)
                }
            }, error=> {
                logger.info("查询失败" + error);
                obj.error = error;
                obj.message = "查询失败"
                obj.code = ResultCode.ERROR
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }
        let DEMO_REQ =
        {
            name: "我的项目",
            uidArray: ["13eb0590-ba23-11e6-8ad1-bfaf4b0f92d9"],
            uid: REQ_PARAM.uid,
        }
        let REQUSET =
        {
            name: req.body.name || "",
            uidArray: req.body.uids || [],
            uid: req.user.id,
        }
        logger.debug()
        checkNameExist(REQUSET);
        next("fuck");
    },


    /**
     * 获取某个GROUP里面的MOMENT和DISSCUSS(group页面)
     * @param req
     * @param res
     * @param next
     */
    findPartProjectByGroup: function (req, res, next) {

    },
    /**
     * 获取某个项目里面的MOMENT和DISSCUSS(点击项目)
     * @param req
     * @param res
     * @param next
     */
    findPartProjectByProject: function (req, res, next) {

    },

    findMyAllProject: function (req, res, next) {
        let REQUEST =
        {
            uid: req.user.id,
            page: req.query.page || 1,
            rows: req.query.rows || 10
        }
        var findMyAllProject = function (pageParam) {
            var obj = {};
            logger.info("==============");
            var conditions = {};
            var fields = {
                uid:1,
                name:1,
                description:1
            }; // 待返回的字段
            var options = {};
            dProjectEntity.findAllByDocStaticPageAsync(conditions, pageParam.pidArray, fields, options).then(function (docs) {
                obj.data = docs;
                jsonWrite(req, res, ResultCode.SUCCESS, "查询成功", obj, false);
            }, function (error) {
                logger.error(error);
                jsonWrite(req, res, ResultCode.ERROR, "查询失败", obj, false);
            });
        }
        var findMembersOfMe = function (pageParam) {
            var obj = {};
            logger.info("==============");
            var conditions = {uid: pageParam.uid};
            var fields = {}; // 待返回的字段
            var options = {};
            var pidArray = [];
            dMemberEntity.findAllByDocStaticAsync(conditions, fields, options).then(function (docs) {
                logger.info("docs = " + docs);
                for (let i = 0; i < docs.length; i++) {
                    pidArray.push(docs[i].pid);
                }
                pageParam.pidArray = pidArray;
                logger.info("pageParam.pidArray = " + pageParam.pidArray);
                findMyAllProject(pageParam);
            }, function (error) {
                logger.error(error);
                jsonWrite(req, res, ResultCode.ERROR, "查询失败", obj, false);
            });
        }
        findMembersOfMe(REQUEST)
    }

}