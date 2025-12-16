import React from 'react'
import { CheckmarkCircle, AlertCircle, CloseCircle, InformationCircle } from '@fexd/icons'
import createFC from '../createFC'
import { classnames } from '@fexd/tools'
import { ResultProps, ResultRef, ResultType, ResultStatus } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-result'

const statusIconMap: Record<ResultStatus, React.ReactNode> = {
  success: <CheckmarkCircle />,
  warning: <AlertCircle />,
  error: <CloseCircle />,
  info: <InformationCircle />,
}

const Result = createFC<ResultProps, ResultRef>(function Result(
  { className, status, icon, title, description, children, ...props },
  forwardedRef,
) {
  /* 组件逻辑实现 */
  // 如果传入了自定义 icon，使用自定义的；否则根据 status 使用内置 icon
  const displayIcon = icon ?? (status ? statusIconMap[status] : undefined)

  return (
    <div {...props} className={classnames(`${prefix}`, status && `${prefix}-${status}`, className)} ref={forwardedRef}>
      {displayIcon && <div className={`${prefix}-icon`}>{displayIcon}</div>}
      {title && <div className={`${prefix}-title`}>{title}</div>}
      {description && <div className={`${prefix}-description`}>{description}</div>}
      {children}
    </div>
  )
}) as ResultType

Result.defaultProps = {}

export default Result
