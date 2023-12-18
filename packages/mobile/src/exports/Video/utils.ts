// import React from 'react'

type OffsetType = {
  left?: number
  top?: number
}

/** 时间转化 */
export const timeTranslate = (seconds: number) => {
  const time = seconds ? seconds : 0
  const m = parseInt((time / 60).toString())
  const s = parseInt((time % 60).toString())

  const min = m < 10 ? '0' + m : m.toString()
  const sec = s < 10 ? '0' + s : s.toString()

  return min + ':' + sec
}

/** 获取当前屏幕下进度条的左偏移量和右偏移量 */
export const getOffset = (node: HTMLElement | null | any, offset?: any): OffsetType => {
  if (!offset) {
    offset = {}
    offset.left = 0
    offset.top = 0
  }

  if (node === document.body || node === null) {
    return offset
  }

  offset.top += node.offsetTop
  offset.left += node.offsetLeft

  return getOffset(node.offsetParent, offset)
}

export const subEventExecuteFun = (domId: string, callBack: (ev: Event) => void) => {
  if (!domId || !callBack) {
    return
  }

  const dom = document.getElementById(domId)

  // console.log(domId, dom)

  if (!dom) {
    return
  }

  ;['touchend', 'click'].forEach((event) => {
    dom.addEventListener(event, (e) => {
      e.stopPropagation()
      e.preventDefault()
      callBack(e)
    })
  })
}
