/**
 * Created by bianke on 15-11-9.
 */

/**  ----------cookie----------开始**/

function SetCookie(name, value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 99999999999; //此 cookie 将被保存 30分钟
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return (arr[2]);
    return null;
}

function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


/**  ----------cookie----------结束**/

var ajaxPromise = null;
function callGetByJson(actionType, actionUrl, paramData, newTimeout) {
    var mytimeout = 10000;
    var isyb = true;
    if (!(actionType == "POST" || actionType == "GET" || actionType == "PUT" || actionType == "DELETE")
        || actionUrl == undefined || paramData == undefined) {
        return;
    }
    ;
    var inTimeout = mytimeout;
    if (newTimeout != undefined && newTimeout != null) {
        inTimeout = newTimeout;
    }
    ajaxPromise = $.ajax({
        type: actionType,
        timeout: inTimeout,
        url: actionUrl,
        data: paramData,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", "Bearer " + getCookie("access_token"));
        },
        chareset: "utf-8",
        dataType: 'json'
    });
};
//系统超时统一处理
function errorManage(msg, callback) {
    alert(msg, function () {
        if (callback) {
            callback()
        } else {
            location.reload()
        }
    })
}
//退出
function loginOut() {
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        SetCookie("islogin", "no");
    } else {
        delCookie("islogin")
    }
    delCookie("uid")
    delCookie("userCode")
    location.reload()
}
//公共ajax 调用
var urlCommon = 'http://localhost:3001';

var commonAjaxGet = {
    saveCookies: function (sessionId, loginId) {
        SetCookie("loginId", loginId);
        SetCookie("sessionId", sessionId);
    },
    saveToken: function (token) {
        SetCookie("access_token", token);
    },
    errorArray: {
        "000000001": "账号密码不正确",
    }
}
var loginAjaxGet = {
    //登陆
    login: function (username, password, callback) {
        console.log("initDeviceList");
        var param = 'username=' + username;
        param += "&password=" + password;
        console.log("param= " + param);
        var url = urlCommon + '/user/login2.app';
        callGetByJson("POST", url, param, 5000);
        ajaxPromise.then(function (json) {
            if (json.error) {
                console.log(commonAjaxGet.errorArray[json.error])
                //modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
                return;
            }
            console.log(json.obj.token);
            console.log(json.obj.uid);
            commonAjaxGet.saveToken(json.obj.token);
            $(".fr-contain").frRoute({
                direct: true,
                directUrl: '/index',
                callBack: function () {

                }
            })
        }, function () {
            console.log("系统超时");
        }).then(function () {
            callback && callback();
        });

    },
    getPoint: function (callback) {
        console.log("getPoint");
        var param = "";
        var url = urlCommon + '/bbs/api/v1.0/point2.app';
        callGetByJson("GET", url, param, 5000);
        ajaxPromise.then(function (json) {
            if (json.error) {
                console.log(commonAjaxGet.errorArray[json.error])
                return;
            }
            console.log(json);
            if (json.obj.point) {
                $("#xxjf").html(json.obj.point);
            }
        }, function () {
            console.log("系统超时");
        }).then(function () {
            callback && callback();
        });
    },
    logout: function (callback) {
        console.log("logout");
        var param = "";
        var url = urlCommon + '/user/logout.app';
        callGetByJson("GET", url, param, 5000);
        ajaxPromise.then(function (json) {
            if (json.error) {
                console.log(commonAjaxGet.errorArray[json.error])
                return;
            }
            console.log(json);
            $("#btn").html("success");
        }, function () {
            console.log("系统超时");
        }).then(function () {
            callback && callback();
        });
    }
}