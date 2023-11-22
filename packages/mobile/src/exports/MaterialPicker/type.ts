import { PickerProps, PickerRef } from '../Picker/type'
import { PickerOptionValue, PickerOption } from '../PickerView/type'
import { MaterialIOLabelProps } from '../MaterialIOLabel/type'

export type MaterialPickerRef = PickerRef

export interface MaterialPickerProps extends Omit<MaterialIOLabelProps, 'children' | 'onChange'> {
  onChange?: (value: PickerOptionValue, item: PickerOption) => void
}
export interface MaterialPickerProps extends PickerProps {}
export interface MaterialPickerProps {
  className?: string
  label?: string
  labelType?: MaterialIOLabelProps['type']
  ref?: React.Ref<MaterialPickerRef>
}
