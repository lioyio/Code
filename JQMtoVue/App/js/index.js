let lg = []
let vm
let gVar = {}
let gDevice = new DeviceInfo()
let CfgCallback = () => {}

let urlparam = window.location.search.split('?')[1]

if (urlparam !== undefined) {
    urlparam.split('&').forEach((val) => {
        let param = val.split('=');
        gVar[param[0]] = param[1];
    })
}
jQuery.extend(true, gVar, new GlobalVar())

Vue.config.devtools = true
//gVar.bDebug = true

jQuery(document).ready(function () {
    InitWeb()
});

function InitWeb() {
    if(gVar.bDebug){
        FakeData();
    }
    LoadLanguage(gVar['language'])
}

function GetInitDataCall(data) {
    if (data.Data["Device"] === undefined)
        ShowDebugView('Init:No Device')
    else {
        gVar.webType = data.Data["Device"]
    }
    if (data.Data["LoginRsp"] === undefined)
        ShowDebugView('Init:No LoginRsp')
    else {
        gDevice.setLoginRsp(data.Data["LoginRsp"])
        if (gDevice.loginRsp.HighType === 0x52530305 && gDevice.loginRsp.LowType === 0x2120901) {
            gVar.bC23_wireless = true
        }
    }
    if (!gDevice.isDevType(devTypeEnum.DEV_IPC) && !gDevice.isDevType(devTypeEnum.DEV_DVR)) {
        if (data.Data["MsgRemoteCHStatusReq"] === undefined)
            ShowDebugView('Init:No MsgRemoteCHStatusReq')
        else {
            $.extend(true, gDevice.devState, data.Data["MsgRemoteCHStatusReq"])
        }
    }
    if (!gDevice.isDevType(devTypeEnum.DEV_DVR)) {
        if (data.Data["MsgDevAllStatusReq"] === undefined)
            ShowDebugView('Init:No MsgDevAllStatusReq')
        else {
            gDevice.setDevAllStatusRpt(data.Data["MsgDevAllStatusReq"])
        }
    }
    if (data.Data["Customer"] === undefined)
        ShowDebugView('Init:No Customer')
    else {
        gVar.customer = data.Data["Customer"]
    }
    if (data.Data["Password"] === undefined)
        ShowDebugView('Init: No Password')
    else {
        gDevice.password = data.Data["Password"]
    }
    config()
    if (data.Data["pageIndex"] === undefined)
        ShowDebugView('Init:No pageIndex')
    else {
        LoadRemoteSettingPage(GetPageName(data.Data["pageIndex"]))
    }
    return 'Init recived'
}

function LoadRemoteSettingPage(pagename) {
    if (pagename === "") {
        return;
    } else if (gVar.curPage === pagename) {
        ShowLoader()
        //GetParamCall()
        return;
    }
    //ShowLoader()
    gVar.curPage = pagename
    gVar.GetJS({
        webUrl: '../pages/' + pagename + '.js',
        callback: function () {
            vm = new Vue({
                el: '#app',
                router: new VueRouter({
                    routes: [{
                        name: pagename,
                        path: '/',
                        component: {
                            template: '<' + pagename + ' :gDevice="gDevice" :gVar="gVar" :lg="lg"></' + pagename + '>',
                            data() {
                                return {
                                    gDevice,
                                    gVar,
                                    lg
                                }
                            }
                        }
                    }]
                }),
                data: {
                    debugstr: '',
                    lg: lg
                }
            })
        }
    })
    // $(".noscroll").removeClass('noscroll');
    // gVar.GetHtml({
    //     webUrl: "./html/cfg/" + pagename + ".html?version=" + (new Date().getTime()),
    //     callback: function (html) {
    //         //调用trigger("create")让动态添加的元素样式生效
    //         $("#container").html(html).trigger("create");
    //         const copyselect = CopySelect();
    //         copyselect.Init();
    //         gVar.GetJS({
    //             webUrl: "./html/cfg/" + pagename + ".js?version=" + (new Date().getTime()),
    //             callback: function () {
    //                 ChangeLanguage();
    //                 if (SupportCheckCall()) {
    //                     MenuChange();
    //                     $('.ui-field-contain').css('opacity', 1);
    //                     GetParamCall();
    //                     InitContrl();
    //                 } else {
    //                     HideLoader();
    //                     ShowTips(lg.IDS_NODEVICE_SUPPORT, 2500);
    //                     setTimeout(function () {
    //                         GoBack(true);
    //                     }, 2500);
    //                 }
    //             }
    //         });
    //     }
    // });
}

function GetPageName(pageIndex) {
    switch (pageIndex) {
        case pageIndexEnum.LIVE:
            return "Live";
        case pageIndexEnum.IO:
            return "IO_Control";
        case pageIndexEnum.NETWORK:
            return "Network";
        case pageIndexEnum.HDD:
            return "HDD";
        case pageIndexEnum.MOTION:
            return "Motion";
        case pageIndexEnum.FLOODLIGHT:
            return "Deterrence";
        case pageIndexEnum.FLOODLIGHTSCHEDULE:
            return "DeterrenceSchedule";
        case pageIndexEnum.SCHEDULE:
            return "RecordSchedule";
        case pageIndexEnum.INFO:
            return "Info";
        case pageIndexEnum.DATEANDTIME:
            return "DateAndTime";
        case pageIndexEnum.WIRELESSCAMERA:
            return "WirelessCamera";
        case pageIndexEnum.EMAILSETTING:
            return "EmailSetting";
        case pageIndexEnum.CLOUDSTORAGE:
            return "CloudStorage";
        case pageIndexEnum.ALARMSCHEDULE:
            return "AlarmSchedule";
        default:
            {
                ShowDebugView("页面不存在:" + pageIndex);
                //ShowTips("Page does not exist!")
                return "";
            }
    }
}

/*刷新回调*/
function GetAppDataCall(data) {
	ShowDebugView("GetAppDataCall SubType:" + data.SubType);
	//ShowDebugView("GetAppData Data:"+data.Data);
	CfgCallback(data.Data);
}
