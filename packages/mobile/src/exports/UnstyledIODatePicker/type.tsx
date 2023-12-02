import React from 'react'
import { FC } from '../../helpers/createFC'

import { DatePickerProps, DatePickerRef } from '../DatePicker/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIODatePickerRef = DatePickerRef

export interface UnstyledIODatePickerProps
  extends Omit<UnstyledIOLabelProps, 'children' | 'onClick' | 'defaultValue' | 'onChange'> {}
export interface UnstyledIODatePickerProps extends Omit<DatePickerProps, 'prefix' | 'placeholder'> {}
export interface UnstyledIODatePickerProps {
  classNamePrefix?: string
  className?: string
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIODatePickerRef>
  theme?: UnstyledIOLabelProps['theme']
  arrowIcon?: React.ReactNode
}

export interface UnstyledIODatePickerType extends FC<UnstyledIODatePickerProps> {}
