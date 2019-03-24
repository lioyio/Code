<template>
  <div>
    <button class="ui-btn" @click="Add">Add option</button>
    <button class="ui-btn" @click="Remove">Remove option</button>
    <label class="ui-mobile" id="label1">Channel</label>
    <vueselect :data="data" :label="'label1'" style=""></vueselect>
  </div>
</template>
<script>
import vueselect from '@/components/vueselect'
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
    vueselect: vueselect
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
