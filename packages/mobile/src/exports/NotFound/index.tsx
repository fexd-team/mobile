import React from 'react'
import { classnames } from '@fexd/tools'
import { WarningOutline } from '@fexd/icons'

import createFC from '../../helpers/createFC'
import Empty from '../Empty'
import { NotFoundProps, NotFoundRef, NotFoundType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-not-found'
const NotFound = createFC<NotFoundProps, NotFoundRef>(function NotFound({ className, ...props }, forwardedRef) {
  /* 组件逻辑实现 */
  return <Empty className={classnames(prefix, className)} ref={forwardedRef} {...props} />
}) as NotFoundType

NotFound.defaultProps = {
  icon: <WarningOutline />,
  text: '404 Not Found',
}

export default NotFound
