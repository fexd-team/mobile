import React from 'react'
import { FileTrayOutline } from '@fexd/icons'
import createFC from '../../helpers/createFC'
import { classnames } from '@fexd/tools'
import { EmptyProps, EmptyRef, EmptyType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-empty'
const Empty = createFC<EmptyProps, EmptyRef>(function Empty(
  { className, icon, text, children, ...props },
  forwardedRef,
) {
  /* 组件逻辑实现 */
  return (
    <div {...props} className={classnames(`${prefix}`, className)} ref={forwardedRef}>
      {icon && <div className={`${prefix}-icon`}>{icon}</div>}
      {text && <div className={`${prefix}-text`}>{text}</div>}
      {children}
    </div>
  )
}) as EmptyType

Empty.defaultProps = {
  icon: <FileTrayOutline />,
  text: 'No Data',
}

export default Empty
