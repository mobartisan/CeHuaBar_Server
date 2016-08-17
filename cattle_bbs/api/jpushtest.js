/**
 * Created by kingsheol on 2016/4/28.
 */
var JPush = require("jpush-sdk");
var client = JPush.buildClient('2999195b3c807b7a416247ba', '13a59f9667354cb599a41f6b');

//easy push
client.push().setPlatform(JPush.ALL)
    .setAudience(JPush.alias('8000'))
    .setNotification('PUSH TEST AGAIN')
    .send(function(err, res) {
        if (err) {
            console.log(err.message);
        } else {
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

