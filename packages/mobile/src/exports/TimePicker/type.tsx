import AUTO_API from '../../helpers/AUTO_API'
import { PureBasicPickerProps, BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'
import { TimePickerViewProps, TimePickerViewValue } from '../TimePickerView/type'

export type TimePickerRef = BasicPickerRef

export interface PureTimePickerProps
  extends Omit<PureBasicPickerProps, 'ref' | 'value' | 'defaultValue' | 'onChange' | 'children'> {}
export interface PureTimePickerProps extends Omit<TimePickerViewProps, 'ref'> {}
export interface PureTimePickerProps {
  children?: React.ReactNode | ((selectedValue?: TimePickerViewValue) => React.ReactNode)
  ref?: React.Ref<TimePickerRef>
}

export interface TimePickerProps extends Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange'> {}
export interface TimePickerProps extends PureTimePickerProps {}

export default AUTO_API<PureTimePickerProps>()
