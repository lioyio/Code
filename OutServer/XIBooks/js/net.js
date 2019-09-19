"use strict";

class Net{
	constructor() {
	    this.baseurl = "http://2679u9n928.wicp.vip/";
	    this.xhr = null;
	}
	require(url, cb) {
		
		if(this.xhr) {
			console.log("xhr请求已创建");
			return;
		}
		console.log("创建请求：");
		this.xhr = new plus.net.XMLHttpRequest();
		this.xhr.timeout = 10000;
		this.xhr.onreadystatechange = () => {
			console.log(1111);
			switch(this.xhr.readyState) {
				case 0:
					console.log("xhr请求已初始化");
					break;
				case 1:
					console.log("xhr请求已打开");
					break;
				case 2:
					console.log("xhr请求已发送");
					break;
				case 3:
					console.log("xhr请求已响应");
					break;
				case 4:
					console.log("xhr请求已完成");
					if(this.xhr.status == 200) {
						cb(this.xhr.status, this.xhr.responseText);
					} else {
						console.log("xhr请求失败：" + this.xhr.status);
						cb(this.xhr.status);
					}
					this.xhr = null;
					break;
				default:
					break;
			}
		}
		console.log(this.baseurl + url);
		this.xhr.open("GET", this.baseurl + url);
		this.xhr.send();
	}
}