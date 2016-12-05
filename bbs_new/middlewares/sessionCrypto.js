var crypto = require('crypto');
var urlencode = require('urlencode');
var sign = function(val, secret){
    if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
    if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
    return urlencode('s:'+val + '.' + crypto
            .createHmac('sha256', secret)
            .update(val)
            .digest('base64')
            .replace(/\=+$/, ''));
};
module.exports = sign;