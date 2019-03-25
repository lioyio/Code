Vue.config.devtools = false
let vm = new Vue({
    el: '#app',
    data() {
        return {
            Channel: {
                options: ['通道1', '通道2'],
                selected: 0
            },
            Enable: {
                open: 1
            },
            OverWrite: {
                options: ['1天', '3天', '5天', '7天', '15天', '30天', '60天', '90天'],
                selected: 0
            }
        }
    },
    methods: {
        add() {
            this.Channel.options.push('通道' + (this.Channel.options.length + 1))
        },
        del() {
            this.Channel.options.pop()
        }
    }
})