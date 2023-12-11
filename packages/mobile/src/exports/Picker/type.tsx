import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { PureBasicPickerProps, BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'
import { PickerViewProps, PickerOptionValue, PickerOption } from '../PickerView/type'

export type PickerRef = BasicPickerRef

export interface PurePickerProps<T = PickerViewProps['value']>
  extends Omit<PureBasicPickerProps<T>, 'defaultValue' | 'value' | 'onChange'> {}

export interface PurePickerProps extends Omit<PickerViewProps, 'onChange'> {
  /** 是否可清除，将会显示 "---" 选项 */
  clearable?: boolean
  /** 值改变的回调，只有在确认选中后触发 */
  onChange?: (value: PickerOptionValue, item: PickerOption) => void
  /** Picker 的触发内容 */
  children?:
    | React.ReactNode
    | ((
        selectedLabel?: PickerOption['label'],
        selectedValue?: PickerOptionValue,
        selectedOption?: PickerOption,
      ) => React.ReactNode)
}

export interface PickerProps<T = PickerViewProps['value']>
  extends Omit<BasicPickerProps<T>, 'defaultValue' | 'value' | 'onChange'> {}
export interface PickerProps<T = PickerViewProps['value']> extends PurePickerProps<T> {}

export default AUTO_API<PurePickerProps>()
