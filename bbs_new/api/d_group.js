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
module.exports = {

//----------------------------------------------------------------
//增加一条Project数据
    addGroup: function (req, res, next) {
        logger.debug("addGroup")
        let DEMO_REQ =
        {
            uid: REQ_PARAM.uid,
        }
        let REQUSET =
        {
            uid: req.user.id,
        }
        logger.debug()

        next("addGroup");
    },

    findGroup: function (req, res, next) {
        logger.debug("findGroup")
        let DEMO_REQ =
        {
            uid: REQ_PARAM.uid,
        }
        let REQUSET =
        {
            uid: req.user.id,
        }

        next("addGroup");
    }

}