import React from 'react'
import { FileTrayOutline } from '@fexd/icons'
import createFC from '../createFC'
import { classnames } from '@fexd/tools'
import Result from '../Result'
import { EmptyProps, EmptyRef, EmptyType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-empty'
const Empty = createFC<EmptyProps, EmptyRef>(function Empty(
  { className, icon, text, children, ...props },
  forwardedRef,
) {
  /* 组件逻辑实现 */
  return (
    <Result {...props} className={classnames(`${prefix}`, className)} ref={forwardedRef} icon={icon} title={text}>
      {children}
    </Result>
  )
}) as EmptyType

Empty.defaultProps = {
  icon: <FileTrayOutline />,
  text: 'No Data',
}

export default Empty
