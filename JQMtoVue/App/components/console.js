Vue.component('vuesmartconsole', {
    render(createElement) {
        if (jQuery.isPlainObject(this.data)) {
            let obj = []
            if (this.root) {
                obj.push(createElement('span', 'Object'))
            }
            for (let item in this.data) {
                let items = [
                    createElement('span', {
                        attrs: {
                            style: 'color:purple'
                        }
                    }, item),
                    createElement('span', ':')]
                if (jQuery.isPlainObject(this.data[item])) {
                    items.push('Object')
                }
                if (jQuery.isArray(this.data[item])) {
                    items.push('Array(' + this.data[item].length + ')')
                }
                items.push(createElement('vuesmartconsole', {
                    props: {
                        data: this.data[item]
                    }
                }))
                if (!jQuery.isArray(this.data[item]) &&
                    !jQuery.isPlainObject(this.data[item]) &&
                    obj.length !== Object.keys(this.data).length - 1) {
                    items.push(createElement('br'))
                }
                obj.push(createElement('p', items))
            }
            return createElement('div', {
                style: {
                    marginLeft: '.5em'
                }
            }, obj)
        }
        if (jQuery.isArray(this.data)) {
            let arr = []
            if (this.root) {
                arr.push(createElement('span', 'Array(' + this.data.length + ')'))
            }
            this.data.map((val, index) => {
                let items = [
                    createElement('span', {
                        attrs: {
                            style: 'color:purple'
                        }
                    }, index),
                    createElement('span', ':')]
                if (jQuery.isPlainObject(val)) {
                    items.push('Object')
                }
                if (jQuery.isArray(val)) {
                    items.push('Array(' + val.length + ')')
                }
                items.push(createElement('vuesmartconsole', {
                    props: {
                        data: val
                    }
                }))
                if (!jQuery.isPlainObject(val) &&
                    !jQuery.isArray(val) &&
                    index !== (this.data.length - 1)) {
                    items.push(createElement('br'))
                }
                arr.push(createElement('p', items))
            })
            return createElement('div', {
                style: {
                    marginLeft: '.5em'
                },
            }, arr)
        }
        let color = 'black'
        switch (typeof this.data) {
            case 'string':
                color = 'darkred'
                break
            case 'number':
                color = 'blue'
                break
            case 'boolean':
            case 'undefined':
            case 'object'://null
                color = 'purple'
                break
        }
        return createElement('span', {
            style: {
                color
            }
        }, this.data === undefined ? 'undefined' : JSON.stringify(this.data))
    },
    props: ['data', 'root'],
    data() {
        return {
            fold: true
        }
    },
    methods: {
        toggle() {
            this.fold = !this.fold
        }
    }
})

// Vue.component('vueobject', {
//     template: `
//         <div>
//             <div ></div>
//         </div>`,
//     name: 'vueobject',
//     props: {},
//     methods: {}
// })

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
        show: {
            type: Object,
            default: () => {
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