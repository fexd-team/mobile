import React from 'react'
import { classnames, clamp } from '@fexd/tools'
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
  { className, step, min, max, size, block, onFocus, onBlur, ...props },
  ref,
) {
  const { value, setValue } = useIOControl<number>(props)
  const buttonSize = block ? size : inlineStepperSize2ButtonSize[size!]
  const clampValue = (value: number) => clamp(value, min ?? -Number.MAX_VALUE, max)
  /* 组件逻辑实现 */
  return (
    <div
      {...props}
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
          disabled={value <= (min ?? -Number.MAX_VALUE)}
          onClick={useMemoizedFn(() => setValue((value) => clampValue(value - step!)))}
        />
        <Input
          className={`${prefix}-input`}
          value={String(value)}
          onChange={useMemoizedFn((value) => setValue(clampValue(Number(value))))}
          normalize={useMemoizedFn((value, prevValue) => {
            if (value?.length === 0 || value === '-') {
              return String(0)
            }

            if (!/^\-?\d+\.?\d*$/.test(value)) {
              return prevValue!
            }

            return value
          })}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Button
          className={`${prefix}-btn`}
          shape="unset"
          fill="none"
          size={buttonSize}
          icon={<Plus />}
          disabled={value >= (max ?? Number.MAX_VALUE)}
          onClick={useMemoizedFn(() => setValue((value) => clampValue(value + step!)))}
        />
      </div>
    </div>
  )
})

Stepper.defaultProps = {
  defaultValue: 1,
  step: 1,
  size: 'normal',
  block: false,
}

export default Stepper
