import AUTO_API from '../../helpers/AUTO_API'
export type PickerOptionValue = string | number

export interface PickerOption {
  value: PickerOptionValue
  label: string
}
export interface PickerViewProps {
  options?: PickerOption[]
  data?: PickerOption[]
  rows?: number
  defaultValue?: PickerOptionValue
  value?: PickerOptionValue
  onChange?: (value: PickerOptionValue, index?: number) => void
  className?: string
}

export default AUTO_API<PickerViewProps>()