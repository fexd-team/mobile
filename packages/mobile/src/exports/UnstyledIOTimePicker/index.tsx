import React, { useState } from 'react'
import { classnames, run, get } from '@fexd/tools'
import { ChevronForwardSharp } from '@fexd/icons'
import dayjs from 'dayjs'

import TimePicker from '../TimePicker'
import useIOControl from '../useIOControl'
import UnstyledIOLabel from '../UnstyledIOLabel'
import createFC from '../createFC'
import { UnstyledIOTimePickerProps, UnstyledIOTimePickerRef, UnstyledIOTimePickerType } from './type'
import UnstyledLabel from '../UnstyledLabel'
// 此处不引入 style.less，目的是实现按需引用

const UnstyledIOTimePicker = createFC<UnstyledIOTimePickerProps, UnstyledIOTimePickerRef>(function UnstyledIOTimePicker(
  props,
  forwardedRef,
) {
  const {
    classNamePrefix,
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
    theme,
    arrowIcon,
    keepHelperPlaceholder,
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
  const { value, setValue } = useIOControl(props)
  const hasValue = !!value
  const hasLabelAndPlaceholder = Boolean(label && placeholder) && label !== placeholder
  const active = propActive ?? (focused || hasValue || hasLabelAndPlaceholder)

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
          <div className={`${classNamePrefix}__value`}>{value ? dayjs(value).format(format) : ''}</div>
        </UnstyledIOLabel>
      )}
    </TimePicker>
  )
}) as UnstyledIOTimePickerType

UnstyledIOTimePicker.defaultProps = {
  ...TimePicker.defaultProps,
  autoHeight: false,
  format: 'HH:mm:ss',
  theme: UnstyledLabel,
  arrowIcon: <ChevronForwardSharp />,
  classNamePrefix: 'exd-unstyled-io-time-picker',
}

export default UnstyledIOTimePicker
