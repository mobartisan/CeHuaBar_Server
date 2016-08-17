/**
 * Created by mikebian on 16/7/23.
 */
//定义用户接口相关方法
var ResultCode = require('../conf/ResultCode');
var jsonSend = require('../middlewares/jsonSend');
var logger = require('../middlewares/log').logger;
var testEntity = require('../mongodb/test_schema').TestEntity;
var testSchema = require('../mongodb/test_schema');

var projectEntity = require('../mongodb/project_schema').ProjectEntity;
var projectSchema = require('../mongodb/project_schema').Project;

var memberEntity = require('../mongodb/member_schema').MemberEntity;
var memberSchema = require('../mongodb/member_schema').Member;

var usersEntity = require('../mongodb/users_schema').UsersEntity;
var usersSchema = require('../mongodb/users_schema').Users;

var DB = require('../mongodb/mongo_helper');
var uuid = require('node-uuid');
module.exports = {
    /**
     * 通过question_id找到一条数据(基于实例方法的查询)
     * @param req
     * @param res
     * @param next
     */
    findByQid: function (req, res, next) {
        var questionId = req.query.questionId;
        logger.debug("query questionId= " + questionId);
        var conditions = {question_id: 'e5b991f0-50dc-11e6-be20-bb85e707ed12'};
        // var testEntity = new testSchema.Test({});
        testEntity.findAllByDoc(conditions, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //通过question_type找到多条数据Bytype
    findByType: function (req, res, next) {
        var conditions = {question_type: 1};
        testSchema.Test.findAllByDocStaticAsync(conditions, function (error, docs) {
            // testSchema.Test.findAllByDocStatic(conditions, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    findPartByCondition: function (req, res, next) {
        var conditions = {correct_option: "B"}; // 查询条件
        var fields = {question_id: 1, question_type: 1, create_time: 1}; // 待返回的字段
        var options = {};
        testSchema.TestEntity.findPartByDoc(conditions, fields, options, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //通过question_type找到多条数据Bytype
    findQuestionByCorrOption: function (req, res, next) {
        var conditions = {correct_option: "B"};
        testSchema.TestEntity.findAllByDoc(conditions, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //增加一个问题
    addQuestion: function (req, res, next) {
        var data = {
            question_id: uuid.v1(),
            question_type: 1,
            question_content: '以下古代城市名不是江苏南京的曾用名的为',
            optiones: 'A 金陵;B 广陵;C 建康;D 江宁',
            correct_option: 'B',
            //anwser: 'A错 金陵为江苏南京的旧称，战国时期楚威王于公元前333年置金陵邑;B对 广陵为战国时期（现）江苏扬州的旧称;C错 建康为江苏南京的旧称，公元265年司马炎建立晋朝，280年灭吴改建业为秣陵属丹杨郡，307年王谢两大族簇拥西晋皇族琅琊王司马睿南渡长江改回建业，并于313年灭西晋建立偏安江左的东晋王朝，为避愍帝司马邺讳，改建邺为建康，此后南朝的宋齐梁陈都在此立都，先后共达三百多年之久，所以南京又称六朝古都;D错 江宁为江苏南京的旧称，从隋唐郡县治所开始，历史上南京多次更名，先后为上元、白下、江宁县、升州、归化、江宁郡等，宋元时期改为集庆路，明初改应天府及南京，清代改江宁府，太平天国改天京，综上南京叫江宁的次数多且时间长;',
            score: 1,
            create_time: Date.now()
        };
        // var testEntity = new testSchema.Test({});
        testEntity.addRecord(data, function (error) {
            if (error) {
                logger.error(error);
                res.send(error);
            } else {
                res.send("add ok");
            }
        });
    },
    updateQuestionByQid: function (req, res, next) {
        // var testEntity = new testSchema.Test({});
        var conditions = {question_id: '077ea4b0-50e2-11e6-ac3a-8da11d82131e'};
        var update = {$set: {question_type: 4, correct_option: 'E'}};
        var options = {upsert: true};
        testEntity.updateRecord(conditions, update, options, function (error, numberAffected) {
            if (error) {
                console.log(error)
                res.send(error);
                return;
            }
            logger.info("numberAffected= " + JSON.stringify(numberAffected));
            res.send("updateQuestionByQid ok");
        });
    },
    updateQuestionByType: function (req, res, next) {
        // safe (boolean) 安全模式，默认选项，值为true
        // upsert (boolean) 条件不匹配时是否创建新文档，默认值为false
        // multi (boolean) 是否更新多个文件，默认值为false
        // strict (boolean) 严格模式，只更新一条数据
        // overwrite (boolean) 覆盖数据，默认为false

        //numberAffected （笔者暂时不清楚）
        //rawResponse 受影响的行数
        var conditions = {question_type: 4};
        var update = {$set: {score: 2, correct_option: 'D'}};
        var options = {upsert: true};
        testEntity.updateRecord(conditions, update, options, function (error, numberAffected) {
            if (error) {
                console.log(error)
                res.send(error);
                return;
            }
            logger.info("numberAffected= " + numberAffected.nModified);
            res.send("updateQuestionByType ok");
        });
    },
    deleteQuestionByQid: function (req, res, next) {
        var conditions = {
            question_id: "e5b991f0-50dc-11e6-be20-bb85e707ed12"
        }
        // var testEntity = new testSchema.Test({});
        testEntity.deleteRecord(conditions, function (error) {
            if (error) {
                console.log(error)
                res.send(error);
                return;
            }
            res.send("delete qid ok");
        })
    },
    deleteQuestionByAll: function (req, res, next) {
        // 删除记录
        var conditions = {}
        // var testEntity = new testSchema.Test({});
        testEntity.deleteRecord(conditions, function (error) {
            if (error) {
                console.log(error)
                res.send(error);
                return;
            }
            res.send("delete all ok");
        })
    },
    countQuestionByType: function (req, res, next) {
        var conditions = {}
        testEntity.countByDoc(conditions, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.send("countQuestionByType all ok");
        });
    },
    //通过question_type找到多条数据Bytype
    findQuestionByParam: function (req, res, next) {
        var conditions = {question_type: 1};
        var fields = {question_id: 1, correct_option: 1}; // 待返回的字段
        testSchema.TestEntity.findByParam(conditions, fields, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    findQuestionByWhere: function (req, res, next) {
        var conditions = "this.correct_option=='C'";
        var fields = {question_id: 1, correct_option: 1}; // 待返回的字段
        testSchema.TestEntity.findByWhere(conditions, fields, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs.question_id);
            res.json(docs);
        });
    },
    //========================================================================
    //原型方式查询一条
    findOneQuestionByConditionDb: function (req, res, next) {
        var conditions = {};
        var fields = {email: 1}; // 待返回的字段
        //查询一条数据
        DB.findOne('t_user', conditions, fields, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //原型方式查询所有数据
    findQuestionByConditionDb: function (req, res, next) {
        var conditions = {};
        var fields = {email: 1}; // 待返回的字段
        //查询duo条数据
        DB.find('t_user', conditions, fields, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //增加一条数据
    addQuestionByConditionDb: function (req, res, next) {
        var fields = {
            uid: uuid.v1(),
            email: "woyoushmy8@126.com",
            username: "bianke",
            salt: 123123123,
            password: 110110,
            create_date: Date.now()
        }
        //增加一条互数据
        DB.save('t_user', fields, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //删除数据
    deleteQuestionByConditionDb: function (req, res, next) {
        //增加一条互数据
        var condition = {}
        DB.remove('t_user', condition, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
//----------------------------------------------------------------
    //增加一条User数据
    addUser: function (req, res, next) {
        var uid = uuid.v1();
        var fields = {
            user_id: uid,
            name: "bianke",
            password: "110110",
            nick_name: "wanzi",
            wx_account: "123123djskfjksdjfksjdf",
            phone: "18652010592",
            head_img_url: "http://129123123",
            os_type: "iphone",
            os_description: "iphone45",
            device_identify: "2323",
            create_date: Date.now(),
            create_user_id: uid,
            last_edit_date: Date.now(),
            last_edit_user_id: uid
        }; // 待返回的字段
        //增加一条互数据
        usersEntity.addRecord(fields, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //增加一条Project数据
    addProject: function (req, res, next) {
        var uid = "63035570-6446-11e6-b091-6d6e72473075";
        logger.debug("createProject");
        var projectId = uuid.v1();
        //创建TT_Project数据
        var projectData = {
            project_id: projectId,
            name: "test1",
            description: "测试项目",
            is_private: true,
            current_state: 1,
            is_allow_delete: true,
            create_date: Date.now(),
            create_user_id: uid,
            last_edit_date: Date.now(),
            last_edit_user_id: uid
        };

        function addMember(projectDoc) {
            var memId = uuid.v1();
            var memberData = {
                project_members_id: memId,
                project_id: projectId,
                user_id: uid,
                projectId: projectDoc._id,
                create_date: Date.now(),
                create_user_id: uid,
                last_edit_date: Date.now(),
                last_edit_user_id: uid
            };
            //增加一条互数据
            memberEntity.addRecordAsync(memberData).then(function (docs) {
                logger.info(docs);
                res.json(docs);
            }, function (error) {
                logger.error(error);
                res.send(error);
                return;
            });
        }

        //增加一条互数据
        projectEntity.addRecordAsync(projectData).then(function (docs) {
            logger.info(docs);
            logger.info("ObjectId= " + docs._id);
            addMember(docs);
        }, function (error) {
            logger.error(error);
            res.send(error);
            return;
        });
    },
    addMember: function (req, res, next) {
        var memId = uuid.v1();
        var uid = "63035570-6446-11e6-b091-6d6e72473075";
        var proUid = "57b4085f5f2639e20b5a1a42";
        var projectId = "57b417efda1285970f1e2999";
        var proUdi = "a97eeb00-644f-11e6-9bf5-39330783a81c"
        var memberData = {
            project_members_id: memId,
            project_id: proUdi,
            user_id: uid,
            projectId: projectId,
            userId: proUid,
            create_date: Date.now(),
            create_user_id: uid,
            last_edit_date: Date.now(),
            last_edit_user_id: uid
        };
        //增加一条互数据
        memberEntity.addRecord(memberData, function (error, docs) {
            if (error) {
                logger.error(error);
                res.send(error);
                return;
            }
            logger.info(docs);
            res.json(docs);
        });
    },
    //增加一条Project数据
    findMyProject: function (req, res, next) {
        var uid = "63035570-6446-11e6-b091-6d6e72473075";
        logger.info("==============");
        var conditions = {user_id: uid};
        var fields = {projectId: 1}; // 待返回的字段
        var options = {};
        memberSchema.findAllByDocStaticAsync(conditions, fields, options).then(function (docs) {
            //logger.info("123123  ===  " + docs.projectId.description);
            res.json(docs);
        }, function (error) {
            logger.error(error);
            res.send(error);
            return;
        });
    }
}