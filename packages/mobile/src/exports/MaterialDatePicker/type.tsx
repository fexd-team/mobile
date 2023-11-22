import React from 'react'
import { FC } from '../../helpers/createFC'

import { DatePickerProps, DatePickerRef } from '../DatePicker/type'
import { MaterialIOLabelProps } from '../MaterialIOLabel/type'

export type MaterialDatePickerRef = DatePickerRef

export interface MaterialDatePickerProps extends Omit<MaterialIOLabelProps, 'children' | 'onClick'> {}
export interface MaterialDatePickerProps extends Omit<DatePickerProps, 'prefix' | 'placeholder'> {}
export interface MaterialDatePickerProps {
  className?: string
  label?: string
  labelType?: MaterialIOLabelProps['type']
  ref?: React.Ref<MaterialDatePickerRef>
}

export interface MaterialDatePickerType extends FC<MaterialDatePickerProps> {}
