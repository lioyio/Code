$(document).ready(() => {
    vm = new Vue({
        el: '#app',
        router: new VueRouter({
            routes: [
                {path: '/', component: {template:'<Live/>'}}
            ]
        }),
        data() {
            return {
                debugstr: '',
                gDevice: new DeviceInfo(),
                gVar: gVar,

            }
        },
        methods: {
            ShowDebugView(str) {
                this.debugstr += '<p>' + str + '</p>'
            },
            JSSendMessageToApp(data) {
                JSSendMessageToApp(data, this.gVar.webType)
            },
            JSSendMessageToWeb(data) {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    this.ShowDebugView('########################');
                    this.ShowDebugView('<span style="color:red">' + e.message + '</span>');
                    this.ShowDebugView(data);
                    this.ShowDebugView('########################');
                    this.HideLoader();
                    //ShowErrorTips(lg.IDS_DATA_PARSE_ERROR);
                    return "";
                }
                let ret = "";
                switch (data.Type) {
                    case "Init":
                        ret = this.GetInitDataCall(data);
                        break;
                        // case "Get": //APP提供网页数据
                        //     if(!gVar.bNoHideLoader) {
                        //         HideLoader();
                        //     }
                        //     if(data.Data==="Error") {
                        //         gVar.bRefreshSuc = false;
                        //         ShowTips(lg.IDS_REFRESH_FAILED);
                        //     } else {
                        //         if(!gVar.bNoTips) {
                        //             ShowTips(lg.IDS_REFRESH_SUCCESS);
                        //         }
                        //         try {
                        //             GetAppDataCall(data);
                        //             gVar.bRefreshSuc = true;
                        //         } catch(e) {
                        //             gVar.bRefreshSuc = false;
                        //             HideLoader();
                        //             ShowTips(lg.IDS_DATA_PARSE_ERROR);
                        //             return "";
                        //         }

                        //     }
                        //     break;
                        // case "Set": //网页保存数据返回
                        //     HideLoader();
                        //     if(!gVar.bNoTips) {
                        //         if(data.Data==="Success") {
                        //             ShowTips(lg.IDS_SAVE_SUCCESS);
                        //         } else {
                        //             ShowTips(lg.IDS_SAVE_FAILED);
                        //         }
                        //     }else{
                        //         gVar.bNoTips = false;
                        //     }
                        //     //ShowDebugView(data.Data);
                        //     break;
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
                        //     $("input").blur();
                        //     break;
                }
                return ret;
            },
            HideLoader() {
                this.JSSendMessageToApp(JSON.stringify({
                    Type: 'HideWaitView'
                }));
            },
            ShowLoader() {
                this.JSSendMessageToApp(JSON.stringify({
                    Type: 'ShowWaitView'
                }))
            },
            GetInitDataCall(data) {
                if (data.Data["Device"] === undefined)
                    this.ShowDebugView('Init:No Device')
                else {
                    this.gVar.webType = data.Data["Device"]
                }
                if (data.Data["LoginRsp"] === undefined)
                    this.ShowDebugView('Init:No LoginRsp')
                else {
                    this.gDevice.setLoginRsp(data.Data["LoginRsp"])
                    if (this.gDevice.loginRsp.HighType === 0x52530305 && this.gDevice.loginRsp.LowType === 0x2120901) {
                        this.gVar.bC23_wireless = true
                    }
                }
                if (!this.gDevice.isDevType(devTypeEnum.DEV_IPC) && !this.gDevice.isDevType(devTypeEnum.DEV_DVR)) {
                    if (data.Data["MsgRemoteCHStatusReq"] === undefined)
                        this.ShowDebugView('Init:No MsgRemoteCHStatusReq')
                    else {
                        $.extend(true, this.gDevice.devState, data.Data["MsgRemoteCHStatusReq"])
                    }
                }
                if (!this.gDevice.isDevType(devTypeEnum.DEV_DVR)) {
                    if (data.Data["MsgDevAllStatusReq"] === undefined)
                        this.ShowDebugView('Init:No MsgDevAllStatusReq')
                    else {
                        this.gDevice.setDevAllStatusRpt(data.Data["MsgDevAllStatusReq"])
                    }
                }
                if (data.Data["Customer"] === undefined)
                    this.ShowDebugView('Init:No Customer')
                else {
                    this.gVar.customer = data.Data["Customer"]
                }
                if (data.Data["Password"] === undefined)
                    this.ShowDebugView('Init: No Password')
                else {
                    this.gDevice.password = data.Data["Password"]
                }
                config()
                if (data.Data["pageIndex"] === undefined)
                    this.ShowDebugView('Init:No pageIndex')
                else {
                    this.LoadRemoteSettingPage(data.Data["pageIndex"])
                }
                return 'Init recived'
            },
            LoadRemoteSettingPage(pagename) {
                if (pagename === "") {
                    return;
                } else if (this.gVar.curPage === pagename) {
                    this.ShowLoader()
                    //GetParamCall()
                    return;
                }
                this.ShowLoader()
                this.gVar.curPage = pagename
                this.ShowDebugView(pagename)
                this.$router.replace('/' + pagename)
                // this.gVar.GetJS({
                //     webUrl: '../pages/Live.js',
                //     callback: function() {
                //         vm.ShowDebugView(2222)
                //         this.$router.addRoutes([{
                //             path: '/' + pagename, component: Live
                //         }])
                //         this.$router.replace('/' + pagename)
                //     }
                // })
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
        }
    })
})