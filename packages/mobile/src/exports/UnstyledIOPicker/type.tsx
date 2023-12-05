import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { PickerProps, PickerRef } from '../Picker/type'
import { PickerOptionValue, PickerOption } from '../PickerView/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOPickerRef = PickerRef

export interface UnstyledIOPickerProps extends Omit<UnstyledIOLabelProps, 'children' | 'onChange' | 'defaultValue'> {
  onChange?: (value: PickerOptionValue, item: PickerOption) => void
}
export interface UnstyledIOPickerProps extends PickerProps {}
export interface UnstyledIOPickerProps {
  classNamePrefix?: string
  className?: string
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIOPickerRef>
  theme?: UnstyledIOLabelProps['theme']
  arrowIcon?: React.ReactNode
}

export default AUTO_API<UnstyledIOPickerProps>()
