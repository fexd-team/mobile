import React, { createContext, useMemo, useContext } from 'react'
import { isArray, pick } from '@fexd/tools'
import createFC from '../../createFC'
import { RadioGroupProps, RadioGroupRef, RadioGroupType, RadioGroupSharedProps } from './type'
import useIOControl from '../../useIOControl'
import Space from '../../Space'
import Radio, { defaultIcon } from '../index'
// 此处不引入 style.less，目的是实现按需引用

export const radioGroupContext = createContext<
  RadioGroupSharedProps & {
    value: any
    setValue: (value: any) => void
  }
>({} as any)
export const useRadioGroupContext = () => useContext(radioGroupContext)
// export const prefix = 'exd-radio'
const RadioGroup = createFC<RadioGroupProps, RadioGroupRef>(function RadioGroup({ children, options, ...props }, ref) {
  const { value, setValue } = useIOControl<any>(props)

  const optionsChildren = useMemo(
    () =>
      isArray(options) ? (
        <Space wrap={!props.block} direction={props.block ? 'vertical' : 'horizontal'}>
          {options.map(({ value, label, ...props }) => (
            <Radio key={value} value={value} block {...props}>
              {label}
            </Radio>
          ))}
        </Space>
      ) : null,
    [options, props.block],
  )

  /* 组件逻辑实现 */
  return (
    <radioGroupContext.Provider
      value={{
        value,
        setValue,
        ...pick(props, ['icon', 'block', 'size', 'disabled']),
      }}
    >
      {optionsChildren ?? children}
    </radioGroupContext.Provider>
  )
}) as RadioGroupType

RadioGroup.defaultProps = {
  block: false,
  icon: defaultIcon,
}

export default RadioGroup
