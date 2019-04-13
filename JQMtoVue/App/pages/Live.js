Vue.component('Live', {
    name: 'Live',
    template: `<div>
                    <table>
                        <tr>
                            <td>
                            <label>{{lg.IDS_CHANNEL}}</label>
                            </td>
                            <td>
                            <vueselect :init='options.Channel' :value='value'></vueselect>
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
                            <vueswitch :data="VueData.ShowName"></vueswitch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_SHOW_TIME}}</label>
                            </td>
                            <td>
                            <vueswitch :data="VueData.ShowTime"></vueswitch>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label>{{lg.IDS_COVERT}}</label>
                            </td>
                            <td>
                            <vueswitch :data="VueData.Covert"></vueswitch>
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
            Data: [],
            value: {
                selected: -1
            },
            VueData: {
                DateFormat: {
                    selected: 0
                },
                TimeFormat: {
                    selected: 0
                },
                FlickerControl: {
                    selected: 0
                },
                ShowName: {
                    checked: 0
                },
                ShowTime: {
                    checked: 0
                },
                Covert: {
                    checked: 0
                }
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
                        if (this.value.selected === -1) {
                            this.value.selected = i
                        }
                        options.push(this.lg.IDS_CH + (i + 1))
                        values.push(i)
                    }
                }
                if (values.length === 0) {
                    this.value.selected = 0
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
            this.options = options
        },
        Call(data) {
            jQuery.extend(true, this.Data, data)
            this.ShowData()
        },
        Get() {
            RfParamCall(this.Call, paramPage.MsgParamModifyLiving, "Get")
        },
        Set() {
            SaveSelChn()
            //dataStr = JSON.stringify(Data)
            RfParamCall(this.Call, paramPage.MsgParamModifyLiving, "Set", this.Data)
        },
        ShowData() {
            let isnull = this.Data[this.value.selected] === undefined
            this.VueData.DateFormat.selected = isnull ? 0 : this.Data[this.value.selected].DateMode
            this.VueData.TimeFormat.selected = isnull ? 0 : this.Data[this.value.selected].TimeMode
            this.VueData.FlickerControl.selected = isnull ? 0 : this.Data[this.value.selected].FlickerCtrl
            this.VueData.ShowName.checked = isnull ? 0 : this.Data[this.value.selected].ChnNameFlag
            this.VueData.ShowTime.checked = isnull ? 0 : this.Data[this.value.selected].RecTimeFlag
            this.VueData.Covert.checked = isnull ? 0 : this.Data[this.value.selected].Covert
        },
        SaveSelChn(oldsel) {
            if (this.Data[oldsel]) {
                this.Data[oldsel].DateMode = this.VueData.DateFormat.selected
                this.Data[oldsel].TimeMode = this.VueData.TimeFormat.selected
                this.Data[oldsel].FlickerCtrl = this.VueData.FlickerControl.selected
                this.Data[oldsel].ChnNameFlag = this.VueData.ShowName.checked
                this.Data[oldsel].RecTimeFlag = this.VueData.ShowTime.checked
                this.Data[oldsel].Covert = this.VueData.Covert.checked
            }
        }
    },
    watch: {
        'value.selected': {
            handler(newsel, oldsel) {
                this.SaveSelChn(oldsel)
                this.ShowData()
            }
        }
    }
})