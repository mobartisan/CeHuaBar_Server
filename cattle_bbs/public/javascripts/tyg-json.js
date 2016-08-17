/**
 * Created by wangmiao on 15-3-25.
 * tygInf
 * id 体验馆标识
 * viewImg 缩略图
 * title 标题
 * name 体验馆名
 * tel 电话
 * address 地址
 * addressShort 地址简写
 * body 主体内容

 */
 	var svrPath=$("#svrPath").val()+"/static";
 	console.log("svrPath:"+svrPath);
	var tygInf = [
		{
			"id":"0",
			"viewImg":"<img src='"+svrPath+"/images/tImg1-1.jpg' />",
			"title":"明故宫体验店",
			"name":"明故宫体验店",
			"tel":"025-83679955",
			"address":"江苏省南京市玄武区中山东路311-2号五星控股大厦2楼",
			"addressShort":"江苏省南京市玄武区",
			"body":"<img src='"+svrPath+"/images/tImg1-1.jpg' /><img src='"+svrPath+"/images/tImg1-2.jpg' /><img src='"+svrPath+"/images/tImg1-3.jpg' /><img src='"+svrPath+"/images/tImg1-4.jpg' />"
		},
		{
			"id":"1",
			"viewImg":"<img src='"+svrPath+"/images/tImg2-1.jpg' />",
			"title":"徐州庆丰路体验店",
			"name":"徐州庆丰路体验店",
			"tel":"13905206361",
			"address":"徐州市云龙区庆丰路口绿地城市广场B座729室",
			"addressShort":"江苏省徐州市云龙区",
			"body":"<img src='"+svrPath+"/images/tImg2-1.jpg' /><img src='"+svrPath+"/images/tImg2-2.jpg' />"
		},
		{
			"id":"2",
			"viewImg":"<img src='"+svrPath+"/images/tImg3-1.jpg' />",
			"title":"南京民族大道体验店",
			"name":"南京民族大道体验店",
			"tel":"13851808618",
			"address":"南京市江宁区湖熟镇民族大道9号",
			"addressShort":"江苏省南京市江宁区",
			"body":"<img src='"+svrPath+"/images/tImg3-1.jpg' /><img src='"+svrPath+"/images/tImg3-2.jpg' />"
		},
		{
			"id":"3",
			"viewImg":"<img src='"+svrPath+"/images/tImg4-1.jpg' />",
			"title":"南京西善花苑体验店",
			"name":"南京西善花苑体验店",
			"tel":"13914489908",
			"address":"南京雨花区西善花苑菜场格力空调专卖店",
			"addressShort":"江苏省南京雨花区",
			"body":"<img src='"+svrPath+"/images/tImg4-1.jpg' /><img src='"+svrPath+"/images/tImg4-2.jpg' />"
		},
		{
			"id":"4",
			"viewImg":"<img src='"+svrPath+"/images/tImg5-1.jpg' />",
			"title":"南京中山南路体验店",
			"name":"南京中山南路体验店",
			"tel":"13912946976",
			"address":"中山南路230号安瑞商务大厦221",
			"addressShort":"江苏省南京中山南路",
			"body":"<img src='"+svrPath+"/images/tImg5-1.jpg' />"
		},
		{
			"id":"5",
			"viewImg":"<img src='"+svrPath+"/images/tImg6-1.jpg' />",
			"title":"连云港瀛洲路体验店",
			"name":"连云港瀛洲路体验店",
			"tel":"15351880518",
			"address":"连云港新浦区瀛洲路38号",
			"addressShort":"江苏省连云港新浦区",
			"body":"<img src='"+svrPath+"/images/tImg6-1.jpg' /><img src='"+svrPath+"/images/tImg6-2.jpg' /><img src='"+svrPath+"/images/tImg6-3.jpg' /><img src='"+svrPath+"/images/tImg6-4.jpg' />"
		},
		{
			"id":"6",
			"viewImg":"<img src='"+svrPath+"/images/tImg7-1.jpg' />",
			"title":"南京雨花区体验店",
			"name":"南京雨花区体验店",
			"tel":"13776689055",
			"address":"南京市雨花区卡子门大街88号",
			"addressShort":"江苏省南京市雨花区",
			"body":"<img src='"+svrPath+"/images/tImg7-1.jpg' /><img src='"+svrPath+"/images/tImg7-2.jpg' /><img src='"+svrPath+"/images/tImg7-3.jpg' /><img src='"+svrPath+"/images/tImg7-4.jpg' />"
		},
		{
			"id":"7",
			"viewImg":"<img src='"+svrPath+"/images/tImg8-1.jpg' />",
			"title":"宜兴羊羡东路体验店",
			"name":"宜兴羊羡东路体验店",
			"tel":"13861693099",
			"address":"宜兴市羊羡东路177-179号",
			"addressShort":"江苏省宜兴市",
			"body":"<img src='"+svrPath+"/images/tImg8-1.jpg' /><img src='"+svrPath+"/images/tImg8-2.jpg' /><img src='"+svrPath+"/images/tImg8-3.jpg' /><img src='"+svrPath+"/images/tImg8-4.jpg' />"
		},
		{
			"id":"8",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"句容华阳东路体验店",
			"name":"句容华阳东路体验店",
			"tel":"18052880888",
			"address":"句容市华阳东路116号",
			"addressShort":"句容华阳东路",
			"body":"敬请期待..."
		},
		{
			"id":"9",
			"viewImg":"<img src='"+svrPath+"/images/tImg10-1.jpg' />",
			"title":"南京莫愁东路体验店",
			"name":"南京莫愁东路体验店",
			"tel":"13952096141",
			"address":"建邺区莫愁东路58号创立商务212-215室",
			"addressShort":"南京建邺区",
			"body":"<img src='"+svrPath+"/images/tImg10-1.jpg' /><img src='"+svrPath+"/images/tImg10-2.jpg' />"
		},
		{
			"id":"10",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"南京江东中路体验店",
			"name":"南京江东中路体验店",
			"tel":"18951717766",
			"address":"建邺区江东中路211号凤凰文化广场A座1608室",
			"addressShort":"南京建邺区",
			"body":"敬请期待..."
		},
		{
			"id":"11",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"无锡北塘大街体验店",
			"name":"无锡北塘大街体验店",
			"tel":"13921112029",
			"address":"无锡市北塘大街4号莲蓉园社区",
			"addressShort":"无锡市北塘大街",
			"body":"敬请期待..."
		},
		{
			"id":"12",
			"viewImg":"<img src='"+svrPath+"/images/tImg9-1.jpg' />",
			"title":"苏州东吴北路体验店",
			"name":"苏州东吴北路体验店",
			"tel":"13338666676",
			"address":"苏州吴中区东吴北路98号新苏国际1216室",
			"addressShort":"苏州吴中区",
			"body":"<img src='"+svrPath+"/images/tImg9-1.jpg' /><img src='"+svrPath+"/images/tImg9-2.jpg' /><img src='"+svrPath+"/images/tImg9-3.jpg' /><img src='"+svrPath+"/images/tImg9-4.jpg' />"
		},
		{
			"id":"13",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"南京明匙路体验店",
			"name":"南京明匙路体验店",
			"tel":"18051981115",
			"address":"南京明匙路108号杜克商务楼220室",
			"addressShort":"南京明匙路",
			"body":"敬请期待..."
		},
		{
			"id":"14",
			"viewImg":"<img src='"+svrPath+"/images/tImg11-1.jpg' />",
			"title":"南京仙隐北路体验店",
			"name":"南京仙隐北路体验店",
			"tel":"13912999905",
			"address":"南京市仙林仙隐北路12号",
			"addressShort":"南京市仙林区",
			"body":"<img src='"+svrPath+"/images/tImg11-1.jpg' /><img src='"+svrPath+"/images/tImg11-2.jpg' /><img src='"+svrPath+"/images/tImg11-3.jpg' /><img src='"+svrPath+"/images/tImg11-4.jpg' /><img src='"+svrPath+"/images/tImg11-5.jpg' />"
		},
		{
			"id":"15",
			"viewImg":"<img src='"+svrPath+"/images/tImg12-1.jpg' />",
			"title":"南京湖山路体验店",
			"name":"南京湖山路体验店",
			"tel":"13072535398",
			"address":"南京市江宁区科学园湖山路320号格力空调",
			"addressShort":"南京市江宁仙林区",
			"body":"<img src='"+svrPath+"/images/tImg12-1.jpg' /><img src='"+svrPath+"/images/tImg12-2.jpg' /><img src='"+svrPath+"/images/tImg12-3.jpg' /><img src='"+svrPath+"/images/tImg12-4.jpg' />"
		},
		{
			"id":"15",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"宿迁人民大道体验店",
			"name":"宿迁人民大道体验店",
			"tel":"13611549390",
			"address":"宿迁市人民大道111号项王二期东门北侧3号",
			"addressShort":"宿迁市人民大道",
			"body":"敬请期待..."
		},
		{
			"id":"16",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"常州玉龙南京体验店",
			"name":"常州玉龙南京体验店",
			"tel":"13701596611",
			"address":"常州市钟楼区玉龙南路178-1号",
			"addressShort":"常州市钟楼区",
			"body":"敬请期待..."
		},
		{
			"id":"17",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"南京虎踞南路体验店",
			"name":"南京虎踞南路体验店",
			"tel":"13770662600",
			"address":"南京市秦淮区虎踞南路2-10号",
			"addressShort":"南京市秦淮区",
			"body":"敬请期待..."
		},
		{
			"id":"18",
			"viewImg":"<img src='"+svrPath+"/images/mA3.png' />",
			"title":"济南饮虎池街体验店",
			"name":"济南饮虎池街体验店",
			"tel":"13805413333",
			"address":"山东省济南市饮虎池街45-1号",
			"addressShort":"山东省济南市",
			"body":"敬请期待..."
		},
		{
			"id":"19",
			"viewImg":"<img src='"+svrPath+"/images/tImg13-1.jpg' />",
			"title":"南京北岭路体验店",
			"name":"南京北岭路体验店",
			"tel":"13062539288",
			"address":"南京市高淳区北岭路96-9",
			"addressShort":"南京市高淳区",
			"body":"<img src='"+svrPath+"/images/tImg13-1.jpg' /><img src='"+svrPath+"/images/tImg13-2.jpg' /><img src='"+svrPath+"/images/tImg13-3.jpg' /><img src='"+svrPath+"/images/tImg13-4.jpg' />"
		}
	];
	var hydtInf = [
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MzA4MTY5NDEzNQ==&mid=203956656&idx=2&sn=9b3b540987955c0b92dda54d4338e12d#rd",
			"title":"原来你这么牛X，全国第一舒适家居商城正在为你服务！",
			"inf":"",
			"viewImg":"<img src='"+svrPath+"/images/hydtImg1.jpg' />",
			"time":"2015-03-24"
		},
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MzA4MTY5NDEzNQ==&mid=203956656&idx=4&sn=644802191e6c9b38466c7914d50f39df#rd",
			"title":"装修攻略：资深达人分享春季装修不可不知的问题！",
			"inf":"",
			"viewImg":"<img src='"+svrPath+"/images/hydtImg2.jpg' />",
			"time":"2015-03-24"
		},
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MzA4MTY5NDEzNQ==&mid=203956656&idx=3&sn=f9cb48dd03c267544cd2ec43aba9e686#rd",
			"title":"涨姿势：影响地暖使用费用的6个因素",
			"inf":"",
			"viewImg":"<img src='"+svrPath+"/images/hydtImg3.jpg' />",
			"time":"2015-03-24"
		}
	];
	var gcalList = [
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MjM5OTM0MjY0MA==&mid=251437432&idx=1&sn=bf6ab591d9448e10b329fec562894709&scene=18#wechat_redirect",
			"title":"【工艺会说话】无管式明管工艺，从此不再为美不美观而担忧！",
			"viewImg":"<img src='http://mmbiz.qpic.cn/mmbiz/JdiaHuibFBLLzSFL00sSmexW8iawic9le91AfGjoBV4qselgyaw968lF8224gibZEdGYIiau1drBUrJLdrLVfMCtDxicQ/640?tp=webp&wxfrom=5' />",
			"time":"2014-09-29"
		},
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MjM5OTM0MjY0MA==&mid=207990736&idx=1&sn=c7777420af613caf03153e480f89f6f0&scene=18#wechat_redirect",
			"title":"直击好享家优质安装工程——【凤凰和熙】地暖加新风施工",
			"viewImg":"<img src='http://mmbiz.qpic.cn/mmbiz/JdiaHuibFBLLxeLtdGUN0gVpZe9SghEUIIk9uscmafDictsuxDAWq8bnad7AG6nXWvZYWdXlBZjIHhMHVKJ9qf7mg/0?tp=webp&wxfrom=5' />",
			"time":"2014-05-14"
		},
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MjM5OTM0MjY0MA==&mid=207971625&idx=2&sn=a77b9ad9e71bff63d5e0fcf08f0aafb8&scene=18#wechat_redirect",
			"title":"直击好享家优质安装工程——【保利香槟国际B、F户型】",
			"viewImg":"<img src='http://mmsns.qpic.cn/mmsns/JdiaHuibFBLLyav6A0eEzmUeogD0P3szoOvPRMTJEWduib7SA9pMlsupQ/0' />",
			"time":"2014-05-14"
		},
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MjM5OTM0MjY0MA==&mid=207971625&idx=1&sn=82cbede16c4798f456fc1f0e3c15ed0f&scene=18#wechat_redirect",
			"title":"直击好享家优质安装工程——【保利紫晶山】",
			"viewImg":"<img src='http://mmbiz.qpic.cn/mmbiz/JdiaHuibFBLLxIyYovlYG16VKPZbsqqeSxY36IaIUVTZBklgnrU4wib0UXDRvhNSKo1lVtlvW1mYjiciaGjlViaV7icyw/0?tp=webp&wxfrom=5' />",
			"time":"2014-05-14"
		},
		{
			"link":"http://mp.weixin.qq.com/s?__biz=MjM5OTM0MjY0MA==&mid=230072985&idx=1&sn=29e1ed9e729df79fff981f97920a9f5a&scene=18#wechat_redirect",
			"title":"用心服务，给您最舒适的家——直击好享家散热片安装工程",
			"viewImg":"<img src='http://mmbiz.qpic.cn/mmbiz/JdiaHuibFBLLwwPibIuKH4ye2jzgvicElaN3ZQU0AziaPjXPIBZ3Ejwx63iafQag5538VLWhiaC15paxwg403LPnDTg9Q/0?tp=webp&wxfrom=5' />",
			"time":"2014-07-21"
		}
	];


















