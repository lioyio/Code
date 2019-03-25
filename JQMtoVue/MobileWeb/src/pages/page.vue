<template>
  <div>
    <button class="ui-btn" @click="Add">Add option</button>
    <button class="ui-btn" @click="Remove">Remove option</button>
    <label class="ui-mobile" id="label1">Channel</label>
    <vueselect :data="data" :label="'label1'" style=""></vueselect>
    <vueswitch ></vueswitch>
  </div>
</template>
<script>
import vueselect from '@/components/vueselect'
import vueswitch from '@/components/vueswitch'
export default {
  data () {
    return {
      data: {
        options: ['CH1', 'CH2'],
        selected: 0
      }
    }
  },
  components: {
    vueselect: vueselect,
    vueswitch: vueswitch
  },
  methods: {
    Add () {
      this.data.options.push('CH' + (this.data.options.length + 1))
    },
    Remove () {
      this.data.options.pop()
    }
  }
}
</script>
<style scoped>
</style>
