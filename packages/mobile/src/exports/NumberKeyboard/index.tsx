import React from 'react'
import createFC from '../createFC'
import { NumberKeyboardProps, NumberKeyboardRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-number-keyboard'
const NumberKeyboard = createFC<NumberKeyboardProps, NumberKeyboardRef>(function NumberKeyboard(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      NumberKeyboard
    </div>
  )
})

NumberKeyboard.defaultProps = {}

export default NumberKeyboard
