var crypto = require('crypto');

var MD5Crypto = function(content){
    return crypto.createHash('md5').update(content).digest('hex');
}

module.exports = MD5Crypto;