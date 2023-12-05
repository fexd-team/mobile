import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'
import { PickerViewProps, PickerOptionValue, PickerOption } from '../PickerView/type'

export type PickerRef = BasicPickerRef

export interface PickerProps<T = PickerViewProps['value']>
  extends Omit<BasicPickerProps<T>, 'defaultValue' | 'value' | 'onChange'> {}
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

export default AUTO_API<PickerProps>()
