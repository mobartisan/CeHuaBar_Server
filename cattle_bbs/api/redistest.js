/**
 * Created by kingsheol on 2016/5/23.
 */
var redisclient = require('../redis/redisclient');
redisclient.select('0',function(err){
    if (err){
        logger.error(err);
    }
    else {
        redisclient.keys("mu:123456*",function(err,value){
            if (err){
                console.log(err);
            }
            else{
                /*console.log(value);
                console.log((value.length==0));//判断有无符合条件的key
                //批量get
                redisclient.mget(value,function(err,t){
                    if (err){
                        console.log(err);
                    }
                    else{
                        console.log(t);
                        for (var i=0;i< t.length;i++){
                            console.log(t[i]);
                        }
                    }
                });*/
                redisclient.del(value,function(err){//删除这些key
                    if (err){
                        return console.log(err);
                    }
                    console.log("删除成功");
                })
            }
        });
        /*var key="mu:123456*";
        var obj={};
        obj.id=123;
        obj.state=1;
        redisclient.set(key,JSON.stringify(obj),function(err){
            if (err){
                logger.error(err);
            }
            redisclient.get(key,function(err,ret){
                if (err){
                    logger.error(err);
                }
                else{
                    j=JSON.parse(ret);
                    console.log(j.state);
                }
            })
        })*/
    }

});
