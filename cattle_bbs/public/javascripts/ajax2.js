/**
 * Created by wangmiao on 15-11-9.
 */

/**  ----------cookie----------开始**/
//html初始化检查是否含有cookie
//登陆

//if(islogin=='yes')
// {
// 	$("#lgout span:eq(0)").html("hi,"+username);
//    $("#lgout").show();
//    $("#lg").hide();
//    queryDate();
//    //userManager.userMap(1,eachPage,1,function(){creatPoint($(".khglBgArea .mapWap"),userManager.endX,userManager.startX,userManager.stateWarn)});
//    //jjjd.list(1,eachPage,1,function(){creatPoint($(".jcjdBgArea .mapWap"),jjjd.endX,jjjd.startX,jjjd.stateWarn)});
//	//ssjk.detectionList();
//	//ssjk.reDetectionResult(1,eachPage,1);
//	//xtgl.systemList();
//	//xtgl.systemGjszList();
//	//xtgl.systemGdList(1,eachPage,1);
// }else{
// 	 window.location.href="index.html";
// };



function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 99999999999; //此 cookie 将被保存 30分钟
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return (arr[2]); return null;
}

function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


/**  ----------cookie----------结束**/


function callGetByJson(actionType, actionUrl, paramData, successFun, errorFun, newTimeout) {
    var mytimeout = 10000;
    var isyb=true;
    if (typeof successFun != "function" || typeof errorFun != "function"
        || !(actionType == "POST" || actionType == "GET")
        || actionUrl == undefined || paramData == undefined) {
        return;
    };
    var inTimeout = mytimeout;
    if (newTimeout != undefined && newTimeout != null) {
        inTimeout = newTimeout;
    };
    ajaxPoint  = $.ajax({
        type : actionType,
        timeout : inTimeout,
        url : actionUrl,
        data : paramData,
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        success : function(msg) {
            ajaxPoint = undefined;
            try {
                var tmpData = msg;
                successFun(msg);
                System.out.println(msg);
            } catch (e) {
            } finally {

            }
        },
        error : function() {
            ajaxPoint = undefined;
            try {
                errorFun();
            } catch (e) {
            } finally {

            }
        }
    });

};


//退出
function loginOut(){
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        SetCookie("islogin","no");
    }else{
        delCookie("islogin")
    }
    delCookie("uid")
    delCookie("userCode")
    location.reload()
}
//公共ajax 调用
//var urlCommon = 'http://121.41.34.70:8099/api/';
var urlCommon = 'http://192.168.6.83:9111/api/';
//报价公共地址
var bjCommon = 'http://121.41.34.70:8099/api/';
//var urlCommon = 'http://127.0.0.1:8099/api/';

var jjrAjaxGet = {//经纪人调用ajax
    productDetail:function(goodsId,companyCode){//商品详情
        var url   = urlCommon+'goodsInfoDetail/goodsDetail';
        var param = 'goodsId='+goodsId;
        param += '&companyCode='+companyCode;
        callGetByJson("POST", url, param, function(json) {
            productDetail(json);
        },function() {
            alert("商品详情系统超时");
        }, 10000);
    },
    jifenshangcheng:function(uid){//积分商城初始化首页
        var url   = urlCommon+'shopH5/initIntegralMall';

        var param = 'uid='+uid;
        callGetByJson("POST", url, param, function(json) {
            jifenshangcheng(json);
        },function() {
            alert("积分商城初始化首页系统超时");
        }, 10000);
    },
    haoxiangjiafuwu:function(uid){//好想家服务
        var url   = urlCommon+'shopH5/integralByKind';
        var param = 'uid='+uid;
        param += '&kind=1';
        callGetByJson("POST", url, param, function(json) {
            haoxiangjiafuwu(json);
        },function() {
            alert("冷暖服务系统超时");
        }, 10000);
    },
    shenghuoxiuxian:function(uid){//生活休闲
        var url   = urlCommon+'shopH5/integralByKind';
        var param = 'uid='+uid;
        param += '&kind=2';
        callGetByJson("POST", url, param, function(json) {
            shenghuoxiuxian(json);
        },function() {
            alert("家居休闲系统超时");
        }, 10000);
    },
    jifenshangpinxiangqing:function(classId){//积分商城查看商品详情
        $(document).frRoute({
            direct:true,
            directUrl:'jifenShop-detail.html',
            callBack:function(){
                var url   = urlCommon+'shopH5/integralExchage';
                var uid   = getCookie("uid");
                var param = 'uid='+uid;
                param += '&id='+classId;
                param += '&kind='+'';
                callGetByJson("POST", url, param, function(json) {
                    jifenshangpinxiangqing(json);
                },function() {
                    alert("积分商城查看商品详情系统超时");
                }, 10000);
            }
        })
    },
    qiandao:function($this){//签到加积分
        var url   = urlCommon+'shopH5/addPoints';
        uid   = getCookie("uid");
        var param = 'uid='+uid;
        callGetByJson("POST", url, param, function(json) {
            qiandao(json,$this);
        },function() {
            alert("签到加积分系统超时");
        }, 10000);
    },



    morendizhi:function(id){//进入商品详情获取默认地址
        $(document).frRoute({
            direct:true,
            directUrl:'morendizhi.html',
            callBack:function(){
                var url   = urlCommon+'shopH5/getDefualtAdress';
                uid   = getCookie("uid");
                var param = 'uid='+uid;
                param += '&id='+id;
                param += '&kind=';
                callGetByJson("POST", url, param, function(json) {
                    morendizhi(json);
                },function() {
                    alert("进入商品详情获取默认地址系统超时");
                }, 10000);
            }
        })
    },
    dizhiguanli:function(code){//进入地址管理
        $(document).frRoute({
            direct:true,
            directUrl:'dizhiguanli.html',
            callBack:function(){
                var url   = urlCommon+'shopH5/getAddress';
                uid   = getCookie("uid");
                var param = 'uid='+uid;
                param += '&code='+code;
                param += '&kind=';
                callGetByJson("POST", url, param, function(json) {
                    dizhiguanli(json);
                },function() {
                    errorManage("进入地址管理系统超时");
                }, 10000);
                url   = urlCommon+'shopH5/getDefualtAdress';
                var param = 'uid='+uid;
                param += '&id='+code;
                param += '&kind=';
                callGetByJson("POST", url, param, function(json) {
                    morendizhi(json);
                },function() {
                    alert("进入商品详情获取默认地址系统超时");
                }, 10000);
            }
        })
    },
    bianjidizhi:function(type,code,addressId){//编辑地址
        $(document).frRoute({
            direct:true,
            directUrl:'addAddress.html',
            callBack:function(){
                var url   = urlCommon+'shopH5/addAndModAddress';
                uid   = getCookie("uid");
                var param = 'addressId='+addressId;
                param += '&code='+code;
                param += '&type='+type;
                param += '&kind=';
                callGetByJson("POST", url, param, function(json) {
                    bianjidizhi(json);
                },function() {
                    alert("编辑地址系统超时");
                }, 10000);
            }
        })
    },
    insertAddress:function(){//新增地址
        var url   = urlCommon+'shopH5/insertAddress';
        uid   = getCookie("uid");
        var param =$("#saveAddressForm").serialize();
        param += '&uid='+uid;
        var code = $("#mrdz_code").val().trim();
        var name = $("#bjdz_name").val().trim();
        var phone = $("#bjdz_phone").val().trim();
        var address = $("#bjdz_address").val().trim();
        callGetByJson("POST", url, param, function(json) {
            $(document).frRoute({
                direct: true,
                directUrl: 'morendizhi.html',
                callBack:function(){
                    $("#address_div").html("");
                    var html = "";
                    html+='<div class="dhBg1 clearfix top10" onclick="getAddress('+code+')">';
                    html+='<p><i class="fa fa-user"></i>'+name+' &nbsp;&nbsp;&nbsp;<i class="fa fa-mobile left10"></i>'+phone+'</p>';
                    html+='<p class="col999 text-over">'+address+'</p>';
                    html+='<i class="fa fa-angle-right"></i>';
                    html+='</div>';
                    $("#address_div").append(html);
                    $("#mrdz_addressId").val(json.addressId);
                }
            })

        },function() {
            alert("新增地址系统超时");
        }, 10000);
    },
    updateAddress:function(){//修改地址
        var url   = urlCommon+'shopH5/updateAddress';
        uid   = getCookie("uid");
        var param =$("#saveAddressForm").serialize();
        param += '&uid='+uid;
        var goodCode = $("#bjdz_goodsCode").val();
        callGetByJson("POST", url, param, function(json) {
            jjrAjaxGet.dizhiguanli(goodCode);
        },function() {
            alert("修改地址系统超时");
        }, 10000);
    },
    deleteAddress:function(addressId,goodCode){//删除地址
        var url   = urlCommon+'shopH5/deleteAddress';
        var param = 'addressId='+addressId;
        param += '&goodCode='+goodCode;
        param += '&kind=';
        callGetByJson("POST", url, param, function(json) {
            jjrAjaxGet.dizhiguanli(goodCode);
        },function() {
            alert("删除地址系统超时");
        }, 10000);
    },
    getCity:function(parentId){//根据省获取城市
        var url   = urlCommon+'shopH5/getCity';
        var param = 'parentId='+parentId;
        callGetByJson("POST", url, param, function(json) {
            var listCity = eval("("+json.listCity+")");
            var html="<option value='0'>--请选择城市--</option>";
            for(var key in listCity){ //第一层循环取到各个list
                var List = listCity[key];
                html+="<option value='"+List.cityId+"'>"+List.cityName+"</option>";
            }
            $("#bjdz_cityId").append(html);
        },function() {
            alert("根据省获取城市系统超时");
        }, 10000);
    },
    getArea:function(parentId){//根据城市获取区域
        var url   = urlCommon+'shopH5/getCity';
        var param = 'parentId='+parentId;
        callGetByJson("POST", url, param, function(json) {
            var listCity = eval("("+json.listCity+")");
            var html="<option value='0'>--请选择城市--</option>";
            for(var key in listCity){ //第一层循环取到各个list
                var List = listCity[key];
                html+="<option value='"+List.cityId+"'>"+List.cityName+"</option>";
            }
            $("#bjdz_areaId").append(html);
        },function() {
            alert("根据城市获取区域系统超时");
        }, 10000);
    },
    duihuanshangpin:function(addressId,code){//兑换商品
        var url   = urlCommon+'shopH5/doExchenge';
        uid   = getCookie("uid");
        var param = 'addressId='+addressId;
        param += '&code='+code;
        param += '&uid='+uid;
        callGetByJson("POST", url, param, function(json) {
            if(json.errmsg=='success'){
                $(document).frRoute({
                    direct:true,
                    directUrl:'duihuanSuccess.html'
                })
            }else{
                $(document).frRoute({
                    direct:true,
                    directUrl:'duihuanFailed.html'
                })
            }
        },function() {
            alert("兑换商品系统超时");
        }, 10000);
    },
    wodeduihuan:function(addressId,code){//我的兑换
        var url   = urlCommon+'shopH5/showExchengeList';
        uid   = getCookie("uid");
        var param = 'uid='+uid;
        callGetByJson("POST", url, param, function(json) {
            wodeduihuan(json);
        },function() {
            alert("我的兑换系统超时");
        }, 10000);
    },
    jifenmingxi:function(){//积分明细
        var url   = urlCommon+'shopH5/showReceiveRecord';
        uid   = getCookie("uid");
        var param = 'uid='+uid;
        callGetByJson("POST", url, param, function(json) {
            jifenmingxi(json);
        },function() {
            alert("积分明细系统超时");
        }, 10000);
    },
    duihuanxiangqing:function(goodsId,id,addressId){//兑换详情
        $(document).frRoute({
            direct:true,
            directUrl:'duihuanxiangqing.html',
            callBack:function(){
                var url   = urlCommon+'shopH5/showExchengeDetail';
                var param = 'goodsId='+goodsId;
                param += '&id='+id;
                param += '&addressId='+addressId;
                callGetByJson("POST", url, param, function(json) {
                    duihuanxiangqing(json);
                },function() {
                    alert("兑换详情系统超时");
                }, 10000);
            }
        })
    },
    didibaojiahuxxing:function(){//嘀嘀报价户型
        var url   = urlCommon+'quoteH5/houseTypeList';
        var param = '';
        callGetByJson("GET", url, param, function(json) {
            didibaojiahuxxing(json);
        },function() {
            alert("获取嘀嘀报价户型系统超时");
        }, 10000);
    },
    didibaojia:function(param,area,houseName){//嘀嘀报价详情
        var url   = urlCommon+'quoteH5/quote';
        callGetByJson("GET", url, param, function(json) {
            ddbjDetail(json,area,houseName);
        },function() {
            alert("获取嘀嘀报价详情系统超时");
        }, 15000);
    },
    tuidanDetail:function(needsCode,uid,role){//推单详情
        var url   = urlCommon+'needs/queryNeedsDetail';
        var param = 'needsCode='+needsCode;
        param += '&uid='+uid;
        param += '&role='+role;
        callGetByJson("GET", url, param, function(json) {
            tuidanDetail(json);
        },function() {
            alert("获取推单详情系统超时");
        }, 15000);
    },
    qiandaoAction:function(uid){//签到
        var url   = urlCommon+'shopH5/addPoints';
        var param = 'uid='+uid;
        callGetByJson("GET", url, param, function(json) {
            if(json.errmsg=='1'){
                alert("今日已签到")
            }else{
                alert("签到成功")
                jjrAjaxGet.qiandaoCalendar(uid);
            }

        },function() {
            alert("签到系统超时");
        }, 15000);
    },
    qiandaoCalendar:function(uid){//签到日历表
        var url   = urlCommon+'shopH5/signProcess';
        var param = 'uid='+uid;
        callGetByJson("GET", url, param, function(json) {
            $(".lxqd").html(json.continueSignDay);
            $(".jifenNum").html(json.score);
            //日历list
            var html='',weekHtml='',length=0,num;
            var setDay = function(){
                $(".day").html("");
                var dateList = eval("("+json.dateList+")");
                for(i=1;i<json.dayOfMonth+1;i++){
                    var flag = true;
                    var flag2 = false;
                    if(i==json.currentDate){
                        flag2 = true;
                    }
                    for(var index in dateList){ //第一层循环取到各个list
                        var List = dateList[index];
                        if(i==List){
                            if(flag2){
                                html+='<span class="span active on">'+i+'</span>';
                            }else{
                                html+='<span class="span active">'+i+'</span>';
                            }
                            flag = false;
                        }
                    }
                    if(flag){
                        if(flag2){
                            html+='<span class="span on">'+i+'</span>'
                        }else{
                            html+='<span class="span">'+i+'</span>'
                        }

                    }
                }
                $(".day").append(html)
            }
            var firstDay = json.firstDay;
            var setWeek = function(){
                $(".week").html("");
                for(i=1;i<8;i++){
                    if(i>=firstDay){
                        rules();
                        weekHtml+='<span class="span">周'+num+'</span>';
                        length = length+1;
                    }
                }
                for(i=1;i<8-length;i++){
                    rules();
                    weekHtml+='<span class="span">周'+num+'</span>'
                }
                $(".week").append(weekHtml);
            }
            var rules = function(){
                if(i==1){num='一'}
                if(i==2){num='二'}
                if(i==3){num='三'}
                if(i==4){num='四'}
                if(i==5){num='五'}
                if(i==6){num='六'}
                if(i==7){num='日'}
            }
            setDay()
            setWeek()




        },function() {
            alert("签到系统超时");
        }, 15000);
    }

}


//合伙人ajax 调用
var hhrAjaxGet = {
    didibaojiahuxxing:function(){//嘀嘀报价户型
        var url   = urlCommon+'quoteH5/houseTypeList';
        var param = '';
        callGetByJson("GET", url, param, function(json) {
            didibaojiahuxxing(json);
        },function() {
            alert("获取嘀嘀报价户型系统超时");
        }, 10000);
    },
    didibaojia:function(param,area,houseName){//嘀嘀报价详情
        var url   = urlCommon+'quoteH5/quote';
        callGetByJson("GET", url, param, function(json) {
            ddbjDetail(json,area,houseName);
        },function() {
            alert("获取嘀嘀报价详情系统超时");
        }, 15000);
    },
    tuidanDetail:function(needsCode,uid,role){//推单详情
        var url   = urlCommon+'needs/queryNeedsDetail';
        var param = 'needsCode='+needsCode;
        param += '&uid='+uid;
        param += '&role='+role;
        callGetByJson("GET", url, param, function(json) {
            tuidanDetail(json);
        },function() {
            alert("获取推单详情系统超时");
        }, 15000);
    },
    tuidanyouxiao:function(agentUid,needsCode,companyCode,departmentCode,statues,partnerUid){//设置推单有效
        var url   = urlCommon+'needs/dealNeeds';
        var param = 'needsCode='+needsCode;
        param += '&agentUid='+agentUid;
        param += '&companyCode='+companyCode;
        param += '&departmentCode='+departmentCode;
        param += '&statues='+statues;
        param += '&partnerUid='+partnerUid;

        callGetByJson("GET", url, param, function(json) {
            hhrAjaxGet.tuidanDetail(needsCode,partnerUid,'partner');
        },function() {
            alert("设置推单有效系统超时");
        }, 15000);
    },
    tuidanwuxxiao:function(agentUid,needsCode,companyCode,departmentCode,statues,partnerUid){//设置推单无效
        var url   = urlCommon+'needs/dealNeeds';
        var param = 'needsCode='+needsCode;
        param += '&agentUid='+agentUid;
        param += '&companyCode='+companyCode;
        param += '&departmentCode='+departmentCode;
        param += '&statues='+statues;
        param += '&partnerUid='+partnerUid;

        callGetByJson("GET", url, param, function(json) {
            hhrAjaxGet.tuidanDetail(needsCode,partnerUid,'partner');
        },function() {
            alert("设置推单无效系统超时");
        }, 15000);
    },
    qianding:function(agentUid,upAgentUid,needsCode,companyCode,departmentCode,statues,partnerUid,param,back){//设置签订
        var url   = urlCommon+'needs/dealNeeds';
        param += '&needsCode='+needsCode;
        param += '&agentUid='+agentUid;
        param += '&upAgentUid='+upAgentUid;
        param += '&companyCode='+companyCode;
        param += '&departmentCode='+departmentCode;
        param += '&statues='+statues;
        param += '&partnerUid='+partnerUid;

        callGetByJson("GET", url, param, function(json) {
            backbutton();
            hhrAjaxGet.tuidanDetail(needsCode,partnerUid,'partner');
        },function() {
            alert("设置推单无效系统超时");
        }, 15000);
    },
    tuidansidan:function(agentUid,needsCode,companyCode,departmentCode,statues,partnerUid){//设置推单死单
        var url   = urlCommon+'needs/dealNeeds';
        var param = 'needsCode='+needsCode;
        param += '&agentUid='+agentUid;
        param += '&companyCode='+companyCode;
        param += '&departmentCode='+departmentCode;
        param += '&statues='+statues;
        param += '&partnerUid='+partnerUid;
        callGetByJson("GET", url, param, function(json) {
            hhrAjaxGet.tuidanDetail(needsCode,partnerUid,'partner');
        },function() {
            alert("设置推单死单系统超时");
        }, 15000);
    },
    tuidanhetong:function(needsCode){//查询推单合同详情
        var url   = urlCommon+'rewardRecommend/getAgentRewardMoney';
        var param = 'recommendId='+needsCode;
        callGetByJson("GET", url, param, function(json) {
            tuidanhetong(json);
        },function() {
            alert("查询推单合同详情系统超时");
        }, 15000);
    }



}
//h5注册页面调用
var regAjaxGet = {
    getRegYzm:function(phone){//获取验证码
        var url   = urlCommon+'userH5/getRegYzm';
        var param = 'userPhone='+phone;
        callGetByJson("GET", url, param, function(json) {
            if(json.code=="200"){
                regFlag = true;
            }else{
                alert(json.message);
                regFlag = false;
            }
        },function() {
            alert("获取验证码超时");
        }, 15000);
    },
    checkYzm:function(param){//验证码校验
        var url   = urlCommon+'registerH5/checkYzm';
        callGetByJson("GET", url, param, function(json) {
            if(json.code=="200"){
                regAjaxGet.register(param);
            }else if(json.code=="361"){
                alert("用户已存在");
            }else if(json.code=="360"){
                alert("邀请码错误");
            }else{
                alert("验证码错误");
            }
        },function() {
            alert("验证码校验超时");
        }, 15000);
    },
    register:function(param){//注册经纪人
        var url   = urlCommon+'registerH5';
        callGetByJson("GET", url, param, function(json) {
            if(json.code=="200"){
                $(document).frRoute({
                    direct:true,
                    directUrl:'registerSuccess.html'
                })
            }else{
                alert(json.message)
            }
        },function() {
            alert("注册经纪人超时");
        }, 15000);
    }
}




