Vue.component('vueconsole', {
    template: `
    <div class="Console">
        <button v-cloak class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext" @click="toggle"></button>
        <div v-html="show.debugstr"></div>
    </div>`,
    name: 'vueconsole',
    data() {
        return {
            debugstr: ''
        }
    },
    props: {
        show : {
            type: Object,
            default: ()=>{
                return {
                    flag: false,
                    debugstr: ''
                }
            }
        }
    },
    methods: {
        toggle() {
            this.show.flag = !this.show.flag
        }
    }
})