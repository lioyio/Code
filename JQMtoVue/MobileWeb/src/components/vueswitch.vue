<template>
  <div class="ui-flipswitch ui-corner-all" :class="{'ui-flipswitch-active': data.open}" @click="toggle">
    <div class="ui-flipswitch-on ui-btn"></div>
  </div>
</template>

<script>
export default {
  name: 'vueswitch',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          open: 0
        }
      }
    }
  },
  methods: {
    toggle () {
      this.data.open = !this.data.open
    }
  }
}
</script>
