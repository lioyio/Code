let common = {
  getPagearea () {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
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
if(!Array.from){
  Array.from = (iterable) => {
      // IE(包括IE11)没有这个方法,用[].slice.call(new Uint8Array..代替
      let arr = new Array()
      for(let i = 0;i < iterable.length;++i){
        arr.push(iterable[i])
      }
      return arr
  }
}