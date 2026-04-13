import React from 'react'
import { FC } from '../createFC/type'

import { PureDatePickerProps, DatePickerProps, DatePickerRef } from '../DatePicker/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIODatePickerRef = DatePickerRef

export interface PureUnstyledIODatePickerProps
  extends Omit<UnstyledIOLabelProps, 'children' | 'onClick' | 'defaultValue' | 'onChange'> {}
export interface PureUnstyledIODatePickerProps extends Omit<PureDatePickerProps, 'prefix' | 'placeholder'> {}
export interface PureUnstyledIODatePickerProps {
  classNamePrefix?: string
  className?: string
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIODatePickerRef>
  theme?: UnstyledIOLabelProps['theme']
  arrowIcon?: React.ReactNode
}

export interface UnstyledIODatePickerProps extends Omit<DatePickerProps, 'ref' | 'prefix' | 'placeholder'> {}
export interface UnstyledIODatePickerProps extends PureUnstyledIODatePickerProps {}

export interface UnstyledIODatePickerType extends FC<UnstyledIODatePickerProps> {}
