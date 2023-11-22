import React, { isValidElement } from 'react'
import { classnames, isString, run } from '@fexd/tools'

import MaterialLabel from '../MaterialLabel'
import createFC from '../../helpers/createFC'
import { MaterialIOLabelProps, MaterialIOLabelRef } from './type'
export const prefix = 'exd-material-io-label'
const MaterialIOLabel = createFC<MaterialIOLabelProps, MaterialIOLabelRef>(function MaterialIOLabel(
  {
    focused,
    prefix: labelPrefix,
    helper: propHelper,
    helperPrefix,
    error: propError,
    placeholder,
    label = placeholder,
    disabled,
    onClick,
    type: propLabelType,
    hideErrorWhenFocusing,
    active,
    children,
    ...props
  },
  ref,
) {
  let helper = propHelper
  let error = propError as any
  const labelType = disabled ? undefined : propLabelType

  if (hideErrorWhenFocusing && focused) {
    error = undefined
  }

  const hasError = Boolean(error)

  // 兼容 error 为 string 类型的情况
  if (hasError && (isValidElement(error) || isString(error))) {
    helper = error
    error = true
  }

  return (
    <MaterialLabel
      {...props}
      onClick={onClick}
      ref={ref}
      className={classnames(`${prefix}__label`, props.className, {
        [`${prefix}__label--disabled`]: disabled,
        [`${prefix}__label--focused`]: focused,
        [`${prefix}__label--active`]: active,
      })}
      label={label}
      placeholder={placeholder}
      active={active}
      helper={
        <>
          {run(helperPrefix, undefined, hasError)}
          <span className={`${prefix}__helper`}>{helper}</span>
        </>
      }
      type={hasError ? 'error' : labelType}
      prefix={
        labelPrefix && (
          <div
            className={classnames(`${prefix}__prefix`, {
              [`${prefix}__prefix--active`]: active,
            })}
          >
            {labelPrefix}
          </div>
        )
      }
    >
      {children}
    </MaterialLabel>
  )
})

MaterialIOLabel.defaultProps = {
  disabled: false,
  type: 'info',
  hideErrorWhenFocusing: true,
}

export default MaterialIOLabel
