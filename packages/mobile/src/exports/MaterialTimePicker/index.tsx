import React, { useState } from 'react'
import { classnames, run, get } from '@fexd/tools'
import { ChevronForward } from '@fexd/icons'
import dayjs from 'dayjs'

import TimePicker from '../TimePicker'
import useIOControl from '../useIOControl'
import MaterialIOLabel from '../MaterialIOLabel'
import createFC from '../../helpers/createFC'
import { MaterialTimePickerProps, MaterialTimePickerRef, MaterialTimePickerType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-material-date-picker'
const MaterialTimePicker = createFC<MaterialTimePickerProps, MaterialTimePickerRef>(function MaterialTimePicker(
  props,
  forwardedRef,
) {
  const {
    active: propActive,
    placeholder,
    label = placeholder,
    prefix: labelPrefix,
    suffix,
    helper,
    error,
    disabled,
    labelType,
    hideErrorWhenFocusing,
    onClick,
    format,
    ...restProps
  } = props
  const [focused, setFocused] = useState(false)
  const { value, setValue } = useIOControl(props)
  const hasValue = !!value
  const active = propActive ?? (focused || hasValue)

  return (
    <TimePicker
      {...restProps}
      value={value}
      disabled={disabled}
      onEnter={(...args) => {
        setFocused(true)
        run(restProps.onEnter, undefined, ...args)
      }}
      onExited={(...args) => {
        setFocused(false)
        run(restProps.onExited, undefined, ...args)
      }}
      onChange={setValue}
      ref={forwardedRef}
    >
      {(value) => (
        <MaterialIOLabel
          className={classnames(restProps.className, {
            [`${prefix}__disabled`]: disabled,
          })}
          active={active}
          focused={focused}
          disabled={disabled}
          label={label}
          placeholder={!hasValue ? placeholder : null}
          helper={helper}
          error={error}
          type={labelType}
          hideErrorWhenFocusing={hideErrorWhenFocusing}
          prefix={labelPrefix}
          onClick={onClick}
          suffix={(() => {
            if (disabled) {
              return null
            }
            if (suffix) {
              return suffix
            }
            return <ChevronForward className={`${prefix}__arrow`} />
          })()}
        >
          <div className={`${prefix}__value`}>{value ? dayjs(value).format(format) : ''}</div>
        </MaterialIOLabel>
      )}
    </TimePicker>
  )
}) as MaterialTimePickerType

MaterialTimePicker.defaultProps = {
  format: 'HH:mm:ss',
}

export default MaterialTimePicker
