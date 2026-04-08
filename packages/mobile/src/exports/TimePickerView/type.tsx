import AUTO_API from '../../helpers/AUTO_API'
export type TimePickerViewValue = Date | string
export interface TimePickerViewProps {
  value?: TimePickerViewValue
  onChange?: (value: TimePickerViewValue, formattedValue?: string) => void
  format?: string
  className?: string
  /** 可选时间范围下限（仅取时分秒部分） */
  min?: Date | string
  /** 可选时间范围上限（仅取时分秒部分） */
  max?: Date | string
  hourLabel?: string
  minuteLabel?: string
  secondLabel?: string
  rows?: number
}

export default AUTO_API<TimePickerViewProps>()
