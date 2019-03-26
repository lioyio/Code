Vue.component('vueswitch',{
  template: `
<div class="ui-flipswitch ui-corner-all" :class="{'ui-flipswitch-active': data.open}" @click="toggle">
  <div class="ui-flipswitch-on ui-btn"></div>
</div>`,
  name: 'vueswitch',
  props: {
    data: {
      type: Object,
      default: {
        open: 0
      }
    }
  },
  methods: {
    toggle () {
      this.data.open = !this.data.open
    }
  }
})
