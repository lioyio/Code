function DebugInit() {
    if (gVar.bDebug) {
        debugvm = new Vue({
            el: '#debug',
            data: {
                showConsole: {
                    flag: false,
                    data: []
                }
            },
            methods: {
                toggle() {
                    this.showConsole.flag = !this.showConsole.flag
                },
                ShowDebugView(item) {
                    this.showConsole.data.push(item)
                },
                ClearDebugView() {
                    this.showConsole.data = [];
                }
            }
        })
        jQuery('.AppHeader .debug').show();
        FakeData();
    }
}

function FakeData() {
    gDevice.loginRsp.ChannelNum = 20;
    gDevice.loginRsp.AnalogChNum = 8;
    gDevice.loginRsp.AlarmInNum = 16;
    gDevice.loginRsp.AlarmOutNum = 16;
    gDevice.loginRsp.PageControl2 = 0xffffffff;
    for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
        gDevice.devState[i] = {};
        if (i % 2) {
            gDevice.devState[i].CurChnState = 2; //default
        } else {
            gDevice.devState[i].CurChnState = -1; //default
        }
    }
}