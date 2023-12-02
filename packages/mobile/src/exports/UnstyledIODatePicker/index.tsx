import React, { useState } from 'react'
import { classnames, run } from '@fexd/tools'
import { ChevronForward } from '@fexd/icons'
import dayjs from 'dayjs'

import DatePicker from '../DatePicker'
import useIOControl from '../useIOControl'
import UnstyledIOLabel from '../UnstyledIOLabel'
import createFC from '../../helpers/createFC'
import { UnstyledIODatePickerProps, UnstyledIODatePickerRef, UnstyledIODatePickerType } from './type'
import UnstyledLabel from '../UnstyledLabel'
import Button from '../Button'
// 此处不引入 style.less，目的是实现按需引用

const UnstyledIODatePicker = createFC<UnstyledIODatePickerProps, UnstyledIODatePickerRef>(function UnstyledIODatePicker(
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
    keepHelperPlaceholder,
    hideErrorWhenFocusing,
    onClick,
    format,
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
  const { value, setValue } = useIOControl(props as any)
  const hasValue = !!value

  const active = propActive ?? (focused || hasValue)

  return (
    <DatePicker
      {...restProps}
      value={value as any}
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
    </DatePicker>
  )
}) as UnstyledIODatePickerType

UnstyledIODatePicker.defaultProps = {
  ...DatePicker.defaultProps,
  format: 'YYYY-MM-DD',
  theme: UnstyledLabel,
  arrowIcon: <ChevronForward color="#bbb" />,
  classNamePrefix: 'exd-unstyled-io-date-picker',
}

export default UnstyledIODatePicker
