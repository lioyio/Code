<template>
  <div>
    <div class="ui-btn" @click="Add">Add option</div>
    <div class="ui-btn" @click="Remove">Remove option</div>
    <table style="width:100%">
      <tr>
        <td style="width:20%">
          <label class="ui-mobile" id="label1">Channel</label>
        </td>
        <td style="width:80%">
          <vueselect :data="Channel" :label="'label1'"></vueselect>
        </td>
      </tr>
      <tr>
        <td style="width:20%">
          <label class="ui-mobile">Enable</label>
        </td>
        <td style="width:80%">
          <vueswitch :data="Enable"></vueswitch>
        </td>
      </tr>
      <tr>
        <td style="width:20%">
          <label class="ui-mobile">Select All</label>
        </td>
        <td style="width:80%">
          <vueswitch :data="SelectAll" :text="'All'" :checkbox="true"></vueswitch>
        </td>
      </tr>
      <tr>
        <td style="width:20%">
          <vueswitch :data="AnalogAll" :pos="'right'" :text="'Analog All'" :checkbox="true"></vueswitch>
        </td>
        <td style="width:80%">
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import vueselect from '@/components/vueselect'
import vueswitch from '@/components/vueswitch'
export default {
  data () {
    return {
      Channel: {
        options: ['CH1', 'CH2'],
        selected: 0
      },
      Enable: {
        checked: 1
      },
      SelectAll: {
        checked: 1
      },
      AnalogAll: {
        checked: 1
      }
    }
  },
  components: {
    vueselect: vueselect,
    vueswitch: vueswitch
  },
  methods: {
    Add () {
      this.Channel.options.push('CH' + (this.Channel.options.length + 1))
    },
    Remove () {
      this.Channel.options.pop()
    }
  }
}
</script>
<style scoped>
</style>
