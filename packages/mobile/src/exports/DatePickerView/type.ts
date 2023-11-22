import { JSXDivElement } from '../../helpers/html.types'

export type DatePickerViewValue = Date | number | string

export interface DatePickerViewProps extends Omit<JSXDivElement, 'onChange' | 'defaultValue'> {
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
