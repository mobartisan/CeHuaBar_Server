//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var MD5Crypto = require('../middlewares/MD5Crypto');
var conf = require('../conf/conf');
var uuid = require('node-uuid');
var dUsersEntity = require('../mongodb/d_user_schema').DUserEntity;
var dProfileEntity = require('../mongodb/d_profile_schema').DProfileEntity;
var dUserLogEntity = require('../mongodb/d_log_schema').DUsersLogEntity;
var dWxAccountEntity = require('../mongodb/d_wx_schema').DWxAccountEntity;
var dGroupEntity = require('../mongodb/d_group_schema').DGroupEntity;
var logger = require('../middlewares/log').logger;
var regexCheck = require('../middlewares/regexCheck');
var dateutils = require("../middlewares/dateutils");
var jwt = require('jsonwebtoken');
var secret = require('../conf/secret');
var tokenManager = require('../conf/token_manager');
var stringUtils = require('../middlewares/stringutils');
/**
 * 原型方式查询一条
 * @param result
 * @param req
 */
var createLoginLog = function (result, req) {
    logger.info("==================登陆日志=====================");
    logger.info("agent " + req.headers['user-agent']);
    let userAgent = req.headers['user-agent']
    let cleintVersion = stringUtils.stringIndex(userAgent, "(", 0, false);
    let osString = stringUtils.stringIndex(userAgent, "(", 1, true);
    let arr = stringUtils.sliceString(osString, ";")
    logger.debug(" 0 " + arr[0])
    logger.debug(" 1 " + arr[1])
    var logIsertfields = {
        uid: result.uid,
        username: result.username,
        os_type: arr[0],
        remoteAddress: req.connection.remoteAddress,
        os_description: arr[1],
        client_version: cleintVersion,
    }
    //增加一条互数据
    dUserLogEntity.addRecordAsync(logIsertfields).then(docs=> {
        logger.info("插入日志成功" + docs);
    }, error=> {
        logger.error(error);
    });
};
module.exports = {
    /**
     * 用户登陆处理
     * @param req
     * @param res
     */
    login: function (req, res) {
        var openid = req.body.openid || '';
        var city = req.body.city || '';
        var country = req.body.country || '';
        var nickname = req.body.nickname || '';
        var privilege = req.body.privilege || '';
        var language = req.body.language || '';
        var headimgurl = req.body.headimgurl || '';
        var unionid = req.body.unionid || '';
        var sex = req.body.sex || '';
        var province = req.body.province || '';
        // var os_description = req.body.os_description || '';
        // var os_type = req.body.os_type || '';
        logger.debug("openid = " + openid);
        logger.debug("country = " + country);
        logger.debug("nickname = " + nickname);
        logger.debug("privilege = " + privilege);
        logger.debug("language = " + language);
        logger.debug("city = " + city);
        logger.debug("headimgurl = " + headimgurl);
        logger.debug("unionid = " + unionid);
        logger.debug("sex = " + sex);
        logger.debug("province = " + province);

        if (openid == '' || unionid == '') {
            return jsonWrite(req, res, ResultCode.ERROR, "微信登陆信息不正确", null, false);
        }
        var addGroup = function (uid) {
            var iGroup = [{
                uid: uid,
                group_name: "我管理的项目",
                group_type: 1,
                update_id: uid,
                create_id: uid
            }, {
                uid: uid,
                group_name: "我关注的项目",
                group_type: 2,
                update_id: uid,
                create_id: uid
            }]; // 待返回的字段
            var count = 0;
            var insertGroup = function (count, iGroup) {
                logger.info("正常时 count= " + count);
                dGroupEntity.addRecordAsync(iGroup[count]).then(docs=> {
                    logger.info("插入默认group" + count + " " + docs.group_name);
                }, error => {
                    logger.info("插入默认group报错" + error);
                }).then(function () {
                    count++;
                    if (count < iGroup.length) {
                        insertGroup(count, iGroup);
                    }
                });
            }
            insertGroup(count, iGroup)
        }
        //原型方式查询一条
        var findOneProfileByUid = function (uid) {
            var conditions = {
                uid: uid
            };
            var profilefields = {
                uid: 1,
                email: 1,
                phone: 1,
                nick_name: 1,
                username: 1,
                head_img_url: 1,
                head_img_from: 1,//wx
                city: 1,
                country: 1,
                province: 1,
                language: 1
            }; // 待返回的字段
            dProfileEntity.findOneByDocAsync(conditions, profilefields).then(docs=> {
                logger.info("查询prifle数据库");
                if (docs) {
                    logger.info("wxDoics =" + docs);
                    setToken(docs);
                }
            }, error=> {
                logger.info("login error........");
                logger.error(error);
                jsonWrite(req, res, ResultCode.ERROR, "账号信息不完整", null, false);
            });
        }

        var setToken = function (docs) {
            logger.info("setToken");
            var obj = {};
            var token = jwt.sign({id: docs.uid}, secret.secretToken, {expiresInMinutes: tokenManager.TOKEN_EXPIRATION});
            tokenManager.saveToken(docs.uid, token);
            obj.user_id = docs.uid;
            obj.token = token;
            obj.data = docs;
            logger.info("最后 obj = " + obj.data);
            createLoginLog(docs, req)
            jsonWrite(req, res, ResultCode.SUCCESS, "登录成功", obj, true);
        }
        //原型方式查询一条
        var findOneWxUserByWxInfo = function (unionid) {
            var conditions = {
                unionid: unionid
            };
            //查询一条数据
            var wxFindfields = {
                uid: 1,
                nick_name: 1,
                unionid: 1,
                openid: 1,
                head_img_url: 1,
                language: 1,
                city: 1,
                sex: 1,
                country: 1,
                privilege: 1,
                province: 1,
                update_id: 1,
                update_date: 1,
                create_id: 1,
                create_date: 1,
                deleted: 1
            }; // 待返回的字段
            dWxAccountEntity.findOneByDocAsync(conditions, wxFindfields).then(docs=> {
                logger.info("查询微信数据库");
                if (docs) {
                    logger.info("wxDoics =" + docs);
                    findOneProfileByUid(docs.uid)
                } else {
                    logger.info("开始添加新的wx账号数据");
                    addWxAccount(docs)
                    //jsonWrite(req, res, ResultCode.ERROR, "账户不存在", null, false);
                }
            }, error=> {
                logger.info("login error........");
                logger.error(error);
                jsonWrite(req, res, ResultCode.ERROR, "查询错误", null, false);

            });
            var randomWord = function (randomFlag, min, max) {
                var str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

                // 随机产生
                if (randomFlag) {
                    range = Math.round(Math.random() * (max - min)) + min;
                }
                for (var i = 0; i < range; i++) {
                    pos = Math.round(Math.random() * (arr.length - 1));
                    str += arr[pos];
                }
                return str;
            }
            var username = randomWord(true, 12, 12);
            logger.info("username= " + username);
            var addUser = function (profileDocs) {
                logger.info("addUser");
                var userInsertfields = {
                    uid: profileDocs.uid,
                    email: profileDocs.email,
                    phone: profileDocs.phone,
                    username: username,
                    password: "123456",
                    prid: profileDocs.prid,
                    wid: profileDocs._id,
                    update_id: profileDocs.uid,
                    create_id: profileDocs.uid
                }; // 待返回的字段
                dUsersEntity.addRecordAsync(userInsertfields).then(docs=> {
                    if (docs) {
                        findOneProfileByUid(docs.uid)
                        addGroup(docs.uid);
                    }
                }, error=> {
                    logger.error(error);
                    jsonWrite(req, res, ResultCode.ERROR, "注册失败", null, true);
                    return;
                });
            }
            var addProfile = function (wxDocs) {
                logger.info("addProfile");
                var profileInsertfields = {
                    uid: wxDocs.uid,
                    email: "",
                    phone: "",
                    nick_name: wxDocs.nick_name,
                    username: username,
                    head_img_url: wxDocs.head_img_url,
                    head_img_from: 1,//wx
                    city: wxDocs.city,
                    country: wxDocs.country,
                    privilege: wxDocs.privilege,
                    province: wxDocs.province,
                    language: wxDocs.language,
                    update_id: wxDocs.uid,
                    create_id: wxDocs.uid
                }; // 待返回的字段
                dProfileEntity.addRecordAsync(profileInsertfields).then(docs=> {
                    if (docs) {
                        logger.info("profile doics=" + docs);
                        wxDocs.prid = docs._id;
                        addUser(wxDocs);
                    }
                }, error=> {
                    logger.error(error);
                    jsonWrite(req, res, ResultCode.ERROR, "注册失败", null, true);
                    return;
                });
            }

            var addWxAccount = function () {
                logger.info("addWxAccount");
                var uid = uuid.v1();
                logger.info("uid");
                var wxInsertfields = {
                    uid: uid,
                    nick_name: nickname,
                    unionid: unionid,
                    openid: openid,
                    head_img_url: headimgurl,
                    language: language,
                    province: province,
                    privilege: privilege,
                    city: city,
                    sex: sex,
                    country: country,
                    update_id: uid,
                    create_id: uid
                }; // 待返回的字段
                dWxAccountEntity.addRecordAsync(wxInsertfields).then(wxDocs=> {
                    if (wxDocs) {
                        logger.info("wx" + wxDocs);
                        addProfile(wxDocs);
                    }
                }, error=> {
                    logger.error(error);
                    jsonWrite(req, res, ResultCode.ERROR, "注册失败", null, true);
                    return;
                });
            }
        };
        findOneWxUserByWxInfo(unionid);
    },
    /**
     * 登出
     * @param req
     * @param res
     */
    logout: function (req, res) {
        logger.debug("logout");
        if (req.user) {
            tokenManager.expireToken(req);
            delete req.user;
            jsonWrite(req, res, ResultCode.SUCCESS, "success", null, true);
        }
        else {
            jsonWrite(req, res, ResultCode.RESP_ERROR_NOTLOGIN, "未登录", null, false);
        }
    },
}
;