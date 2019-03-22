<template>
  <div class="ui-select">
    <div class="ui-mini ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all"
      @click="pop($event)" :class="{'ui-btn-active': isactive}" @mousedown="mousedown" @mouseup="mouseup" @mouseleave="mouseup">
      <div>{{ options[selected] }}</div>
    </div>
    <div v-show="options.length != 0 && ispop" class="overlayMask" @mouseup="hide"></div>
    <ul v-show="options.length != 0 && ispop" class="ui-selectmenu ui-selectmenu-list ui-listview ui-corner-all" :style="optionBoxPos">
      <li @click="select($event)" :value="key" :class="{'ui-first-child': key === 0, 'ui-last-child': key === (options.length - 1)}" v-for="(item, key) in options" :key="key">
        <div class="ui-btn" :class="{'ui-btn-active':key === selected}">{{item}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import common from '@/assets/js/common.js'
export default {
  name: 'vueselect',
  data () {
    return {
      oldoptions: [],
      ispop: false,
      isactive: false,
      poptarget: undefined,
      optionBoxPos: {
        top: 0,
        left: 0
      }
    }
  },
  props: {
    options: {
      type: Array,
      default: () => [' '],
      required: true
    },
    selected: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    pop (event) {
      this.ispop = true
      this.poptarget = event.currentTarget
    },
    hide () {
      this.ispop = false
    },
    mousedown () {
      this.isactive = true
    },
    mouseup () {
      this.isactive = false
    },
    select (event) {
      this.selected = event.currentTarget.value * 1
      this.ispop = false
    }
  },
  beforeUpdate () {
    if (this.oldoptions.toString() !== this.options.toString()) {
      if (this.selected > this.options.length - 1) {
        this.selected = 0
      }
    }
  },
  updated () {
    if (this.poptarget !== undefined && this.oldoptions.toString() !== this.options.toString()) {
      let obj = this.poptarget.nextElementSibling.nextElementSibling
      if (obj.style.display === 'none') {
        return
      }
      this.oldoptions = this.options.slice()
      let targettop = common.getElementTop(this.poptarget)
      let targetleft = common.getElementLeft(this.poptarget)
      let top = (this.poptarget.offsetHeight - obj.offsetHeight) / 2
      let left = (this.poptarget.offsetWidth - obj.offsetWidth) / 2
      let maxtop = common.getPagearea().height - obj.offsetHeight - 16
      let maxleft = common.getPagearea().width - obj.offsetWidth - 16
      this.optionBoxPos = {
        top: (top + targettop) <= 16 ? (16 - targettop) + 'px'
          : ((top + targettop) > maxtop ? (maxtop - targettop) + 'px' : top + 'px'),
        left: (left + targetleft) <= 16 ? (16 - targetleft) + 'px'
          : ((left + targetleft) > maxleft ? (maxleft - targetleft) + 'px' : left + 'px')
      }
    }
  }
}
</script>
