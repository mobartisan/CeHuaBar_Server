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
        chareset: "utf-8",
        dataType: 'jsonp',
        jsonp: 'jsonpcallback'
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
//var urlCommon = '/mpp/api/v1.0/';
var urlCommon = 'http://localhost:8080/api/';
//var url200 = 'http://192.168.0.200:8069';
var url200 = 'http://101.200.138.176:8069';
//var url200 = 'http://192.168.0.131:80';
//session_失效
var CODE_SESSION_OUT_TYPE = 1;
//系统超时
var CODE_SYS_OOT_TYPE = 2;
var commonAjaxGet = {
    saveCookies: function (sessionId, loginId) {
        SetCookie("loginId", loginId);
        SetCookie("sessionId", sessionId);
    },
    gotoError: function (error_code) {
        document.location = "/mpp/api/v1.0/webs/error?error_code=" + error_code;
    },
    errorArray: {
        "000000017": "采集单未扫描匹配过设备",
        "000000018": "扫描码不正确",
        "000000019": "采集单异常原因不存在",
        "000000020": "采集单未开始检修",
        "000000021": "采集单未提交",
        "000000022": "采集单已开始检修，不可转单",
        "000000023": "考试题目不存在",
        "000000024": "考试已做完",
        "000000025": "无考题可做",
        "000000026": "采集单已提交检修，不可重复提交",
        "000000027": "未查到任何结果（知识库）",
        "000000028": "未查到设备简介详情",
        "000000029": "未查到知识库详情",
    }
}
var knowledgeAjaxGet = {
    //搜索
    search: function (queryContent, type, callback) {
        $(".fr-contain").frRoute({
            direct: true,
            directUrl: '/mpp/api/v1.0/webs/myknowledgesearch',
            callBack: function () {
                $(".search_content").val(queryContent);
                init(type);
            }
        })
    },
    initList: function (queryContent, page, type, pageSize, callback) {
        console.log("initDeviceList");
        var usl = (type === 0 ? '/mpp/wiki/slur.app' : '/mpp/wiki/scan.app')
        var param = (type === 0 ? ('queryContent=' + queryContent) : ('scanContent=' + queryContent));
        page && (param += '&page=' + page);
        pageSize && (param += '&pageSize=' + pageSize);
        console.log("param= " + param);
        callGetByJson("GET", (url200 + usl), param, 5000);
        ajaxPromise.then(function (json) {
            if (json.error) {
                modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
                reset();
                knowledgeAjaxGet.setEmpty();
                return;
            }
            var objList = json.data["pageList"];
            //$("#count").val(json.data["pageSize"]);
            $("#count").val(json.data["totalCount"]);
            knowledgeAjaxGet.setList(objList, callback);
        }, function () {
            modal.alert($("#alert"), "系统超时")
        });
    },
    initListMore: function (queryContent, page, type, pageSize, callback) {
        console.log("initListMore");
        var usl = (type === 0 ? '/mpp/wiki/slur.app' : '/mpp/wiki/scan.app')
        var param = (type === 0 ? ('queryContent=' + queryContent) : ('scanContent=' + queryContent));
        page && (param += '&page=' + page);
        pageSize && (param += '&pageSize=' + pageSize);
        console.log("param= " + param);
        callGetByJson("GET", (url200 + usl), param, 5000);
        ajaxPromise.then(function (json) {
            console.log("json" + json);
            if (json.error) {
                modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
            }
            var objList = json.data["pageList"];
            $("#count").val(json.data["totalCount"]);
            knowledgeAjaxGet.setList(objList, callback);

        }, function () {
            modal.alert($("#alert"), "系统超时")
        });
    },
    setEmpty: function () {
        var container = $("div .lore_container")
        var html = "";
        html += "<div style='text-align: center;width: inherit;margin-top: 20rem'>";
        html += "无数据";
        html += "</div >";
        container.append(html);
    },
    setList: function (objList, callback) {
        var container = $("div .lore_container")
        var html = "";
        $.each(objList, function (name, value) {
            html += "<div class='maintain'>";
            html += "<div class='maintain_icon'>"
            console.log("==>wikiType= " + value["wikiType"])
            console.log("==>wikiTypeName= " + value['wikiTypeName'])
            switch (value["wikiType"]) {
                case 0:
                    html += "<img src='/images/abstract@3x.png' width='71' height='71'/>"
                    break;
                case 1:
                    html += "<img src='/images/install@3x.png' width='71' height='71'/>"
                    break;
                case 2:
                    html += "<img src='/images/tool@3x.png' width='71' height='71'/>"
                    break;
                case 3:
                    html += "<img src='/images/maintain@3x.png' width='71' height='71'/>"
                    break;
                default:
                    break;
            }
            html += "</div>";
            html += "<div class='maintain_title'>";
            html += "<input type='hidden' id='wid_code' name='device_code' value=" + value['wid'] + ">"
            html += "<input type='hidden' id='bar_code' name='bar_code' value=" + value['barCode'] + ">"
            html += "<input type='hidden' id='wikiType' name='wikiType' value=" + value['wikiType'] + ">"
            html += "<input type='hidden' id='device_code' name='device_code' value=" + value['devCode'] + ">"
            html += "<input type='hidden' id='devTypeName' name='devTypeName' value=" + value['devTypeName'] + ">"
            html += "<h1>" + value['wikiTypeName'] + "</h1>";
            html += "<p>" + value['devDesc'] + "</p>"
            html += " </div>"
            html += "<div class='icon_right'>"
            html += "<i class='glyphicon glyphicon-menu-right'></i>"
            html += "</div>"
            html += "<div class='put_data'>"
            html += "<ul>"
            html += "<li class='glyphicon glyphicon-eye-open data_one'></li>"
            html += "<li class='data_two'>" + value['checkNum'] + "</li>"
            html += "<li class='data_three'>" + value['createTime'] + "</li>"
            html += "<li class='data_three'></li>"
            html += "<li class='data_three'>" + '' + "</li>"

            html += "</ul>"
            html += "</div>"
            html += "</div>"

        });
        container.append(html);
        $(".maintain_title").bind('touchstart', function (e) {

            var wid_code = $(this).find("#wid_code").val();
            var wikiType = $(this).find("#wikiType").val();
            //console.log("wid_code= " + wid_code)
            console.log("wikiType= " + wikiType)
            switch (wikiType) {
                case "0":
                    knowledgeAjaxGet.device_info(wid_code, function () {

                    });
                    break;
                case "1":
                    knowledgeAjaxGet.not_device_info(wid_code, function () {

                    });
                    break;
                case "2":
                    knowledgeAjaxGet.not_device_info(wid_code, function () {

                    });
                    break;
                case "3":
                    knowledgeAjaxGet.not_device_info(wid_code, function () {
                    });
                    break;
                default:
                    break;
            }

        })
        if (callback) {
            callback();
        }
    },
    device_info: function (device_code, callback) {
        console.log("device_info");
        var url = url200 + '/mpp/wiki/dev.app';
        var paramData = 'did=' + device_code;
        var c_sessionId = getCookie("sessionId")
        var c_loginId = getCookie("loginId")
        if (c_sessionId && c_loginId) {
            console.log("c_sessionId= " + c_sessionId);
            paramData += '&sessionId=' + c_sessionId;
            paramData += '&loginId=' + c_loginId;
        } else {
            commonAjaxGet.gotoError(CODE_SESSION_OUT_TYPE);
            return;
        }
        callGetByJson("GET", url, paramData, 5000);

        ajaxPromise.then(function (json) {
            console.log("json= " + json)
            if (json.error) {
                modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
                return;
            }
            console.log("msg= " + json.msg)
            console.log("devType= " + json.data.devType)
            console.log("devTypeName= " + json.data.devTypeName)
            console.log("devCode= " + json.data.devCode)
            console.log("barCode= " + json.data.barCode)
            console.log("devDesc= " + json.data.devDesc)
            console.log("devAddress= " + json.data.devAddress)
            console.log("devProduct= " + json.data.devProduct)
            console.log("checkNum= " + json.data.checkNum)
            console.log("createTime= " + json.data.createTime);
            $("div .maintain").frRoute({
                direct: true,
                directUrl: '/mpp/api/v1.0/webs/myknowledgedevice',
                callBack: function () {
                    knowledgeAjaxGet.changeDeviceContent(json.data)
                    knowledgeAjaxGet.changeDeviceHeader(json.data)
                }
            })
            if (callback) {
                callback();
            }

        }, function () {
            modal.alert($("#alert"), "系统超时")
        });
    },
    changeDeviceHeader: function (data) {
        $(".eq_title").html(data.devTypeName)
        $("#wiki_desc").html(data.devDesc)
    },
    changeDeviceContent: function (data) {
        var container = $("#container")
        container.html("");
        var html = "";
        html += "<p>设备编号:" + data.devCode + "</p>"
        html += "<p>条形码:" + data.barCode + "</p>"
        html += "<p>设备类型" + data.devType + "</p>"
        html += "<p>设备地址:" + data.devAddress + "</p>"
        html += "<p>设备厂家:" + data.devProduct + "</p>"
        html += "<p>查看次数:" + data.checkNum + "</p>"
        html += "<p>上传时间:" + data.createTime + "</p>"
        container.append(html)
    },
    changeHeader: function (data) {
        $(".eq_title").html(data.devTypeName)
        $("#wiki_desc").html(data.devDesc)
    },
    changeContent: function (data) {
        var container = $("#container")
        container.html("");
        container.append(data.htmlContent);
    },
    not_device_info: function (wid, callback) {
        console.log("not_device_info");
        var url = url200 + '/mpp/wiki/content.app';
        var paramData = 'wid=' + wid;
        var c_sessionId = getCookie("sessionId")
        var c_loginId = getCookie("loginId")
        if (c_sessionId && c_loginId) {
            console.log("c_sessionId= " + c_sessionId);
            paramData += '&sessionId=' + c_sessionId;
            paramData += '&loginId=' + c_loginId;
        } else {
            commonAjaxGet.gotoError(CODE_SESSION_OUT_TYPE);
            return;
        }
        callGetByJson("GET", url, paramData,
            5000);

        ajaxPromise.then(function (json) {
                console.log("json= " + json)
                if (json.error) {
                    modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
                    return;
                }
                console.log("msg= " + json.msg)
                console.log("wikiType= " + json.data.wikiType)
                console.log("wikiTypeName= " + json.data.wikiTypeName)
                console.log("devTypeName= " + json.data.devTypeName)
                console.log("devDesc= " + json.data.devDesc)
                console.log("htmlContent= " + json.data.htmlContent)
                var swi = {
                    "0": "myknowledgedevice",
                    "1": "myknowledgeinstall",
                    "2": "myknowledgetool",
                    "3": "myknowledgenote"
                }
                $("div .maintain").frRoute({
                    direct: true,
                    directUrl: '/mpp/api/v1.0/webs/' + swi[json.data.wikiType],
                    callBack: function () {
                        knowledgeAjaxGet.changeContent(json.data)
                        knowledgeAjaxGet.changeHeader(json.data)
                    }
                })
                if (callback) {
                    callback();
                }
            }, function () {
                modal.alert($("#alert"), "系统超时")
            }
        );
    }
}
var testAjaxGet = {
    changeContent: function ($tar, result) {
        console.log("changeContent");
        $tar.html(result.score);
    },
    changeQuestion: function ($tar, result) {
        var sliceOption = function (options) {
            console.log(options);
            return options.split(";")
        };
        var type = result.questionType == 0 ? "单选" : "多选";
        $tar.find(".rep_single").html(type);
        $tar.find("#question_content").html(result.questionContent + "（ ）")
        var optionsArray = sliceOption(result.optiones);
        var body = "";
        var $answer_ul = $tar.find("#answer_ul")
        $.each(optionsArray, function (name, value) {
            var optionLable = value.substring(0, 1);
            var optionDesc = value.substring(1)
            body += "<li><a>" + optionLable + "</a>" + optionDesc + "</li>";
        });
        $answer_ul.html(body);
        $li = $answer_ul.find("li");
        var selectValue = ""
        $li.bind("touchstart", function () {
            if (type == 0) {
                $(this).find("a").addClass("check_on").parent().siblings().find("a").removeClass();
                $("#answer_ul li").unbind();
                selectValue = $(this).find("a").html()
                testAjaxGet.answerQuestion(selectValue, result.questionId, function () {
                    selectValue = ""
                    $(".test_answer").show();
                })
            } else {
                $(this).find("a").addClass("check_on");
                selectValue += $(this).find("a").html()
                if (selectValue.length == result.correctOption.length) {
                    testAjaxGet.answerQuestion(selectValue, result.questionId, function () {
                        selectValue = ""
                        $(".test_answer").show();
                    })
                }
            }
        })
    },
    changeAnswerHelper: function ($tar, result) {
        var sliceAnswer = function (answer) {
            console.log(answer);
            return answer.split(";")
        };
        console.log(result.anwser);
        var anwserArray = sliceAnswer(result.anwser)
        $ul = $tar.find("ul");
        var body = "";
        $.each(anwserArray, function (name, value) {
            var answerLable = value.substring(0, 2);
            var answerDesc = value.substring(3)
            var isCorrectClass = value.substring(1, 2) == '对' ? "'check_true'" : "'check_false'";
            body += "<li><span class=" + isCorrectClass + " >" + answerLable + "</span><span>" + answerDesc + "</span></li>";
        });
        $ul.html(body);
    },
    changeNextBtn: function ($tar, result) {
        $tar.bind("touchstart", function (e) {
            testAjaxGet.testPage(1, this, function () {
                $(".test_answer").hide();
            });
        });
    },
    testPage: function (num, $tar, callback) {
        console.log("testPage");
        var url = url200 + '/mpp/exam/next.app';
        //var url = '/mpp/exam/next.app';
        var c_sessionId = getCookie("sessionId")
        var c_loginId = getCookie("loginId")
        var param = "";
        if (c_sessionId && c_loginId) {
            console.log("c_sessionId= " + c_sessionId);
            param += 'sessionId=' + c_sessionId;
            param += '&loginId=' + c_loginId;
        } else {
            commonAjaxGet.gotoError(CODE_SESSION_OUT_TYPE);
            return;
        }
        callGetByJson("GET", url, param,
            5000);
        ajaxPromise.then(function (json) {
            console.log("json = " + json.error)
            if (json.error) {
                modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
                return;
            }
            if (num == 0) {
                $("div .fr-contain").frRoute({
                    direct: true,
                    directUrl: '/mpp/api/v1.0/webs/testpage',
                    callBack: function () {
                        console.log("123ddd");
                        testAjaxGet.changeContent($(".span2"), json.data);
                        testAjaxGet.changeQuestion($(".choice_question"), json.data);
                        testAjaxGet.changeAnswerHelper($(".test_answer"), json.data);
                        testAjaxGet.changeNextBtn($(".btn_next"), json.data);
                    }
                })
            } else {
                testAjaxGet.changeContent($(".span2"), json.data);
                testAjaxGet.changeQuestion($(".choice_question"), json.data);
                testAjaxGet.changeAnswerHelper($(".test_answer"), json.data);
                testAjaxGet.changeNextBtn($(".btn_next"), json.data);
            }
            if (callback) {
                callback();
            }
        }, function () {
            modal.alert($("#alert"), "系统超时")
            //console.log("系统超时");
        })
    },
    answerQuestion: function (submit_content, question_id, callback) {
        console.log("answerQuestion");
        var c_sessionId = getCookie("sessionId")
        var c_loginId = getCookie("loginId")
        var paramData = 'submitContent=' + submit_content
        paramData += "&questionId=" + question_id
        if (c_sessionId && c_loginId) {
            console.log("c_sessionId= " + c_sessionId);
            paramData += '&sessionId=' + c_sessionId;
            paramData += '&loginId=' + c_loginId;
        } else {
            commonAjaxGet.gotoError(CODE_SESSION_OUT_TYPE);
            return;
        }
        var changeAnswerDesc = function (desc) {
            $("#correct_desc").html(desc)
        }
        var url = url200 + "/mpp/exam/test.app";
        callGetByJson("GET", url, paramData, 5000);
        ajaxPromise.then(function (json) {
            console.log(json)
            if (json.error) {
                modal.alert($("#alert"), commonAjaxGet.errorArray[json.error])
                return;
            }
            if (callback) {
                callback();
            }
            console.log("isCorrect = " + json.data.isCorrect);
            if (json.data.isCorrect == false) {
                console.log("本题回答错误");
                changeAnswerDesc("本题回答错误");
            } else {
                console.log("本题回答正确");
                changeAnswerDesc("本题回答正确");
            }
            testAjaxGet.changeContent($(".span2"), json.data);

        }, function () {
            modal.alert($("#alert"), "系统超时")
            //console.log("系统超时");
        });
    }
}







