function JSSendMessageToWeb(data) {
	try {
		data = JSON.parse(data);
	} catch (e) {
		ShowDebugView('########################');
		ShowDebugView('<span style="color:red">' + e.message + '</span>');
		ShowDebugView(data);
		ShowDebugView('########################');
		HideLoader();
		//ShowErrorTips(lg.IDS_DATA_PARSE_ERROR);
		return "";
	}
	let ret = "";
	switch (data.Type) {
		case "Init":
			ret = GetInitDataCall(data);
			break;
			case "Get": //APP提供网页数据
			    if(!gVar.bNoHideLoader) {
			        HideLoader();
			    }
			    if(data.Data==="Error") {
			        gVar.bRefreshSuc = false;
			        //ShowTips(lg.IDS_REFRESH_FAILED);
			    } else {
			        if(!gVar.bNoTips) {
			            //ShowTips(lg.IDS_REFRESH_SUCCESS);
			        }
			        try {
			            GetAppDataCall(data);
			            gVar.bRefreshSuc = true;
			        } catch(e) {
			            gVar.bRefreshSuc = false;
			            HideLoader();
			            //ShowTips(lg.IDS_DATA_PARSE_ERROR);
			            return "";
			        }

			    }
			    break;
			case "Set": //网页保存数据返回
			    HideLoader();
			    if(!gVar.bNoTips) {
			        if(data.Data==="Success") {
			            //ShowTips(lg.IDS_SAVE_SUCCESS);
			        } else {
			            //ShowTips(lg.IDS_SAVE_FAILED);
			        }
			    }else{
			        gVar.bNoTips = false;
			    }
			    //ShowDebugView(data.Data);
			    break;
			// case "RemoteTest": //RemoteTest返回
			//     ret = RemoteTestCall(data.SubType, data.Data);
			//     break;
			// case "AreaSet":
			//     ShowDebugView('AreaSet Call');
			//     ret = AreaSetCall(data.Data);
			//     break;
			// case "GoBack":
			//     GoBackCall();
			//     break;
			// case "SetAlias":
			//     SetAliasCall();
			//     break;
			// case "Rename":
			//     RenameAliasCall();
			//     break;
			// case "GooglePairStatus":
			//     GooglePairStatus(data.Data);
			//     break;
			// case "ActivateDropBox":
			//     ActivateDropBoxCall(data.Data);
			//     break;
			// case "HideKeyBoard"://安卓键盘隐藏没有产生blur事件，由app发送键盘隐藏消息
			//     jQuery("input").blur();
			//     break;
	}
	return ret;
}

function JSSendMessageToApp(data) {
	try {
		if (gVar.webType === 'iPad' || gVar.webType === 'iPhone') {
			window.webkit.messageHandlers.JSSendMessageToApp.postMessage(data);
		} else if (gVar.webType === 'Android' || gVar.webType === 'AndroidPad') {
			Android.JSSendMessageToApp(data);
		}
	} catch (e) {}
}

function ShowDebugView(str) {
	debugvm.ShowDebugView(str)
}

function ClearDebugView() {
	jQuery("#debugstr").html('');
}

function HideLoader() {
	JSSendMessageToApp(JSON.stringify({
		Type: 'HideWaitView'
	}));
}

function ShowLoader() {
	JSSendMessageToApp(JSON.stringify({
		Type: 'ShowWaitView'
	}))
}

/*
 * 刷新保存接口
 */
function RfParamCall(CallBack, msg, type, jsonData, flag) {
	if(type == null || typeof type == 'undefined') {
		type = "Get";
	}
	if(flag == null || typeof flag == 'undefined') {
		flag = queryTypeEnum.QUERY_ALL;
	}
	if(jsonData == null || typeof jsonData == 'undefined') {
		jsonData = {
			"": ""
		};
	}
	if(!jQuery.isFunction(CallBack)) {
		return(null);
	}
	CfgCallback = CallBack;
	var param = {};
	param.Type = type;
	param.SubType = msg;
	param.QueryType = flag;
	param.Data = jsonData;
	JSSendMessageToApp(JSON.stringify(param));
}

function JsonParamCall(CallBack, msg, type, jsonData) {
	var flag;
	if(type == null || typeof type == 'undefined') {
		type = "Get";
	}
	if(jsonData == null || typeof jsonData == 'undefined') {
		jsonData = {};
	}
	var msgParam = {};
	msgParam.data = jsonData;
	if(type == 'Get') {
		flag = queryTypeEnum.QUERY_ALL_WITHDATA;
		msgParam.msgType = 'get' + msg;
	} else {
		flag = queryTypeEnum.SAVE_ALL;
		msgParam.msgType = 'set' + msg;
	}
	if(!jQuery.isFunction(CallBack)) {
		return(null);
	}

	CfgCallback = function(data) {
		CallBack(data.data);
	}; //Set the callback
	var param = {};
	param.Type = type;
	param.SubType = paramPage.MsgJsonTypeMsg;
	param.QueryType = flag;
	param.Data = msgParam;
	JSSendMessageToApp(JSON.stringify(param));
}
/*
 * RemoteTest接口,回调为RemoteTestCall
 */
function RemoteTest(type, paramData) {
	ShowDebugView('RemoteTest')
	var param = {};
	param.Type = 'RemoteTest';
	param.SubType = type;
	param.Data = paramData;
	return JSSendMessageToApp(JSON.stringify(param));
}

function AreaSet(type, paramData, channel) {
	ShowDebugView('AreaSet')
	var param = {};
	param.Type = 'AreaSet';
	param.SubType = type;
	param.Data = paramData;
	param.Channel = channel;
	return JSSendMessageToApp(JSON.stringify(param));
}

function DistanceSet(channel, show) {
	ShowDebugView('DistanceSet')
	var param = {};
	param.Type = 'DistanceSet';
	param.Channel = channel;
	param.Data = show;
	return JSSendMessageToApp(JSON.stringify(param));
}
