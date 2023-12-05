import AUTO_API from '../../helpers/AUTO_API'
import { BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'
import { TimePickerViewProps, TimePickerViewValue } from '../TimePickerView/type'

export interface TimePickerProps extends Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange'> {}
export interface TimePickerProps extends TimePickerViewProps {}
export interface TimePickerProps {
  children?: React.ReactNode | ((selectedValue?: TimePickerViewValue) => React.ReactNode)
}

export type TimePickerRef = BasicPickerRef

export default AUTO_API<TimePickerProps>()
