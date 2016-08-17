// var conf=require('../conf/conf');
// var redisclient = require('./redisclient');
// redisclient.select('0',function(err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         key = conf.redisschema.id_session + "*";
//         console.log(key);
//         redisclient.keys(key, function (err, value) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(value);
//             }
//         });
//     }
// });
