import React, { useEffect } from 'react'
import { classnames, clamp, isNumber, isExist } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'
import { Plus, Minus } from '@fexd/icons-bytesize'

import Button from '../Button'
import { BasicButtonSizeTypes } from '../BasicButton/type'
import Input from '../Input'
import useIOControl from '../useIOControl'
import createFC from '../createFC'
import { StepperProps, StepperRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

const inlineStepperSize2ButtonSize: Record<string, BasicButtonSizeTypes> = {
  large: 'normal',
  normal: 'small',
  small: 'mini',
}
export const prefix = 'exd-stepper'
const Stepper = createFC<StepperProps, StepperRef>(function Stepper(
  {
    className,
    step,
    min,
    max,
    size,
    block,
    onFocus,
    onBlur,
    allowEmpty,
    width,
    style,
    normalize,
    disabled: propDisabled,
    ...props
  },
  ref,
) {
  const clampValue = (value: number) => clamp(value, min ?? -Number.MAX_VALUE, max)
  const { value, setValue, focused, setFocused } = useIOControl<number>({
    ...props,
    defaultValue: isNumber(props?.defaultValue) ? clampValue(props?.defaultValue) : allowEmpty ? undefined : min ?? 0,
  })
  const inputRef = React.useRef<HTMLInputElement>(null)
  const buttonSize = block ? size : inlineStepperSize2ButtonSize[size!]

  useEffect(() => {
    if (focused && !props.readOnly) {
      inputRef.current?.select?.()
    }
  }, [focused, props.readOnly])

  /* 组件逻辑实现 */
  return (
    <div
      style={style}
      onChange={undefined}
      ref={ref}
      className={classnames(prefix, className, {
        [`${prefix}-${size}`]: !!size,
        [`${prefix}-block`]: block,
      })}
    >
      <div className={`${prefix}-wrapper`}>
        <Button
          className={`${prefix}-btn`}
          shape="unset"
          fill="none"
          size={buttonSize}
          icon={<Minus />}
          disabled={propDisabled ?? value <= (min ?? -Number.MAX_VALUE)}
          onClick={useMemoizedFn(() =>
            setValue((value) => (isExist(value) ? clampValue(Number(value) - (step?.[0] ?? step ?? 1)) : min ?? 0)),
          )}
        />
        <Input
          {...props}
          disabled={propDisabled}
          className={`${prefix}-input`}
          value={isExist(value) ? String(value) : ''}
          onChange={useMemoizedFn((value) => {
            if (value === '') {
              // @ts-ignore
              setValue(allowEmpty ? '' : 0)
              return
            }

            setValue(clampValue(Number(value)))
          })}
          normalize={useMemoizedFn(
            normalize ??
              ((value, prevValue) => {
                if (value?.length === 0 || value === '-') {
                  return ''
                }

                if (!/^\-?\d+\.?\d*$/.test(value)) {
                  return prevValue!
                }

                return value
              }),
          )}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          ref={inputRef}
        />
        <Button
          className={`${prefix}-btn`}
          shape="unset"
          fill="none"
          size={buttonSize}
          icon={<Plus />}
          disabled={propDisabled ?? value >= (max ?? Number.MAX_VALUE)}
          onClick={useMemoizedFn(() =>
            setValue((value) => (isExist(value) ? clampValue(Number(value) + (step?.[1] ?? step ?? 1)) : max ?? 0)),
          )}
        />
      </div>
    </div>
  )
})

Stepper.defaultProps = {
  // defaultValue: 0,
  step: 1,
  size: 'normal',
  block: false,
  allowEmpty: false,
}

export default Stepper
