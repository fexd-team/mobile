import React, { isValidElement } from 'react'
import { classnames, isString, run } from '@fexd/tools'

import LineLabel from '../LineLabel'
import createFC from '../../helpers/createFC'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from './type'
import UnstyledLabel from '../UnstyledLabel'

export const prefix = 'exd-io-label'
const UnstyledIOLabel = createFC<UnstyledIOLabelProps, UnstyledIOLabelRef>(function UnstyledIOLabel(
  {
    theme,
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
  const ThemedLabel = theme as typeof UnstyledLabel
  let helper = propHelper
  let error = propError as any

  if (hideErrorWhenFocusing && focused) {
    error = undefined
  }

  const hasError = Boolean(error)
  const labelType = hasError ? 'error' : disabled ? undefined : propLabelType

  // 兼容 error 为 string 类型的情况
  if (hasError && (isValidElement(error) || isString(error))) {
    helper = error
    error = true
  }

  return (
    <ThemedLabel
      {...props}
      onClick={onClick}
      ref={ref as any}
      disabled={disabled}
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
          <div className={`${prefix}__helper`}>{run(helper)}</div>
        </>
      }
      type={labelType}
      prefix={
        labelPrefix && (
          <div
            className={classnames(`${prefix}__prefix`, {
              [`${prefix}__prefix--active`]: active,
            })}
          >
            {run(labelPrefix)}
          </div>
        )
      }
    >
      {run(children)}
    </ThemedLabel>
  )
})

UnstyledIOLabel.defaultProps = {
  disabled: false,
  type: 'info',
  hideErrorWhenFocusing: true,
  theme: UnstyledLabel,
}

export default UnstyledIOLabel
