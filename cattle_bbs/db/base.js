var conf=require('../conf/conf');
var knex = require('knex')(conf.mysql);
var mppBookshelf = require('bookshelf')(knex);
mppBookshelf.plugin('registry');
module.exports = mppBookshelf;