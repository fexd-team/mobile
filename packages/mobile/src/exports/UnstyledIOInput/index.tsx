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
    label = placeholder,
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
  const active = propActive ?? (focused || hasValue)

  useEffect(() => {
    setTimeout(() => {
      setClearShow(Boolean(clearable && hasValue))
    }, 100)
  }, [clearable, hasValue])

  // useEffect(() => {
  //   if (!focused && multipleLines) {
  //     inputProps.ref.current!.innerHTML = inputProps.value
  //   }
  // }, [inputProps.value, multipleLines, focused])

  const handleClear = useMemoizedFn(() => {
    if (!clearShow) {
      return
    }
    run(inputProps.onChange, undefined, '')
  })

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
      })}
      style={style}
      active={active}
      focused={focused}
      disabled={disabled}
      placeholder={label}
      helper={helper}
      helperPrefix={helperPrefix}
      error={error}
      type={labelType}
      keepHelperPlaceholder={keepHelperPlaceholder}
      hideErrorWhenFocusing={hideErrorWhenFocusing}
      prefix={labelPrefix}
      onClick={useMemoizedFn((...args) => {
        if (!focused) {
          run((inputProps?.ref as any)?.current, 'focus')
        }
        return run(onClick, undefined, ...args)
      })}
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
          placeholder={active && label !== placeholder ? placeholder : ''}
          className={classnames(`${classNamePrefix}__textarea`, {
            [`${classNamePrefix}__textarea--disabled`]: disabled,
            [`${classNamePrefix}__textarea--active`]: active,
          })}
        />
      ) : (
        <Input
          {...inputProps}
          // unstyled
          ref={inputProps?.ref as any}
          onChange={inputProps?.onChange as any}
          placeholder={active && label !== placeholder ? placeholder : ''}
          className={classnames(`${classNamePrefix}__input`, {
            [`${classNamePrefix}__input--disabled`]: disabled,
            [`${classNamePrefix}__input--active`]: active,
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
