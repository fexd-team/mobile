import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { PureDatePickerViewProps, DatePickerViewProps, DatePickerViewValue } from '../DatePickerView/type'
import { PureBasicPickerProps, BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'

export type DatePickerRef = BasicPickerRef

export interface PureDatePickerProps
  extends Omit<PureBasicPickerProps, 'value' | 'defaultValue' | 'onChange' | 'children'> {
  /** 是否过滤无效日期 */
  filterInvalidDate?: boolean
}
export interface PureDatePickerProps extends Omit<PureDatePickerViewProps, 'children'> {}
export interface PureDatePickerProps {
  children?: React.ReactNode | ((selectedValue?: DatePickerViewValue) => React.ReactNode)
  ref?: React.Ref<DatePickerRef>
}

export interface DatePickerProps extends Omit<DatePickerViewProps, 'ref' | 'children'> {}
export interface DatePickerProps extends PureDatePickerProps {}

export interface DatePickerType extends FC<DatePickerProps> {}

export default AUTO_API<PureDatePickerProps>()
