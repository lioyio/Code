<template>
  <div>
    <button class="ui-btn" @click="Add">Add option</button>
    <button class="ui-btn" @click="Remove">Remove option</button>
    <vueselect :selected="0" :options="options" style="position:absolute;top:100px;left:100px"></vueselect>
  </div>
</template>
<script>
import vueselect from '@/components/vueselect'
export default {
  data () {
    return {
      options: ['CH1', 'CH2']
    }
  },
  components: {
    vueselect: vueselect
  },
  methods: {
    Add () {
      this.options.push('CH' + (this.options.length + 1))
    },
    Remove () {
      this.options.pop()
    }
  }
}
</script>
<style scoped>
</style>
