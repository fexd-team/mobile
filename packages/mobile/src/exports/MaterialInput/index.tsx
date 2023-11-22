/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react'
import { classnames, isString, run, get } from '@fexd/tools'
import { MdCloseCircle } from '@fexd/icons'

import MaterialIOLabel from '../MaterialIOLabel'
import createFC from '../../helpers/createFC'
import Input from '../Input'
import TextArea from '../TextArea'
import { MaterialInputProps, MaterialInputRef } from './type'
import useTextFieldProps, { TextFieldProps, defaultProps } from '../useTextFieldProps'
// 此处不引入 style.less，目的是实现按需引用

const LINE_BREAK = `
`

export const prefix = 'exd-material-input'
const MaterialInput = createFC<MaterialInputProps, MaterialInputRef>(function MaterialInput(
  {
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
    onClick,
    ...props
  },
  ref,
) {
  const { focused, ...inputProps } = useTextFieldProps({ ref, ...props })
  const hasValue = inputProps.value?.length > 0
  const [clearShow, setClearShow] = useState(false)
  const active = propActive ?? (focused || hasValue)

  useEffect(() => {
    setTimeout(() => {
      setClearShow(Boolean(clearable && hasValue && focused))
    }, 100)
  }, [clearable && hasValue && focused])

  // useEffect(() => {
  //   if (!focused && multipleLines) {
  //     inputProps.ref.current!.innerHTML = inputProps.value
  //   }
  // }, [inputProps.value, multipleLines, focused])

  const handleClear = () => {
    if (!clearShow) {
      return
    }
    run(inputProps.onChange, undefined, '')
  }

  return (
    <MaterialIOLabel
      autoHeight={multipleLines}
      className={classnames(`${prefix}__label`, props.className, {
        [`${prefix}__label--multiple`]: multipleLines,
      })}
      active={active}
      focused={focused}
      disabled={disabled}
      placeholder={label}
      helper={helper}
      helperPrefix={helperPrefix}
      error={error}
      type={labelType}
      hideErrorWhenFocusing={hideErrorWhenFocusing}
      prefix={labelPrefix}
      onClick={onClick}
      suffix={
        <div className={`${prefix}__suffix-wrapper`}>
          <ClearIcon
            className={classnames(`${prefix}__clear`, {
              [`${prefix}__clear--show`]: clearShow,
            })}
            onMouseDown={handleClear}
            onClick={handleClear}
          />
          <div className={`${prefix}__suffix`}>{suffix}</div>
        </div>
      }
    >
      {multipleLines ? (
        <TextArea
          {...inputProps}
          height="auto"
          placeholder={active && label !== placeholder ? placeholder : ''}
          className={classnames(`${prefix}__textarea`, {
            [`${prefix}__textarea--disabled`]: disabled,
            [`${prefix}__textarea--active`]: active,
          })}
        />
      ) : (
        <Input
          {...inputProps}
          placeholder={active && label !== placeholder ? placeholder : ''}
          className={classnames(`${prefix}__input`, {
            [`${prefix}__input--disabled`]: disabled,
            [`${prefix}__input--active`]: active,
          })}
        />
      )}
    </MaterialIOLabel>
  )
})

MaterialInput.defaultProps = {
  disabled: false,
  clearable: true,
  clearIcon: MdCloseCircle,
  scrollIntoView: false,
  labelType: 'info',
  hideErrorWhenFocusing: true,
}

export default MaterialInput
