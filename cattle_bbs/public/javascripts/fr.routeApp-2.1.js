/**
 * Created by bianke on 16-7-14.
 */
(function ($) {
    $.fn.frRoute = function (o) {
        var defs = {
            baseUrl: "../js/main/",
            paths: [],
            action: "click",
            type: "slide",
            callBack: function () {

            },
            prevBtn: ".fr-back",
            scanBtn: ".fr-scan",
            contain: ".fr-contain",
            direct: false,
            directUrl: '',
            backToPrevDirect: false,
            backToUrl: ""
        };
        var obj = this;
        var opt = $.fn.extend({}, defs, o);
        var width = $(window).width();
        var frRoute = 0;
        var isAppend = true;

        var methods = {
            addJs: function (e) {//引入js
                for (i = 0; i < e.length; i++) {
                    $("body").append('<script type="text/javascript" src="' + opt.baseUrl + '' + e[i] + '.js"></script>')
                }
            },
            addCss: function () {
                if ($("#fr-style").length < 1) {
                    //$("body").before('<style id="fr-style">'+opt.contain+'{position:fixed; top:0; left:0; width:100%;-webkit-transition:all .3s ease-out; background-color:#f3f3f3; height:100%; overflow:auto;}</style>');
                }
            },
            action: function (actionPage, paths, callback) {
                //创建容器
                var pageArrey = [];
                $(".fr-contain").each(function (index, element) {
                    pageArrey.push($(this).attr("db-page"))
                });
                var currIndex = pageArrey.indexOf(actionPage);
                var indexAll = pageArrey.length;
                if (currIndex > -1) {
                    for (i = currIndex + 1; i < indexAll + 1; i++) {
                        $(".fr-contain[fr-route=" + i + "]").remove();
                    }
                    $(".fr-contain[fr-route=" + currIndex + "]").css({"position": "static"});
                    methods.setTitle($(".fr-contain[fr-route=" + currIndex + "]").find("title").html(), $(".fr-contain[fr-route=" + currIndex + "]").find(".hearHtml").html())

                    if (callback) {
                        callback()
                    }
                } else {
                    $(".fr-contain").css({"position": "fixed"});
                    var minHeigth = $(window).height() - $("#wappperAll").offset().top;
                    frRoute = parseInt($(opt.contain).last().attr("fr-route")) + 1;
                    if (opt.type == "slide") {
                        $(opt.contain).last().after('<div class="' + opt.contain.substr(1) + ' clearfix" db-page="' + actionPage + '" fr-route="' + frRoute + '" style="-webkit-transform:translate3d(' + width + 'px,0,0);min-height:' + minHeigth + 'px"></div>')
                    } else if (opt.type == "fade") {
                        $(opt.contain).last().after('<div class="' + opt.contain.substr(1) + ' clearfix" db-page="' + actionPage + '" fr-route="' + frRoute + '" style="-webkit-transform:scale(0);min-height:' + minHeigth + 'px"></div>')
                    } else if (opt.type == "auto") {
                        $(opt.contain).last().after('<div class="' + opt.contain.substr(1) + ' clearfix" style="min-height:' + minHeigth + 'px" db-page="' + actionPage + '" fr-route="' + frRoute + '"></div>')
                    }

                    var $currTar = $(opt.contain + "[fr-route=" + frRoute + "]");
                    $currTar.load(actionPage, function () {
                        methods.setTitle($currTar.find("title").html(), $currTar.find(".hearHtml").html(), frRoute)
                        //划入当前页面
                        if (opt.type == "slide") {
                            $currTar.css({"-webkit-transform": "translate3d(0,0,0)", "position": "static"})
                        } else if (opt.type == "fade") {
                            $currTar.css({"-webkit-transform": "scale(1)", "position": "static"})
                        }
                        ;
                        //引入js调用
                        if (opt.paths.length > 0) {
                            methods.addJs(opt.paths)
                        }
                        ;
                        //调整IOS样式
                        adapt();
                        //回调函数

                        if (callback) {
                            callback()
                        }

                    })
                }
            },
            setTitle: function (title, headHtml, currIndex) {
                $(".header .span").html(title)
                $(".header .headHtmlWap").html(headHtml)
                if (currIndex == 0) {
                    $(".header i:first").attr("class", "icoAll icoMenu fr-back")
                } else {
                    $(".header i:first").attr("class", "icoAll ico1 fr-back")
                }
            },
            backToprevPage: function (e) {//返回上一个页面
                var currIndex = parseInt(e.attr("fr-route")) - 1;
                methods.setTitle($(".fr-contain[fr-route=" + currIndex + "]").find("title").html(), $(".fr-contain[fr-route=" + currIndex + "]").find(".hearHtml").html(), currIndex)
                if (opt.type == "slide") {
                    e.css({"-webkit-transform": "translate3d(" + width + "px,0,0)"});
                } else if (opt.type == "fade") {
                    e.css({"-webkit-transform": "scale(0)"});
                }
                ;
                setTimeout(function () {
                    e.remove();
                    $(".fr-contain[fr-route=" + currIndex + "]").css({"position": "static"});
                }, 100)
            },
            init: function () {//初始化
                methods.addCss();
                if (opt.direct) {
                    if (opt.directUrl == "") {
                        var nextPage = obj.attr("fr-href");
                        if (nextPage) {
                            methods.action(nextPage, opt.paths, opt.callBack)
                        }
                    } else {
                        methods.action(opt.directUrl, opt.paths, opt.callBack)
                    }
                }
                if (opt.backToPrevDirect) {

                    if (opt.backToUrl == "") {
                        if ($(opt.contain).last().attr("fr-route") == "0") {
                            return;
                        } else {
                            methods.backToprevPage($(opt.contain).last())
                        }
                    } else {
                        window.location.href = opt.backToUrl
                    }
                } else {
                    obj.click(function () {
                        var nextPage = $(this).attr("fr-href")
                        if (nextPage) {
                            methods.action(nextPage, opt.paths, opt.callBack)
                        }
                    });
                }
                if (opt.prevBtn) {
                    $(document).on("touchstart", opt.prevBtn, function () {
                        if ($(opt.contain).last().attr("fr-route") == "0") {
                            if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                                document.location = "my::goMenu:";
                            } else {
                                window.my.goMenu();
                            }
                            return;
                        } else {
                            methods.backToprevPage($(opt.contain).last())
                        }
                    });
                }
                if (opt.scanBtn) {
                    $(document).on("touchstart", opt.scanBtn, function () {

                        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                            document.location = "my::scan:" + 'myknowledgelist';
                        } else {
                            window.my.scan('myknowledgelist');
                        }
                        return;

                    });
                }
            }
        };
        methods.init()
    }
})(jQuery)