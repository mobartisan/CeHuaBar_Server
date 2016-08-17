/**
 * Created by wangmiao on 14-12-9.
 */
//
// function backPrev(){
//     if($(".fr-contain").length==1){
//         if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
//             document.location = "my::mainBack:";
//         }else{
//             window.my.mainBack();
//         }
//     }else{
//         backToprevPage($(".fr-contain").last())
//     }
// }
//
//
// function backToprevPage(e){
//     var currIndex = parseInt(e.attr("fr-route"))-1;
//     var width = $(window).width();
//     setTitle($(".fr-contain[fr-route="+currIndex+"]").find("title").html(),$(".fr-contain[fr-route="+currIndex+"]").find(".hearHtml").html())
//     e.css({"-webkit-transform":"translate3d("+width+"px,0,0)"});
//     setTimeout(function(){
//         e.remove();
//         $(".fr-contain[fr-route="+currIndex+"]").css({"position":"static"});
//     },100)
// }
//
// function setTitle(title,headHtml){
//     $(".header .span").html(title)
//     $(".header .headHtmlWap").html(headHtml)
// }

function tabs(a, b, callback) {
    var $tar = $(b);
    a.on("touchstart", function () {
        var index = $(this).index();
        var $CtrTar = $(this);
        $CtrTar.addClass("active").siblings().removeClass("active");
        $tar.eq(index).show().siblings(b).hide();
    });
    if (callback) {
        callback();
    }
    ;
};

//tabs($(".tuidanTab span"),".tidanCont")
$.fn.countDown = function (o) {
    var defs = {
        beforeText: "文本1",
        afterText: "文本2",
        wait: 5,
        wait2: 5
    };
    var obj = this;
    var opt = $.fn.extend({}, defs, o);
    var beforeText = opt.beforeText;
    var afterText = opt.afterText;
    var wait = opt.wait;
    var wait2 = opt.wait2;
    time($(this))

    function time(e) {
        if (wait == 0) {
            e.val(beforeText);
            wait = wait2;
            e.removeClass("btns-grey");
            e.removeAttr("disabled");
        } else {
            e.addClass("btns-grey")
            e.attr("disabled", true);
            e.val(afterText + "(" + wait + "s)");
            wait--;
            setTimeout(function () {
                    time(e)
                },
                1000)
        }
        ;
    }
}
var modal = {
    show: function (b, c, callback) {
        if (b.attr("id") == "alert" || b.attr("id") == "confirm" || b.hasClass('dzSelect')) {

        } else {
            b.appendTo("body");
        }
        b.css({"margin-top": -b.height() / 2, "top": "50%"}).show();
        if ($(".tck-cover").length == 0) {
            $("body").append('<div class="tck-cover"></div>');
            $("footer.active").hide()
        }
        ;
        $(".tck-cover").on("touchstart", function () {
            modal.hide(b);
        })
        if (c) {
            c.on("click", function () {
                modal.hide(b);
            });
        }
        if (callback) {
            callback()
        }
    },
    hide: function (b) {
        b.hide();
        if (b.attr("id") == "alert" || b.attr("id") == "confirm" || b.hasClass('dzSelect')) {

        } else {
            $(".fr-contain").last().append(b);
        }

        $(".tck-cover").remove();
        $("footer.active").show()
        //setTimeout(function(){$(".tck-cover").remove();},0)
    }
}

window.alert = function (msg, callBack) {
    modal.show($("#alert"), $(".close,#alert .btnsConfirm"), function () {
        $("#alert .text").html(msg);
        $("#alert .btnsConfirm").on("click", function () {
            if (callBack) {
                callBack();
            }
            modal.hide($("#alert"));
        });
    })
}
window.confirm = function (msg, callBack) {
    modal.show($("#confirm"), $(".close,#confirm .btnsCancel"), function () {
        $("#confirm .text").html(msg);
        $("#confirm .btnsConfirm").off("click");
        $("#confirm .btnsConfirm").on("click", function () {
            callBack();
            modal.hide($("#confirm"))
        });

    })
}


function selectModal(a, b) {
    a.show();
    if ($(".tck-cover").length == 0) {
        a.appendTo("body");
        if ($(".tck-cover").length == 0) {
            $("body").append('<div class="tck-cover"></div>');
            $("footer.active").hide()
        }
        ;
    }
    ;
    $(document).on("touchstart", ".tck-cover", function () {
        hide();
    });
    var $obj = a.find("li");
    $obj.on("click", function () {
        if (!$(this).hasClass("tit")) {
            a.find(".fa-check").remove();
            b.val($(this).text())
            hide();
        }
    });
    function hide() {
        a.hide();
        $(".fr-contain").last().append(a);
        $(".tck-cover").fadeOut(200);
        $(".tck-cover").remove();
        $("footer.active").show()
    };
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

// $(document).frRoute({
//     direct:true
// })
// function backbutton(){
//     $(".priceTotalWap").remove();
//     backPrev();
// }
