/**
 * Created by kingsheol on 2016/5/11.
 */
var easyimg = require('easyimage');
easyimg.info('./upload/meetingattachs/14cc665c-9188-4263-bc9f-b9d3ad030cb2.jpg').then(
    function(file) {
        var i=2;
        console.log('原width'+file.width,'原height'+file.height);
        while (320*480*i*i<file.width*file.height){
            i++;
        }

        console.log(--i);
        var width=file.width/i;
        var height=file.height/i;
        easyimg.resize({
            src:'./upload/meetingattachs/14cc665c-9188-4263-bc9f-b9d3ad030cb2.jpg', dst:'./upload/2.jpg',
            width:width, height:height
        }).then(
            function(image) {
                console.log('Resized: ' + image.width + ' x ' + image.height);
            },
            function (err) {
                console.log(err);
            }
        );
    }, function (err) {
        console.log(err);
    }
);
