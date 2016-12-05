/**
 * Created by mikebian on 16/7/23.
 */
//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var dUserEntity = require('../mongodb/d_user_schema').DUserEntity;
var dProjectEntity = require('../mongodb/d_project_schema').DProjectEntity;
var dProfileEntity = require('../mongodb/d_profile_schema').DProfileEntity;
var dMemberEntity = require('../mongodb/d_member_schema').DMemberEntity;
var dMediaEntity = require('../mongodb/d_media_schema').DMediaEntity;
var dMomentEntity = require('../mongodb/d_comment_schema').DCommentEntity;
var dMomentSchema = require('../mongodb/d_comment_schema').DComment;
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var logger = require('../middlewares/log').logger;
var dateutils = require("../middlewares/dateutils");
var dGroupEntity = require('../mongodb/d_group_schema').DGroupEntity;
const REQ_PARAM
    =
{
    pid: "5844e4d205bba03115f27a88",
    uid: "30fb2a10-ba9c-11e6-8d67-8db0a5730ba6",
    mid: "5844c5c37202ac66116b0a95",
}

module.exports = {

//----------------------------------------------------------------
    /**
     * 发起MOMENT
     * @param req
     * @param res
     * @param next
     */
    addMoment: function (req, res, next) {
        let DEMO_REQ =
        {
            type: 1,
            pid: REQ_PARAM.pid,
            uid: REQ_PARAM.uid,
            text: "第一个Moment",
            medias: [{
                uid: REQ_PARAM.uid,
                type: 0,
                url: "www.baidu.com",
                from: 1,
            }, {
                uid: REQ_PARAM.uid,
                type: 0,
                url: "www.sohu.com",
                from: 1,
            }],
        }
        let REQUEST =
        {
            type: req.body.type,
            pid: req.body.pid,
            uid: req.user.id,
            text: req.body,text,
            medias: req.body.medias||[]
        }
        var addMomentInfo = function (param) {
            logger.info("addProject  param.prid= " + param.prid);
            var insertFields = {
                uid: param.uid,
                pid: param.pid,
                prid: param.prid,
                type: param.type,//0是dicuss 1是moment，2是投票
                medias: param.mediasIdArray,
                text: param.text,
                update_id: param.uid,
                create_id: param.uid
            }; // 待返回的字段
            //增加一条互数据
            var obj = {};
            dMomentEntity.addRecordAsync(insertFields).then(function (docs) {
                logger.info("正常时 插入结果为" + docs);
                obj.message = "插入成功"
                obj.code = ResultCode.SUCCESS
                obj.data = docs;

            }, error=> {
                logger.info("报错后 插入结果为" + error);
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            }).then(()=> {
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }

        var addVotesInfo = function (param) {
            logger.info("addProject  param.prid= " + param.prid);
            var insertFields = {
                uid: param.uid,
                pid: param.pid,
                prid: param.prid,
                type: param.type,//0是dicuss 1是moment，2是投票
                medias: param.medias,
                text: {
                    type: String,
                },
                vote_title: {
                    type: String,
                },
                votes: [
                    {
                        type: String,
                    }
                ],
                comments: [
                    {
                        type: mongoose.Schema.ObjectId,
                        ref: "D_COMMENTS"
                    }
                ],
                update_id: param.uid,
                create_id: param.uid
            }; // 待返回的字段
            //增加一条互数据
            var obj = {};
            dMomentEntity.addRecordAsync(insertFields).then(function (docs) {
                logger.info("正常时 插入结果为" + docs);
            }, error=> {
                logger.info("报错后 插入结果为" + error);
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }
        var checkOperate = function (param) {
            switch (param.type) {
                case 1:
                    addMomentInfo(param);
                    break;
                case 2:
                    addVotesInfo(param);
                    break;
            }
        }
        var addMedias = function (param) {
            var obj = {};
            var count = 0;
            var mediasArray = param.medias;
            var mediasIdArray = [];
            var insertMedia = function (count, mediasArray) {
                logger.info("正常时 count= " + count);
                mediasArray[count].update_id = param.pid;
                mediasArray[count].create_id = param.pid
                dMediaEntity.addRecordAsync(mediasArray[count]).then(docs=> {
                    //logger.info("正常时 插入结果为" + docs);
                    logger.info("==============正常时 插入结果为" + docs._id);
                    mediasIdArray.push(docs._id);
                }, error => {
                    logger.info("报错后 插入结果为" + error);
                    obj.error = error;
                    obj.message = "插入失败"
                    obj.code = ResultCode.ERROR
                }).then(function () {
                    count++;
                    if (count < mediasArray.length) {
                        insertMedia(count, mediasArray);
                    } else {
                        param.mediasIdArray = mediasIdArray;
                        checkOperate(param)
                    }
                });
            }
            insertMedia(count, mediasArray)
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
                    addMedias(param);

                }
            }, error=> {
                logger.info("查询失败" + error);
                obj.error = error;
                obj.message = "查询失败"
                obj.code = ResultCode.ERROR
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }

        findProfileObjectIdByUid(DEMO_REQ)
        next("fff");
    },
    /**
     * 添加评论
     * @param req
     * @param res
     * @param next
     */
    addDiscuss: function (req, res, next) {
        var updateMomentInfo = function (param, discussDocs) {
            console.log("updateMomentInfo= " + discussDocs);
            var obj = {};
            var conditions = {_id: param.mid};
            var update = {
                $set: {
                    comments: discussDocs.comments,
                    update_date: dateutils.dateFormat(new Date()),
                    update_id: param.uid
                }
            };
            var options = {upsert: false};
            dMomentEntity.updateRecordAsync(conditions, update, options).then(function (numberAffected) {
                console.log("numberAffected= " + numberAffected.nModified);
            }, function (error) {
                console.log(error)
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                jsonWrite(req, res, ResultCode.ERROR, "插入失败", obj, false);
            }).then(function () {
                jsonWrite(req, res, ResultCode.SUCCESS, "插入成功", obj, false);
            });
        }

        var findMomentById = function (param, discussDocs) {
            var obj = {};
            var conditions = {
                _id: param.mid
            };
            var commentsfields = {
                comments: 1,
            }; // 待返回的字段
            dMomentEntity.findOneByDocAsync(conditions, commentsfields).then(docs=> {
                logger.info("查询Moment数据库");
                if (docs) {
                    logger.info("docs ====s=d= " + discussDocs._id);
                    docs.comments.push(discussDocs._id);
                    logger.info("commentsd= " + docs.comments);
                    updateMomentInfo(param, docs);
                }
            }, error=> {
                logger.info("查询失败" + error);
                obj.error = error;
                obj.message = "查询失败"
                obj.code = ResultCode.ERROR
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }

        var addDiscussInfo = function (param) {
            logger.info("addDiscussInfo  param.prid= " + param.prid);
            var insertFields = {
                uid: param.uid,
                pid: param.pid,
                prid: param.prid,
                type: param.type,//0是dicuss 1是moment，2是投票
                medias: param.mediasIdArray,
                text: param.text,
                update_id: param.uid,
                create_id: param.uid
            }; // 待返回的字段
            //增加一条互数据
            var obj = {};
            dMomentEntity.addRecordAsync(insertFields).then(function (docs) {
                logger.info("正常时 插入DIcss结果为" + docs);
                findMomentById(param, docs)
            }, error=> {
                logger.info("报错后 插入结果为" + error);
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }

        var addMomentInfo = function (param) {
            logger.info("addProject  param.prid= " + param.prid);
            var insertFields = {
                uid: param.uid,
                pid: param.pid,
                prid: param.prid,
                type: param.type,//0是dicuss 1是moment，2是投票
                medias: param.mediasIdArray,
                text: param.text,
                update_id: param.uid,
                create_id: param.uid
            }; // 待返回的字段
            //增加一条互数据
            var obj = {};
            dMomentEntity.addRecordAsync(insertFields).then(function (docs) {
                logger.info("正常时 插入结果为" + docs);
            }, error=> {
                logger.info("报错后 插入结果为" + error);
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }

        var addVotesInfo = function (param) {
            logger.info("addProject  param.prid= " + param.prid);
            var insertFields = {
                uid: param.uid,
                pid: param.pid,
                prid: param.prid,
                type: param.type,//0是dicuss 1是moment，2是投票
                medias: param.medias,
                text: {
                    type: String,
                },
                vote_title: {
                    type: String,
                },
                votes: [
                    {
                        type: String,
                    }
                ],
                comments: [
                    {
                        type: mongoose.Schema.ObjectId,
                        ref: "D_COMMENTS"
                    }
                ],
                update_id: param.uid,
                create_id: param.uid
            }; // 待返回的字段
            //增加一条互数据
            var obj = {};
            dMomentEntity.addRecordAsync(insertFields).then(function (docs) {
                logger.info("正常时 插入结果为" + docs);
            }, error=> {
                logger.info("报错后 插入结果为" + error);
                obj.error = error;
                obj.message = "插入失败"
                obj.code = ResultCode.ERROR
                logger.debug("final 发送")
                jsonWrite(req, res, obj.code, obj.message, obj, true);
            });
        }
        var checkOperate = function (param) {
            switch (param.type) {
                case 0:
                    addDiscussInfo(param);
                    break;
                case 1:
                    addMomentInfo(param);
                    break;
                case 2:
                    addVotesInfo(param);
                    break;
            }
        }
        var addMedias = function (param) {
            var obj = {};
            var count = 0;
            var mediasArray = param.medias;
            var mediasIdArray = [];
            var insertMedia = function (count, mediasArray) {
                logger.info("正常时 count= " + count);
                mediasArray[count].update_id = param.pid;
                mediasArray[count].create_id = param.pid
                dMediaEntity.addRecordAsync(mediasArray[count]).then(docs=> {
                    //logger.info("正常时 插入结果为" + docs);
                    logger.info("==============正常时 插入结果为" + docs._id);
                    mediasIdArray.push(docs._id);
                }, error => {
                    logger.info("报错后 插入结果为" + error);
                    obj.error = error;
                    obj.message = "插入失败"
                    obj.code = ResultCode.ERROR
                }).then(function () {
                    count++;
                    if (count < mediasArray.length) {
                        insertMedia(count, mediasArray);
                    } else {
                        param.mediasIdArray = mediasIdArray;
                        checkOperate(param)
                    }
                });
            }
            insertMedia(count, mediasArray)
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
                    addMedias(param);
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
            type: 0,
            pid: REQ_PARAM.pid,
            uid: REQ_PARAM.uid,
            mid: REQ_PARAM.mid,
            text: "第一个Discuss",
            medias: [{
                uid: REQ_PARAM.uid,
                type: 0,
                url: "www.baidu.com",
                from: 1,
            }, {
                uid: REQ_PARAM.uid,
                type: 0,
                url: "www.sohu.com",
                from: 1,
            }],
        }
        findProfileObjectIdByUid(DEMO_REQ)
        next("ddd");
    },
    /**
     * 获取所有项目的MOMENT和DISSCUSS(首页)
     * @param req
     * @param res
     * @param next
     */
    findPartProjectByAll: function (req, res, next) {
        let DEMO_REQ =
        {
            uid: REQ_PARAM.uid,
            page: 1,
            rows: 20
        }
        let REQUEST =
        {
            uid: req.user.id,
            page: req.query.page||1,
            rows: req.query.rows||10
        }
        //var page = req.query.page;
        //var rows = req.query.rows;
        var pageParam = {};
        pageParam.page = Number((REQUEST.page - 1) * REQUEST.rows);
        pageParam.rows = Number(REQUEST.rows);
        pageParam.uid = REQUEST.uid;
        var findMyAllComments = function (pageParam) {
            var obj = {};
            logger.info("==============");
            var conditions = {};
            var fields = {}; // 待返回的字段
            var options = {};
            dMomentEntity.findAllByDocStaticPageAsync(conditions, [1, 2], pageParam.pidArray, fields, options, pageParam.rows, pageParam.page).then(function (docs) {
                obj.message = "查询成功"
                obj.code = ResultCode.SUCCESS
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
                findMyAllComments(pageParam);
            }, function (error) {
                logger.error(error);
                jsonWrite(req, res, ResultCode.ERROR, "查询失败", obj, false);
            });
        }
        findMembersOfMe(pageParam)
        next("findPartProjectByAll");
    },

}