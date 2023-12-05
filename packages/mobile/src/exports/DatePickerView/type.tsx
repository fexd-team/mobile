import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export type DatePickerViewValue = Date | number | string

export interface DatePickerViewProps extends Omit<JSXDivProps, 'onChange' | 'defaultValue'> {
  defaultValue?: DatePickerViewValue
  value?: DatePickerViewValue
  onChange?: (value: DatePickerViewValue, formattedValue?: string) => void
  format?: string
  min?: number | Date
  max?: number | Date
  className?: string
  yearLabel?: string
  monthLabel?: string
  dayLabel?: string
  rows?: number
}

export default AUTO_API<DatePickerViewProps>()
