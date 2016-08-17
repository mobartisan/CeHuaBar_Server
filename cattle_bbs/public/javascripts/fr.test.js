/**
 * Created by bianke on 16-7-14.
 */
(function ($) {
    $.fn.test = function (o) {
        //console.log(o.toString());
        var defs = {
            param: 1,
            value: 2
        }
        var opt = $.fn.extend({fuck: 4}, defs);
        console.log(opt.param);
        console.log(opt.fuck);
    }
})(jQuery);

$.extend($.fn, {
    setting: function (param) {
        console.log(param);
    }
})

var exted = {
    set2: function (param1, param2) {
        console.log(parseInt(param1 + param2));
    }
}
$.extend($.fn, exted);