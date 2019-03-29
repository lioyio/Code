const JSSendMessageToWeb = (data) => {
    return vm.JSSendMessageToWeb(data)
}
const JSSendMessageToApp = (data, webType) => {
    try {
		if(webType === 'iPad' || webType === 'iPhone') {
			window.webkit.messageHandlers.JSSendMessageToApp.postMessage(data);
		} else if(webType === 'Android' || webType === 'AndroidPad') {
			Android.JSSendMessageToApp(data);
		}
	} catch(e) {}
}