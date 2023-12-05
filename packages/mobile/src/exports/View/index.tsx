import React from 'react'
import { classnames } from '@fexd/tools'

import createFC from '../createFC'
import { ViewProps, ViewRef, ViewType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-view'
const View = createFC<ViewProps, ViewRef>(function View(
  { children, className, auto, direction, width, height, style = {}, center, ...props },
  ref,
) {
  /* 组件逻辑实现 */
  return (
    <div
      {...props}
      className={classnames(prefix, className, {
        [`${prefix}-auto`]: auto,
        [`${prefix}-horizontal`]: center === 'horizontal' || center === true,
        [`${prefix}-vertical`]: center === 'vertical' || center === true,
        [`${prefix}-${direction}`]: !!direction,
      })}
      style={{
        ...style,
        width,
        height,
      }}
      ref={ref}
    >
      {children}
    </div>
  )
})

View.defaultProps = {
  direction: 'column',
  auto: true,
}

export default View
