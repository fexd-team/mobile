export type TimePickerViewValue = Date | string
export interface TimePickerViewProps {
  // defaultValue?: TimePickerViewValue
  value?: TimePickerViewValue
  onChange?: (value: TimePickerViewValue, index?: number) => void
  format?: string
  className?: string
  hourLabel?: string
  minuteLabel?: string
  secondLabel?: string
  rows?: number
}
