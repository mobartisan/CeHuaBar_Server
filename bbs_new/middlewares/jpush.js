/**
 * Created by kingsheol on 2016/4/28.
 */
var JPush = require("jpush-sdk");
var dateFormat=require('./dateFormat');
var logger=require('./log').logger;
var conf=require('../conf/conf');
var client = JPush.buildClient(conf.jpush.appkey,conf.jpush.masterkey);
//var client = JPush.buildClient('2999195b3c807b7a416247ba', '13a59f9667354cb599a41f6b');
module.exports={
    test:function(id){
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.registration_id(id))
            .setNotification("通知推送测试")
            .send(function(err,res) {
                if (err) {
                    logger.error(err.message);
                }
                else{
                    console.log('Sendno: ' + res.sendno);
                    console.log('Msg_id: ' + res.msg_id);
                    client.getReportReceiveds(res.msg_id, function(err, res) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            for (var i=0; i<res.length; i++) {
                                console.log(res[i].android_received);
                                console.log(res[i].ios_apns_sent);
                                console.log(res[i].msg_id);
                                console.log('------------');
                            }
                        }
                    });
                }
            });
    },
    //预约会议人员邀请通知推送
    orderMeetingInvitePush:function(creatorName,subject,meetingId,meetingNumber,userList,startTime){
        try{
            var title='会议通知';
            var date=new Date(startTime);
            var content=creatorName+'邀请您参加将于'+dateFormat(date)+'召开的会议：'+subject;
            var extraData={};
            extraData.Type=1;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
            extraData.subType=1;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
            extraData.meetingId=meetingId;
            extraData.meetingNumber=meetingNumber;
            extraData.meetingType=1;
            client.push().setPlatform('ios', 'android')
                .setAudience(JPush.registration_id(userList))
                .setNotification(
                    JPush.android(content,title,1,extraData),
                    JPush.ios(content,'sound',1,false,extraData)
                )
                .send(function(err) {
                    if (err) {
                        logger.error(err.message);
                    }
                });
        }catch(err){
            logger.error("推送失败："+err.stack);
        }


    },
    //即时会议人员邀请通知推送
    instantMeetingInvitePush:function(creatorName,meetingId,meetingNumber,userList){
        var title='会议通知';
        var content=creatorName+'发起了一个即时会议';
        var extraData={};
        extraData.Type=1;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=1;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
        extraData.meetingId=meetingId;
        extraData.meetingNumber=meetingNumber;
        extraData.meetingType=0;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //邀请人员参加会议通知推送
    addMeetingMembersPush:function(operatorName,subject,meetingId,meetingNumber,meetingType,userList){
        var title='会议通知';
        var content=creatorName+'邀请您加入会议:'+subject;
        var extraData={};
        extraData.Type=1;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=1;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
        extraData.meetingId=meetingId;
        extraData.meetingNumber=meetingNumber;
        extraData.meetingType=meetingType;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //移出会议成员通知推送
    removeMeetingMembersPush:function(operatorName,meetingId,meetingNumber,meetingType,userList){
        var title='会议通知';
        var content=operatorName+'将您移出会议';
        var extraData={};
        extraData.Type=1;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=3;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
        extraData.meetingId=meetingId;
        extraData.meetingNumber=meetingNumber;
        extraData.meetingType=meetingType;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //会议附件变更消息推送
    newMeetingAttachsPush:function(operatorName,meetingId,userList){
        var title='会议文件更新';
        var content=operatorName+'上传了文件';
        var extraData={};
        extraData.Type=2;// 消息类型：1-会议通知，2-会议文件变更
        extraData.meetingId=meetingId;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setMessage(content,title,'text',extraData)
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //会议回执推送
    meetingReplyPush:function(operatorName,meetingId,userList,status){
        var title='会议回执';
        var content="";
        var extraData={};
        extraData.Type=4;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=status;//0-拒绝会议邀请;1-接受会议邀请
        extraData.meetingId=meetingId;
        if (status==0){
            content=operatorName+'拒绝了您的邀请';
        }
        else{
            content=operatorName+'接受了您的邀请';
        }
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //会议开始通知推送
    meetingStartPush:function(subject,meetingId,meetingNumber,meetingType,userList){
        var title='会议通知';
        var content='会议：'+subject+' 已开始';
        var extraData={};
        extraData.Type=1;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=2;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
        extraData.meetingId=meetingId;
        extraData.meetingNumber=meetingNumber;
        extraData.meetingType=meetingType;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //会议结束通知推送
    meetingEndPush:function(subject,meetingId,meetingNumber,meetingType,userList){
        var title='会议通知';
        var content='会议：'+subject+' 已结束';
        var extraData={};
        extraData.Type=1;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=3;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
        extraData.meetingId=meetingId;
        extraData.meetingNumber=meetingNumber;
        extraData.meetingType=meetingType;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //会议即将开始提醒推送
    meetingRemindPush:function(subject,meetingId,meetingNumber,meetingType,userList){
        var title='会议通知';
        var content='会议：'+subject+' 将于5分钟后开始';
        var extraData={};
        extraData.Type=1;// 消息类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.subType=4;// 1-会议邀请通知 2-会议开始通知 3-会议结束通知 4-会议提醒通知
        extraData.meetingId=meetingId;
        extraData.meetingNumber=meetingNumber;
        extraData.meetingType=meetingType;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    //会议人员状态变更消息推送
    meetingMemberStatusPush:function(operatorName,meetingId,userList,statusList,content){
        var title='参会成员状态更新';
        var extraData={};
        extraData.Type=2;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更, 4-会议回执
        extraData.meetingId=meetingId;
        extraData.users=statusList;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setMessage(content,title,'text',extraData)
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    },
    /**禁言/解除禁言通知推送
     *
     * @param meetingId
     * @param isAll 是否为全员禁言/解除禁言
     * @param status 0-禁言，1-解除禁言
     * @param userList
     */
    gagPush:function(meetingId,isAll,status,userList){
        var title='会议通知';
        var content='';
        if (isAll==0){
            if (status==0){
                content='管理员已将您禁言';
            }
            else{
                content='管理员已将您解除禁言';
            }
        }
        else{
            if (status==0){
                content='管理员已启用全员禁言';
            }
            else{
                content='管理员已解除全员禁言';
            }
        }

        var extraData={};
        extraData.Type=2;// 消息子类型：1-会议通知，2-与会人员状态变更，3-会议文件变更,4-会议回执
        extraData.meetingId=meetingId;
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(userList))
            .setNotification(
                JPush.android(content,title,1,extraData),
                JPush.ios(content,'sound',1,0,extraData)
            )
            .send(function(err) {
                if (err) {
                    logger.error(err.message);
                }
            });
    }
};



