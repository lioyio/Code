Vue.component('vueconsole', {
    template: `
        <div class="root" v-if="isObject(data) || isArray(data)" v-show="!foldcontrol.flag">
            <span v-if="isObject(data) && root">Object</span>
            <span v-else-if="isArray(data) && root">{{'Array('+data.length+')'}}</span>
            <div v-for="(item,index,key) in data" :key="index">
                <span style="color:rgb(136,19,145)">{{index}}</span>
                <span>:</span>
                <span v-if="isObject(item)">Object<button :index="index" @click="toggle($event)">{{getFoldControl(index).flag?'+':'-'}}</button></span>
                <span v-else-if="isArray(item)">{{'Array('+item.length+')'}}<button :index="index" @click="toggle($event)">{{getFoldControl(index).flag?'+':'-'}}</button></span>
                
                <vueconsole :data="item" :foldcontrol="getFoldControl(index)"></vueconsole>
            </div>
        </div>
        <span v-else :style="fontColor">{{data === undefined?'undefined':JSON.stringify(data)}}</span>
        `,
    name: 'vueconsole',
    props: {
        data: {},
        foldcontrol: {
            type: Object,
            default() {
                return {
                    flag: false
                }
            }
        },
        root: {}
    },

    data() {
        if (this.isObject(this.data)) {
            let foldArr = {}
            Object.keys(this.data).map((key) => {
                foldArr[key] = { flag: true }
            })
            return {
                foldarr: foldArr
            }
        } else if (this.isArray(this.data)) {
            return {
                foldarr: Array.apply(null, { length: this.data.length }).map(function () {
                    return { flag: true }
                })
            }
        }
        return {
            flag: true
        }
    },
    computed: {
        fontColor() {
            let color = 'black'
            switch (typeof this.data) {
                case 'string':
                    color = 'rgb(196,26,22)'
                    break
                case 'number':
                case 'boolean':
                    color = 'rgb(28,0,207)'
                    break
                case 'undefined':
                case 'object'://null
                    color = 'gray'
                    break
            }
            return { color }
        }
    },
    methods: {
        isObject(obj) {
            return jQuery.isPlainObject(obj)
        },
        isArray(arr) {
            return jQuery.isArray(arr)
        },
        toggle(event) {
            let index = jQuery(event.currentTarget).attr('index')
            this.foldarr[index].flag = !this.foldarr[index].flag
        },
        getFoldControl(index) {
            return this.isObject(this.data) || this.isArray(this.data) ? this.foldarr[index] : this.foldarr
        }
    }
})