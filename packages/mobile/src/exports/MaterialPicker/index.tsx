import React, { useState } from 'react'
import { classnames, run, get, isExist } from '@fexd/tools'
import { ChevronForward } from '@fexd/icons'

import Picker from '../Picker'
import useIOControl from '../useIOControl'
import MaterialIOLabel from '../MaterialIOLabel'
import createFC from '../../helpers/createFC'
import { MaterialPickerProps, MaterialPickerRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-material-picker'
const MaterialPicker = createFC<MaterialPickerProps, MaterialPickerRef>(function MaterialPicker(props, forwardedRef) {
  const {
    active: propActive,
    options = [],
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
    ...restProps
  } = props
  const [focused, setFocused] = useState(false)
  const getItem = (value: any) =>
    isExist(value) ? options.find((item: any) => String(item.value) === String(value)) : undefined
  const { value, setValue } = useIOControl({
    ...props,
    onChange: (value) => run(restProps, 'onChange', value, getItem(value)),
  })
  const selectedItem = getItem(value)
  const hasValue = !!selectedItem
  const active = propActive ?? (focused || hasValue)

  return (
    <Picker
      {...restProps}
      options={options}
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
      {(selectedLabel) => (
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
          <div className={`${prefix}__value`}>{selectedLabel}</div>
        </MaterialIOLabel>
      )}
    </Picker>
  )
})

MaterialPicker.defaultProps = {
  labelType: 'info',
  disabled: false,
  clearable: true,
}

export default MaterialPicker
