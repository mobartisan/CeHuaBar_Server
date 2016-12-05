module.exports = {
    randomLetter: function (data) {
        var letterData = "";
        var lowercase = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");

        var uppercase = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
        var start = data.start;
        var end = data.end;
        var number = data.number;
        var upper = data.upper;

        var length = end - start;
        for (var i = 0; i < number; i++) {
            var index = Math.floor(Math.random() * length) + start;
            var letter = "";
            if (upper) {
                letter = uppercase[index];
            } else {
                letter = lowercase[index];
            }
            letterData += letter;
        }
        return letterData;
    },
    /**
     *
     *    随机生成数字
     *
     *@param num 生成数字位数
     */
    randomNumber: function (num) {
        return '' + Math.floor(Math.random() * num);
    },

    generateMixed: function (n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var GetRandomNum = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
            var num = GetRandomNum(1, 10);
        };
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    },
    randomChar: function (l) {
        var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
        var tmp = "";
        for (var i = 0; i < l; i++) {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }
        return tmp;
    }
}