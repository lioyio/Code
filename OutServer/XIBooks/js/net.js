"use strict";

class Net{
	constructor() {
	    this.baseurl = "http://2679u9n928.wicp.vip/";
//		this.baseurl = "http://172.18.6.17:1234/";
	}
	require(url, cb) {
		$("#mask").show();
		mui.ajax(this.baseurl + url, {
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				$("#mask").hide();
				cb(undefined,data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
				$("#mask").hide();
				cb(type);
			}
		});
	}
}