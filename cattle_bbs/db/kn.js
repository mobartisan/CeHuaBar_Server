var mppBookshelf = require('./base');
var uuid = require('node-uuid');

var Kn = mppBookshelf.Model.extend({
    tableName: 't_kn'
}, {
    //根据ID查询一条唯一的知识库
    /*select * from user where login_name=$name*/
    findKnById: function findKnById(id) {
        console.log("id = " + id)
        return this.forge({id: id}).fetch();
    }
});
var Kns = mppBookshelf.Collection.extend({
        model: Kn
    }, {
        findKnByCode: function (code) {
            return this.query(function (qb) {
                qb.where('kn_device_code', '=', code).orderBy('kn_type', 'asc');
            }).fetch()
        }
    }
);

module.exports = {
    Kn: mppBookshelf.model('Kn', Kn),
    Kns: mppBookshelf.collection('Kns', Kns)
};