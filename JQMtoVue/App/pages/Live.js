Vue.component('Live', {
    name: 'Live',
    template: `<div>
                    <table>
                        <tr>
                            <td>
                            <label>{{lg.IDS_CHANNEL}}</label>
                            </td>
                            <td>
                            <vueselect :init='options.Channel' :value='VueData.Channel'></vueselect>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_DATE_FORMAT}}</label>
                            </td>
                            <td>
                            <vueselect :init='options.DateFormat' :value='VueData.DateFormat'></vueselect>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_TIME_FORMAT}}</label>
                            </td>
                            <td>
                            <vueselect :init='options.TimeFormat' :value='VueData.TimeFormat'></vueselect>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_FLICKER_CONTROL}}</label>
                            </td>
                            <td>
                            <vueselect :init='options.FlickerControl' :value='VueData.FlickerControl'></vueselect>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_SHOW_NAME}}</label>
                            </td>
                            <td>
                            <vueswitch></vueswitch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_SHOW_TIME}}</label>
                            </td>
                            <td>
                            <vueswitch></vueswitch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_COVERT}}</label>
                            </td>
                            <td>
                            <vueswitch></vueswitch>
                            </td>
                        </tr>
                    </table>
                </div>`,
    props: {
        gDevice: Object,
        gVar: Object,
        lg: Array
    },
    data() {
        return {
            Data: {},
            selected: -1,
            VueData: {
                Channel: {
                    selected: this.selected
                },
                DateFormat: {
                    selected: 0
                },
                TimeFormat: {
                    selected: 0
                },
                FlickerControl: {
                    selected: 0
                }
            },
            options: {

            }
        }
    },
    created() {
        this.Init()
        this.Get()
    },
    methods: {
        Init() {
            let options = {}
            options.Channel = (() => {
                let options = []
                let values = []
                for (let i = 0; i < this.gDevice.loginRsp.ChannelNum; ++i) {
                    if (this.gDevice.isOnline(i)) {
                        if (this.selected === -1) {
                            this.selected = i
                        }
                        options.push(this.lg.IDS_CH + (i + 1))
                        values.push(i)
                    }
                }
                if (values.length === 0) {
                    this.selected = 0
                    values = [0]
                    options = ['　']
                }
                return {
                    options,
                    values
                }
            })()
            options.DateFormat = (() => {
                let options = [this.lg.IDS_DATEFORMAT_0, this.lg.IDS_DATEFORMAT_1, this.lg.IDS_DATEFORMAT_2]
                let values = [0, 1, 2]
                return {
                    options,
                    values
                }
            })()
            options.TimeFormat = (() => {
                let options = [24 + this.lg.IDS_HOUR, 12 + this.lg.IDS_HOUR]
                let values = [0, 1]
                return {
                    options,
                    values
                }
            })()
            options.FlickerControl = (() => {
                let options = [this.lg.IDS_FLICKERCONTROL_0, this.lg.IDS_FLICKERCONTROL_1]
                let values = [0, 1]
                return {
                    options,
                    values
                }
            })()
            this.options = options;
            this.ShowData()
        },
        Call(data) {
            jQuery.extend(true, this.Data, data);
            this.ShowData();
        },
        Get() {
            RfParamCall(this.Call, paramPage.MsgParamModifyLiving, "Get");
        },
        Set() {
            SaveSelChn();
            //dataStr = JSON.stringify(Data);
            //RfParamCall(this.Call, paramPage.MsgParamModifyLiving, "Set", Data);
        },
        ShowData() {
            this.VueData.Channel = {
                selected: this.selected
            }
            this.VueData.DateFormat = {
                selected: this.Data[this.selected] === undefined ? 0 : this.Data[this.selected].DateMode
            }
            this.VueData.TimeFormat = {
                selected: this.Data[this.selected] === undefined ? 0 : this.Data[this.selected].TimeMode
            }
            this.VueData.FlickerControl = {
                selected: this.Data[this.selected] === undefined ? 0 : this.Data[this.selected].FlickerCtrl
            }
        },
        SaveSelChn() {

        }
    },
    computed: {

    }
})