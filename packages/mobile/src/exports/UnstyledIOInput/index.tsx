/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react'
import { classnames, isString, run, get } from '@fexd/tools'
import { MdCloseCircle } from '@fexd/icons'

import UnstyledIOLabel from '../UnstyledIOLabel'
import createFC from '../createFC'
import Input from '../Input'
import TextArea from '../TextArea'
import { UnstyledIOInputProps, UnstyledIOInputRef } from './type'
import useTextFieldProps, { TextFieldProps, defaultProps } from '../useTextFieldProps'
import Button from '../Button'
import { useMemoizedFn } from 'ahooks'
import UnstyledLabel from '../UnstyledLabel'
// 此处不引入 style.less，目的是实现按需引用

const LINE_BREAK = `
`

const UnstyledIOInput = createFC<UnstyledIOInputProps, UnstyledIOInputRef>(function UnstyledIOInput(
  {
    classNamePrefix,
    active: propActive,
    scrollIntoView: needScrollIntoView,
    multipleLines = false,
    clearable,
    clearIcon: ClearIcon,
    placeholder,
    label,
    prefix: labelPrefix,
    helperPrefix,
    suffix,
    helper,
    error,
    disabled,
    labelType,
    hideErrorWhenFocusing,
    keepHelperPlaceholder,
    onClick,
    onChange,
    theme,
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
    inputProps: propInputProps,
    ...props
  },
  ref,
) {
  const { focused, ...restInputProps } = useTextFieldProps(
    { ref, onChange: onChange as any, ...props },
    { noFormat: true },
  )
  const inputProps = {
    ...restInputProps,
    ...propInputProps,
  }
  const hasValue = inputProps.value?.length > 0
  const [clearShow, setClearShow] = useState(false)

  // if (multipleLines && !label) {
  //   label = placeholder
  // }

  const noLabel = !label
  const hasLabelAndPlaceholder = Boolean(label && placeholder) && label !== placeholder
  const active = propActive ?? (focused || hasValue || hasLabelAndPlaceholder)

  useEffect(() => {
    setTimeout(() => {
      setClearShow(Boolean(clearable && hasValue))
    }, 100)
  }, [clearable, hasValue])

  const handleClear = useMemoizedFn(() => {
    if (!clearShow) {
      return
    }
    run(inputProps.onChange, undefined, '')
  })

  const inputActive = noLabel ? true : active

  return (
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
      autoHeight={multipleLines}
      className={classnames(`${classNamePrefix}__label`, className, {
        [`${classNamePrefix}__label--multiple`]: multipleLines,
        [`${classNamePrefix}__label--no-label`]: noLabel,
      })}
      style={style}
      active={noLabel ? false : active}
      focused={focused}
      disabled={disabled}
      placeholder={noLabel ? undefined : label}
      helper={helper}
      helperPrefix={helperPrefix}
      error={error}
      type={labelType}
      keepHelperPlaceholder={keepHelperPlaceholder}
      hideErrorWhenFocusing={hideErrorWhenFocusing}
      prefix={labelPrefix}
      onClick={onClick}
      suffix={
        <div className={`${classNamePrefix}__suffix-wrapper`}>
          <ClearIcon
            className={classnames(`${classNamePrefix}__clear`, {
              [`${classNamePrefix}__clear--show`]: clearShow,
            })}
            onMouseDown={handleClear}
            onClick={handleClear}
          />
          {suffix && <div className={`${classNamePrefix}__suffix`}>{suffix}</div>}
        </div>
      }
    >
      {multipleLines ? (
        <TextArea
          {...inputProps}
          height="auto"
          // unstyled
          placeholder={inputActive && (label !== placeholder || noLabel) ? placeholder : ''}
          className={classnames(`${classNamePrefix}__textarea`, {
            [`${classNamePrefix}__textarea--disabled`]: disabled,
            [`${classNamePrefix}__textarea--active`]: inputActive,
          })}
        />
      ) : (
        <Input
          {...inputProps}
          // unstyled
          ref={inputProps?.ref as any}
          onChange={inputProps?.onChange as any}
          placeholder={inputActive && (label !== placeholder || noLabel) ? placeholder : ''}
          className={classnames(`${classNamePrefix}__input`, {
            [`${classNamePrefix}__input--disabled`]: disabled,
            [`${classNamePrefix}__input--active`]: inputActive,
          })}
        />
      )}
    </UnstyledIOLabel>
  )
})

UnstyledIOInput.defaultProps = {
  disabled: false,
  clearable: true,
  clearIcon: MdCloseCircle,
  scrollIntoView: false,
  labelType: 'info',
  hideErrorWhenFocusing: true,
  theme: UnstyledLabel,
  classNamePrefix: 'exd-unstyled-io-input',
}

export default UnstyledIOInput
