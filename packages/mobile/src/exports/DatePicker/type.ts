import { FC } from '../../helpers/createFC'
import { DatePickerViewProps, DatePickerViewValue } from '../DatePickerView/type'
import { BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'

export type DatePickerRef = BasicPickerRef

export interface DatePickerProps extends Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange' | 'children'> {}
export interface DatePickerProps extends Omit<DatePickerViewProps, 'children'> {}
export interface DatePickerProps {
  children?: React.ReactNode | ((selectedValue?: DatePickerViewValue) => React.ReactNode)
  ref?: React.Ref<DatePickerRef>
}

export interface DatePickerType extends FC<DatePickerProps> {}
