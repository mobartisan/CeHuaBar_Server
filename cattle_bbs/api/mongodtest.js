/**
 * Created by bianke on 2016/4/28.
 */
var ResultCode = require('../conf/ResultCode');
var jsonWrite = require('../middlewares/jsonWrite');
var logger = require('../middlewares/log').logger;
var userSchema = require('../mongodb/user_schema');
var testSchema = require('../mongodb/test_schema');
var util = require('util');
require("express-mongoose");
module.exports = {
    userOpeate: function (req, res, next) {
        logger.info("userOpeate");
        var user = new userSchema.User({
            email: "woyoushmy8@126.com",
            name: "bianke"
        });
        user.save();
        res.send('Data inited');
    },
    testOpeate: function (req, res, next) {
        var doc = {
            question_id: 'emtity_demo_username',
            question_type: 'emtity_demo_title',
            question_content: 'emtity_demo_content'
        };
        var testEntity = new testSchema.Test({});
        // testEntity.save(function (error) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('saved OK!');
        //     }
        // });
        var result = testEntity.findByQid('emtity_demo_username', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        });
        res.send(result);
    },
    testObject: function (req, res, next) {
        console.log("1= " + typeof this);
        var o = createObject("fucn", function () {
            console.log("2= " + typeof this);
            return this.name;
        })
        res.send(o.fn());
    },
    testObject2: function (req, res, next) {
        console.log("3= " + typeof this);
        var o = new Person("bk1", function () {
            return this.name;
        })
        var o2 = new Person("bk2", function () {
            return this.name;
        })
        console.log(o.constructor == Person)
        console.log(o instanceof Person); //true
        console.log(o == o2); //true
        console.log(o.printName == o2.printName); //true
        console.log("age= " + o.age);
        o.printName("22");
        console.log(o.share.push("2"))
        console.log(o2.share.length)
        console.log(Person.__proto__);
        res.send(o.fn());
    },
    testObject3: function (req, res, next) {
        var m = new Man("bb", "jj")
        m.printName("======" + "123")
        console.log(m.share.length);
        res.send(m.share[0]);
    }
}

var createObject = function (msg, fn) {
    var obj = {};
    obj.msg = msg;
    obj.name = "bianke";
    obj.fn = fn;
    return obj;
}
var Person = function (name, fn) {
    this.name = name;
    this.fn = fn;
    //this.share = [];
    // if (typeof this.printName != "function") {
    //     Person.prototype.printName = function (string) {
    //         console.log(this.share.push(string));
    //     }
    // }
}
Person.prototype.printName = function (string) {
    //console.log(this.share.push(string));
    console.log(string)
}
var Man = function (name, dick) {
    this.dick = dick

}
//Man.prototype = new Person()
var Woman = function (name, boo) {
    this.boo = boo;
}
util.inherits(Man, Person);

var m = new Man("bb", "jj")
m.printName("======" + "123")
//console.log(m.share.length);
//
// // 声明 Animal 对象构造器
// function Animal() {
// }
// // 将Animal 的 prototype 属性指向一个对象，
// // 亦可直接理解为指定 Animal 对象的原型
// Animal.prototype = {
//     name: "animal",
//     weight: 0,
//     eat: function () {
//         alert("Animal is eating!");
//     }
// }
// // 声明 Mammal 对象构造器
// function Mammal() {
//     this.name = "mammal";
// }
// // 指定 Mammal 对象的原型为一个 Animal 对象。 // 实际上此处便是在创建 Mammal 对象和Animal 对象之间的原型链
// Mammal.prototype = new Animal();
// // 声明 Horse 对象构造器
// function Horse(height, weight) {
//     this.name = "horse";
//     this.height = height;
//     this.weight = weight;
// }
// // 将 Horse对象的原型指定为一个 Mamal 对象，继续构建 Horse 与 Mammal 之间的原型链
// Horse.prototype = new Mammal();
// // 重新指定 eat方法 , 此方法将覆盖从 Animal 原型继承过来的 eat 方法
// Horse.prototype.eat = function () {
//     alert("Horse iseating grass!");
// }
// // 验证并理解原型链
// var horse = new Horse(100, 300);
// console.log(
//     horse.__proto__ === Horse.prototype);
// console.log(Horse.prototype.__proto__ ===
//     Mammal.prototype);
// console.log(Mammal.prototype.__proto__ === Animal.prototype);
// var s = new Mammal();
// console.log("weight = " + s.weight)


// 声明 User 构造器
function User(pwd) {
    // 定义私有属性
    var password = pwd;
    // 定义私有方法
    var getPassword = function () {
        // 返回了闭包中的 password
        return password;
    }

    //特权函数声明，用于该对象其他公有方法能通过该特权方法访问到私有成员
    this.passwordService = function () {
        return getPassword();
    }
}
// 公有成员声明
User.prototype.checkPassword = function (pwd) {
    return this.passwordService() === pwd;
};
// 验证隐藏性
var u = new User("123456");
// 打印 true
console.log("getPass= " + u.passwordService());
console.log(u.checkPassword(
    "123456"));
// 打印 undefined console.log( u.password ); // 打印 true
console.log(typeof
        u.getPassword === "undefined");