module.exports = {
    log4js: {
        appenders: [
            {
                "type": "console"
            },
            {
                "type": "dateFile",
                "filename": "logs/access.log",
                "pattern": "-yyyy-MM-dd",
                "alwaysIncludePattern": true,
                category: 'access'
            }
        ],
        replaceConsole: true  //替换console.log
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'mpp_db',
            charset: 'utf8'
        }
    },
    redis: {
        host: "127.0.0.1",
        port: 6379,
        db: 0,
        pass: '',
        ttl: 72000
    },
    session_option: {
        secret: 'j3#94%g*21asdh8s20sd&^!*',
        name: 'sid',
        cookie: {maxAge: 72000000},
        resave: true,
        saveUninitialized: false
    },
    redis_option: {
        auth_pass: ''
    },
    redisschema: {
        id_token: "idtoken:",
        token: "token:",
        meeting_user: "mu:",
        meeting_control: "mc:",
        orderMeetingReply: "reply:"
    },
    jpush: {
        appkey: '2aa5fb047ddf2f4d28a27935',
        masterkey: '3f758ee174524d0c7e165667'
    },
    mongodb: {
        db_user: "root",
        db_pwd: "root",
        db_host: "localhost",
        db_port: 27017,
        db_name: "local",
        host: "mongodb://localhost/local"
    },
    getui: {
        APPID: "IDmqL4Had8ARm3iKv9y4g2",
        APPKEY: "jj16WEjX6z8vpT4TF1ChM6",
        MASTERSECRET: "4bxJjcNdUh96Ght4aHotg4"
    },
    pageNo: 10,
    devIntfaceTimeout: 5000,
    meetinginterUrl: "http://120.26.102.93:2333/eMeeting/api/v1.1/users/id/meetingintersection?pageNo=",
    meetinglistUrl: "http://120.26.102.93:2333/eMeeting/api/v1.1/meetinglist?timestamp=",
    meetingattachlistUrl: "http://120.26.102.93:2333/eMeeting/api/v1.1/meeting/",
    companyContactsUrl: "http://120.26.102.93:2333/eMeeting/api/v1.1/orgs/",
    imagebaseurl: "http://120.26.102.93:2333/images/",
    uploadpath: "upload/meetingattachs/",
    thumbpath: "upload/thumbs/"
};