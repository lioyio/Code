Vue.component('vueswitch',{
	template: `
<div :class="{'ui-checkbox ui-mini':checkbox,'ui-flipswitch ui-corner-all':!checkbox,'ui-flipswitch-active': data.checked&&!checkbox}" @click="toggle">
    <label v-if="checkbox" class="ui-btn ui-corner-all" :class="{'ui-notext':text==='','ui-checkbox-on':data.checked,'ui-checkbox-off':!data.checked,'ui-btn-icon-left':pos!=='right','ui-btn-icon-right':pos==='right'}">{{text}}</label>
    <div v-if="!checkbox" class="ui-flipswitch-on ui-btn"></div>
</div>`,
  name: 'vueswitch',
  props: {
    checkbox: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'left'
    },
    text: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default () {
        return {
          checked: 0
        }
      }
    }
  },
  methods: {
    toggle () {
      this.data.checked = !this.data.checked
    }
  },
  computed: {
    align () {
      return this.textalign
    }
  }
})
