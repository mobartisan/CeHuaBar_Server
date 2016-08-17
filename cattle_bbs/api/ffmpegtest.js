/**
 * Created by kingsheol on 2016/5/12.
 */
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.ffprobe('./upload/meetingattachs/upload_4caac6b8fce3641c63d1cd01da39e0a9.mp4', function(err, metadata) {
    if (err){
        console.log(err);
    }
    else {
        console.dir(metadata.format.duration.toString().split('.')[0]);
    }
});
ffmpeg('./upload/meetingattachs/upload_4caac6b8fce3641c63d1cd01da39e0a9.mp4')
    .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
    })
    .screenshots({
        timestamps: ['5%'],
        filename: '1.jpg',
        folder: './upload/'
    });
/*
ffmpeg('./upload/meetingattachs/upload_4caac6b8fce3641c63d1cd01da39e0a9.mp4')
    .on('filenames', function(filenames) {
        console.log('Will generate ' + filenames.join(', '))
    })
    .on('end', function() {
        console.log('Screenshots taken');
    })
    .on('error',function(err){
        console.log(err);
    })
    .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 4,
    });*/
