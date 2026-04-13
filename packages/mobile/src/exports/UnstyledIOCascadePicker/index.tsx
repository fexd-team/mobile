import React, { useState, useCallback, useRef } from 'react'
import { classnames, run } from '@fexd/tools'
import { ChevronForwardSharp } from '@fexd/icons'

import CascadePicker from '../CascadePicker'
import { CascadeOption } from '../CascadePickerView/type'
import useIOControl from '../useIOControl'
import UnstyledIOLabel from '../UnstyledIOLabel'
import createFC from '../createFC'
import { UnstyledIOCascadePickerProps, UnstyledIOCascadePickerRef, UnstyledIOCascadePickerType } from './type'
import UnstyledLabel from '../UnstyledLabel'

const UnstyledIOCascadePicker = createFC<UnstyledIOCascadePickerProps, UnstyledIOCascadePickerRef>(
  function UnstyledIOCascadePicker(props, forwardedRef) {
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
      theme,
      arrowIcon,
      className,
      style,
      separator = ' / ',
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
    const selectedOptionsRef = useRef<CascadeOption[]>([])
    const { value, setValue } = useIOControl(props as any)
    const hasValue = Array.isArray(value) && value.length > 0
    const hasLabelAndPlaceholder = Boolean(label && placeholder) && label !== placeholder
    const active = propActive ?? (focused || hasValue || hasLabelAndPlaceholder)

    const displayText = useCallback(() => {
      if (!hasValue) return ''
      return selectedOptionsRef.current.map((o) => o.label).join(separator)
    }, [hasValue, separator])

    return (
      <CascadePicker
        {...restProps}
        value={value as any}
        disabled={disabled}
        onEnter={(...args: any[]) => {
          setFocused(true)
          run(restProps.onEnter, undefined, ...args)
        }}
        onExited={(...args: any[]) => {
          setFocused(false)
          run(restProps.onExited, undefined, ...args)
        }}
        onChange={(values, selectedOptions) => {
          selectedOptionsRef.current = selectedOptions
          setValue(values as any)
        }}
        ref={forwardedRef}
      >
        {() => (
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
              if (suffix) return suffix
              return <div className={`${classNamePrefix}__arrow`}>{arrowIcon}</div>
            })()}
          >
            <div className={`${classNamePrefix}__value`}>{displayText()}</div>
          </UnstyledIOLabel>
        )}
      </CascadePicker>
    )
  },
) as UnstyledIOCascadePickerType

UnstyledIOCascadePicker.defaultProps = {
  ...CascadePicker.defaultProps,
  separator: ' / ',
  theme: UnstyledLabel,
  autoHeight: false,
  arrowIcon: <ChevronForwardSharp />,
  classNamePrefix: 'exd-unstyled-io-cascade-picker',
}

export default UnstyledIOCascadePicker
