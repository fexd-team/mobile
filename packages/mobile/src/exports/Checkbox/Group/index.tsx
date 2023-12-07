import React, { createContext, useMemo, useContext } from 'react'
import { isArray, pick } from '@fexd/tools'
import { CheckmarkCircle, EllipseOutline } from '@fexd/icons'
import createFC from '../../createFC'
import { CheckboxGroupProps, CheckboxGroupRef, CheckboxGroupType, CheckboxGroupSharedProps } from './type'
import useIOControl from '../../useIOControl'
import Space from '../../Space'
import Checkbox, { defaultIcon } from '../index'
// 此处不引入 style.less，目的是实现按需引用

export const radioGroupContext = createContext<
  CheckboxGroupSharedProps & {
    value: any
    setValue: (value: any) => void
  }
>({} as any)
export const useCheckboxGroupContext = () => useContext(radioGroupContext)
// export const prefix = 'exd-radio'
const CheckboxGroup = createFC<CheckboxGroupProps, CheckboxGroupRef>(function CheckboxGroup(
  { children, options, ...props },
  ref,
) {
  const { value, setValue } = useIOControl<any>(props)

  const optionsChildren = useMemo(
    () =>
      isArray(options) ? (
        <Space wrap={!props.block} direction={props.block ? 'vertical' : 'horizontal'}>
          {options.map(({ value, label, ...props }) => (
            <Checkbox key={value} value={value} block {...props}>
              {label}
            </Checkbox>
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
}) as CheckboxGroupType

CheckboxGroup.defaultProps = {
  block: false,
  icon: defaultIcon,
}

export default CheckboxGroup
