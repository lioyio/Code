<template>
  <div>
    <table>
      <tr>
        <td>
          <label>{{lg['IDS_CHANNEL']}}</label>
        </td>
        <td>
          <vueselect :data='Channel'></vueselect>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import vueselect from '@/components/vueselect.vue'
import vueswitch from '@/components/vueswitch.vue'
import {} from '@/assets/css/main.css'
export default {
  name: 'Live',
  data () {
    return {
      lg: {
        IDS_CHANNEL: 'Channel',
        IDS_CH: 'CH'
      }
    }
  },
  computed: {
    Channel () {
      return {
        options: [this.lg['IDS_CH'] + 0, this.lg['IDS_CH'] + 1],
        selected: 0
      }
    }
  },
  components: {
    vueselect: vueselect,
    vueswitch: vueswitch
  }
}
</script>

<style>
</style>
