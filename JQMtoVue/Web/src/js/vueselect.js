Vue.component('vueselect',{
	template: `
<div class="ui-select">
  <div style="position:relative !important;" :class="{'popup':ispop}">
    <div class="ui-mini ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all"
      @click="pop($event)" :class="{'ui-btn-active': isactive}" @mousedown="mousedown" @mouseup="mouseup" @mouseleave="mouseup">
      <a>{{ options[data.selected] }}</a>
    </div>
    <div v-show="options.length != 0 && ispop" class="overlayMask" :class="{'fullscreen':isFullScreen}" @click="!isFullScreen?hide():''"></div>
    <ul v-show="options.length != 0 && ispop" class="ui-selectmenu ui-selectmenu-list ui-listview ui-corner-all" style="position:absolute !important;overflow:auto;" :style="optionBoxPos">
      <div v-if="isFullScreen" class="ui-header ui-first-child">
        <div class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" @click="hide"></div>
        <div class="ui-title">{{ title() }}</div>
      </div>
      <li @click="select($event)" :value="key" :class="{'ui-first-child': key === 0 && !isFullScreen, 'ui-last-child': key === (options.length - 1)}" v-for="(item, key) in options" :key="key">
        <div class="ui-btn" :class="{'ui-btn-active':key === data.selected}">{{item}}</div>
      </li>
    </ul>
  </div>
</div>`,
  data () {
    return {
      oldoptions: [],
      ispop: false,
      isactive: false,
      poptarget: undefined,
      isFullScreen: false,
      optionBoxPos: {
        top: 0,
        left: 0
      },
      poptargetPos: JSON.stringify({
        top: 0,
        left: 0,
        offsetHeight: 0,
        offsetWidth: 0
      }),
      objPos: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    options () {
      return this.data.options
    }
  },
  props: {
    label: {
      type: String,
      default: () => {
        return ''
      }
    },
    data: {
      type: Object,
      default: () => {
        return {
          options: [' '],
          selected: 0
        }
      },
      required: true
    }
  },
  methods: {
    newPoptargetPos () {
      return {
        top: common.getElementTop(this.poptarget),
        left: common.getElementLeft(this.poptarget),
        offsetHeight: this.poptarget.offsetHeight,
        offsetWidth: this.poptarget.offsetWidth
      }
    },
    title () {
      return this.label === '' ? ' ' : document.getElementById(this.label).innerText
    },
    pop (event) {
      if (this.options.length === 0) {
        return
      }
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
      this.data.selected = event.currentTarget.value * 1
      this.ispop = false
    },
    listSize (obj) {
      let objarr = Array.from(obj.children)
      if (objarr.length !== this.options.length) {
        objarr.shift()
      }
      return {
        width: obj.offsetWidth,
        height: objarr.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.offsetHeight
        }, 0)
      }
    },
    relocate (obj) {
      let listSize = this.listSize(obj)
      let pageArea = common.getPagearea()
      if (JSON.stringify(this.objPos) !== JSON.stringify(listSize)) {
        if (this.objPos.width === 0 || this.objPos.width === pageArea.width - 32 || listSize.width !== pageArea.width - 32) {
          this.objPos = JSON.parse(JSON.stringify(listSize))
        }
      }
      let newPoptargetPos = this.newPoptargetPos()
      let top = (newPoptargetPos.offsetHeight - listSize.height) / 2
      let left = (newPoptargetPos.offsetWidth - this.objPos.width) / 2
      let right = 'auto'
      let bottom = 'auto'
      let position = 'absolute !important'
      let maxtop = pageArea.height - listSize.height - 16
      let maxleft = pageArea.width - this.objPos.width - 16
      top = (top + newPoptargetPos.top) <= 16 ? (16 - newPoptargetPos.top)
        : ((top + newPoptargetPos.top) > maxtop ? (maxtop - newPoptargetPos.top) : top)
      left = (left + newPoptargetPos.left) <= 16 ? (16 - newPoptargetPos.left)
        : ((left + newPoptargetPos.left) > maxleft ? (maxleft - newPoptargetPos.left) : left)
      if (left + this.objPos.width + newPoptargetPos.left >= pageArea.width - 32) {
        right = '16px'
      }
      if (top + listSize.height + newPoptargetPos.top >= pageArea.height - 32) {
        position = 'fixed !important'
        top = 16
        left = 16
        right = '16px'
        bottom = '16px'
        this.isFullScreen = true
      } else {
        this.isFullScreen = false
      }
      return {
        top: top + 'px',
        left: left + 'px',
        right: right,
        bottom: bottom,
        position: position
      }
    }
  },
  beforeUpdate () {
    if (this.oldoptions.toString() !== this.options.toString()) {
      if (this.data.selected > this.options.length - 1) {
        this.data.selected = 0
      }
    }
  },
  updated () {
    // this.poptarget作为定位目标,判断options和目标位置发生修改才重新定位，避免发生死循环
    if (this.poptarget !== undefined &&
      (this.oldoptions.toString() !== this.options.toString() ||
        JSON.stringify(this.newPoptargetPos()) !== this.poptargetPos)) {
      let obj = this.poptarget.nextElementSibling.nextElementSibling
      if (obj.style.display === 'none') {
        return
      }
      this.oldoptions = this.options.slice()
      this.poptargetPos = JSON.stringify(this.newPoptargetPos())
      this.optionBoxPos = this.relocate(obj)
    }
  }
})
