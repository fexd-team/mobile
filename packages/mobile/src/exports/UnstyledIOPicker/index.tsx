import React, { useState } from 'react'
import { classnames, run, get, isExist } from '@fexd/tools'
import { ChevronForwardSharp } from '@fexd/icons'

import Picker from '../Picker'
import useIOControl from '../useIOControl'
import UnstyledIOLabel from '../UnstyledIOLabel'
import createFC from '../createFC'
import { UnstyledIOPickerProps, UnstyledIOPickerRef } from './type'
import UnstyledLabel from '../UnstyledLabel'
import Button from '../Button'
// 此处不引入 style.less，目的是实现按需引用

// export const prefix = 'exd-unstyled-io-picker'
const UnstyledIOPicker = createFC<UnstyledIOPickerProps, UnstyledIOPickerRef>(function UnstyledIOPicker(
  props,
  forwardedRef,
) {
  const {
    classNamePrefix,
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
    keepHelperPlaceholder,
    hideErrorWhenFocusing,
    onClick,
    theme,
    arrowIcon,
    className,
    style,
    wrapperProps,
    labelProps,
    barProps,
    contentProps,
    placeholderProps,
    prefixProps,
    suffixProps,
    helperProps,
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
  const hasLabelAndPlaceholder = Boolean(label && placeholder) && label !== placeholder
  const active = propActive ?? (focused || hasValue || hasLabelAndPlaceholder)

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
        <UnstyledIOLabel
          {...{
            wrapperProps,
            labelProps,
            barProps,
            contentProps,
            placeholderProps,
            prefixProps,
            suffixProps,
            helperProps,
          }}
          theme={theme}
          className={classnames(className, {
            [`${classNamePrefix}__disabled`]: disabled,
          })}
          style={style}
          active={active}
          focused={focused}
          disabled={disabled}
          label={label}
          placeholder={!hasValue ? placeholder : null}
          helper={helper}
          error={error}
          type={labelType}
          keepHelperPlaceholder={keepHelperPlaceholder}
          hideErrorWhenFocusing={hideErrorWhenFocusing}
          prefix={labelPrefix}
          onClick={onClick}
          suffix={(() => {
            // if (disabled) {
            //   return null
            // }
            if (suffix) {
              return suffix
            }

            return <div className={`${classNamePrefix}__arrow`}>{arrowIcon}</div>
          })()}
        >
          <div className={`${classNamePrefix}__value`}>{selectedLabel}</div>
        </UnstyledIOLabel>
      )}
    </Picker>
  )
})

UnstyledIOPicker.defaultProps = {
  ...Picker.defaultProps,
  labelType: 'info',
  disabled: false,
  clearable: true,
  autoHeight: false,
  theme: UnstyledLabel,
  classNamePrefix: 'exd-unstyled-io-picker',
  arrowIcon: <ChevronForwardSharp />,
}

export default UnstyledIOPicker
