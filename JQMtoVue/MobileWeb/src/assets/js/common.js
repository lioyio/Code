let common = {
  getPagearea () {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
      }
    } else {
      return {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      }
    }
  },
  getElementLeft (element) {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent

    while (current !== null) {
      actualLeft += current.offsetLeft
      current = current.offsetParent
    }

    return actualLeft
  },
  getElementTop (element) {
    let actualTop = element.offsetTop
    let current = element.offsetParent

    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }

    return actualTop
  }
}
export default common
