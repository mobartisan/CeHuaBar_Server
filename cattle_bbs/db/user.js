var mppBookshelf = require('./base');
var uuid = require('node-uuid');
var dateutil = require("../middlewares/dateFormat")

var User = mppBookshelf.Model.extend({
    tableName: 't_user'
}, {
    //根据用户名查询用户
    /*select * from user where login_name=$name*/
    findUserByAccountName: function findUserByAccountName(name) {
        console.log("name = " + name)
        return this.forge({username: name}).fetch();
    },
    findUserById: function (uid) {
        return this.forge({uid: uid}).fetch();
    }
});
var Users = mppBookshelf.Collection.extend({
        model: User
    }, {
        //根据用户名、真名、邮箱、手机号、公司、部门模糊查询用户
        /*select * from user where login_name like %skey% or real_name like %skey% or email like %skey%
         or main_mobile like %skey% or org like %skey% or dept like %skey%*/
        findUsersByCondition: function (skey) {
            key = '%' + skey + '%';
            return this.query(function (qb) {
                qb.where('login_name', 'LIKE', key).orWhere('real_name', 'LIKE', key).orWhere('email', 'LIKE',
                    key).orWhere('main_mobile', 'LIKE', key).orWhere('org', 'LIKE', key).orWhere('dept', 'LIKE', key)
            }).fetch();
        },
        getSipNumbersByUserid: function (idset) {
            return this.query(function (qb) {
                qb.where('id', 'in', idset).andWhere('sip_id', '!=', "");
            }).fetch({columns: ['id', 'sip_id']});
        },
        getPushidByUserid: function (idset) {
            return this.query(function (qb) {
                qb.where('id', 'in', idset).andWhere('registration_id', '!=', '');
            }).fetch({columns: ['registration_id']});
        },
        getUsersBySipid: function (idset) {
            return this.query(function (qb) {
                qb.where('sip_id', 'in', idset);
            }).fetch();
        },
        getSameNameNum: function (name) {
            return this.query({where: {real_name: name}}).count();
        },
        getUsersByDept: function (dept, stamp, limit) {
            return this.query(function (qb) {
                qb.where('dept', '=', dept).andWhere('real_name', '>=', stamp).orderBy('real_name', 'asc').limit(limit);
            }).fetch()
        }

    }
);
var Login_log = mppBookshelf.Model.extend({
    tableName: 't_user_login_log'
}, {
    //新增登陆记录
    /*insert into user_login_log values (uuid.v1(),$userid,$dev_id,Date.now(),$login_ip)*/
    createLoginLog: function (uid, dev_id, login_ip) {
        return this.forge().save({
            id: uuid.v1(),
            uid: uid,
            dev_id: dev_id,
            login_time: dateutil(new Date()),
            login_ip: login_ip
        });
    }
});
var Login_logs = mppBookshelf.Collection.extend({
        model: Login_log
    }
);
module.exports = {
    User: mppBookshelf.model('User', User),
    Users: mppBookshelf.collection('Users', Users),
    Login_log: mppBookshelf.model('Login_log', Login_log),
    Login_logs: mppBookshelf.collection('Login_logs', Login_logs)
};