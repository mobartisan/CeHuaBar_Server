
var ResultCode = {
  /**
	 * redis缓存中使用。此属性标识为服务器会话
	 */
	 USER_LOGIN_UUID_SERVER : "USER_LOGIN_UUID_SERVER",
	/**
	 * redis缓存中使用。此属性标识为客户端会话
	 */
	 USER_LOGIN_UUID_CLIENT : "USER_LOGIN_UUID_CLIENT",

	/**
	 * 会话ID
	 */
	 ACCESS_TOKEN : "accessToken",

	/**
	 * 标识请求来至客户端
	 */
	 REQUEST_FROM : "requestFrom",

	/*
	 * 1000 ERROR 错误 1001 USER_NOT_EXIST 用户不存在 1002 USER_NAME_EXIST 登录用户名已经被使用
	 * 1003 USER_PWD_ERROR 密码错误！ 1004 USER_ALREADY_DEL 用户已被删除！ 1005
	 * CHECK_NO_RECORD 查询无此记录 1006 TOKEN_NOT_EXIST 用户TOKEN不存在 1007
	 * TOKEN_ALREADY_EXPIRE 1008 NICK_NAME_EXIST 用户昵称已经被使用 1009 USER_NAME_LENGTH
	 * 用户名称长度 1010 ERROR_PARAM 参数错误
	 */

	 SUCCESS : 1000,
	 ERROR : 2000,

	/**
	 * 用户名或者密码参数不存在
	 */
	 USER_NOT_EXIST : 1001,
	/**
	 * 用户名已被使用
	 */
	 USER_NAME_EXIST : 1002,
	 USER_PWD_ERROR : 1003,
	 USER_ALREADY_DEL : 1004,
	 CHECK_NO_RECORD : 1005,
	 TOKEN_NOT_EXIST : 1006,
	 TOKEN_ALREADY_EXPIRE : 1007,
	 NICK_NAME_EXIST : 1008,
	 USER_NAME_LENGTH : 1009,
	 ERROR_PARAM : 1010,
	/**
	 * 响应结果：参数解析异常
	 */
	 RESP_ERROR_PARSE : 2001,
	/**
	 * 响应结果：参数不存在
	 */
	 RESP_ERROR_NOTEXISTS : 2002,
	/**
	 * 响应结果：数据库异常
	 */
	 RESP_ERROR_DBEXCEPTIN : 2003,

	/**
	 * 响应结果：未登录
	 */
	 RESP_ERROR_NOTLOGIN : 2005,

	/**
	 * 响应结果：会话非法
	 */
	 RESP_ERROR_SESSIONILLEGAL : 2004,

	/**
	 * 响应结果：登录失败:用户名或者密码为空
	 */
	 RESP_LOGINERROR_PARAMNULL : 3001,

	/**
	 * 响应结果：登录失败:用户数据中不存在
	 */
	 RESP_LOGINERROR_USER : 3002,
	/**
	 * 响应结果：登录失败:密码错误
	 */
	 RESP_LOGINERROR_PASSWORD : 3003,

	/**
	 * 响应结果：登录失败:没有任何权限
	 */
	 RESP_LOGINERROR_NOAUTH : 3004,

	/**
	 * 响应结果：登录失败:验证码错误
	 */
	 RESP_LOGINERROR_AUTHCODE : 3005,

	/**
	 * 响应结果：更新用户信息失败
	 */
	 RESP_LOGINERROR_UPDATEUSER : 4001,

	/**
	 * 响应结果：更新用户信息失败:手机号码重复
	 */
	 RESP_UPDATEUSER_MOBILE : 4011,

	/**
	 * 响应结果：更新用户信息失败：邮箱重复
	 */
	 RESP_UPDATEUSER_EMAIL : 4021,

	/**
	 * 响应结果：上传文件失败，文件内容为空
	 */
	 RESP_UPLOADERROR_FILENULL : 4002,

	/**
	 * 响应结果：文件压缩失败
	 */
	 RESP_UPLOADERROR_COMPRESSERROR : 4003,

	/**
	 * 响应结果：文件上传失败，超过最大值
	 */
	 RESP_UPLOADERROR_MAXERROR : 4004,

	/**
	 * 响应结果：更新通道商品名称失败，通道内存在商品。
	 */
	 RESP_CHANNEL_MODIFYERROR : 6001,

	/**
	 * 商品名称与通道名称不匹配
	 */
	 RESP_CHANNEL_GOODSERROR : 6002,

	/**
	 * 通道未命名
	 */
	 RESP_CHANNEL_NONAME : 6003,
	/**
	 * 响应结果：订单生成时，库存不足。
	 */
	 RESP_TRADE_STOCKLESS : 7001,
	/**
	 * 响应结果：解析支付宝响应报文异常。
	 */
	 RESP_QRCODE_RESPEXPTION : 7002,
	/**
	 * 响应结果：调用支付宝生成二维码失败。
	 */
	 RESP_QRCODE_EXPTION : 7003,
	/**
	 * 响应结果：调用支付宝后，支付宝返回的错误。
	 */
	 RESP_QRCODE_ALIPAYERROR : 7004,

	/**
	 * 响应结果：调用支付宝后，支付宝返回的错误。
	 */
	 RESP_PAY_ALREADY : 7005,
	/**
	 * 响应结果：订单支付时，余额不足。
	 */
	 RESP_TRADE_MONEYLESS : 8001,

	/**
	 * 响应结果：未知异常
	 */
	 RESP_ERROR_UNKNOW : 9999
};
 
module.exports = ResultCode;