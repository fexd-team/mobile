import React from 'react'
import { BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'
import { PickerViewProps, PickerOptionValue, PickerOption } from '../PickerView/type'

export type PickerRef = BasicPickerRef

export interface PickerProps<T = PickerViewProps['value']> extends Omit<BasicPickerProps<T>, 'value' | 'onChange'> {}
export interface PickerProps extends Omit<PickerViewProps, 'onChange'> {
  clearable?: boolean
  onChange?: (value: PickerOptionValue, item: PickerOption) => void
}
export interface PickerProps {
  children?:
    | React.ReactNode
    | ((
        selectedLabel?: PickerOption['label'],
        selectedValue?: PickerOptionValue,
        selectedOption?: PickerOption,
      ) => React.ReactNode)
}
