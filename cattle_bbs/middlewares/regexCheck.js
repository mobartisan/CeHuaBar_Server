/**
 * Created by LENOVO on 2016/6/2.
 */
module.exports={
    isMobile:function(number){
        var isChinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; //移动
        var isChinaUnion  = /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/; //联通
        var isChinaTelcom = /^(?:133|153|177|18[019])\d{8}$/; //电信
        var isOtherTelphone   = /^170([059])\d{7}$/;//其他运营商
        var istelphone = /^1\d{10}$/;//不考虑号段
        var telphone = number.toString().trim();
        if(telphone.length !== 11){
            return false;
        }
        if(isChinaMobile.test(telphone)){
            return true;
        }
        if(isChinaUnion.test(telphone)){
            return true;
        }
        if(isChinaTelcom.test(telphone)){
            return true;
        }
        if(isOtherTelphone.test(telphone)){
            return true;
        }
        return false;
    }
};
