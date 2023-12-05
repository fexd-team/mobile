import React from 'react'
import { FC } from '../createFC/type'

import { TimePickerProps, TimePickerRef } from '../TimePicker/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOTimePickerRef = TimePickerRef

export interface UnstyledIOTimePickerProps
  extends Omit<UnstyledIOLabelProps, 'children' | 'defaultValue' | 'onChange'> {}
export interface UnstyledIOTimePickerProps extends TimePickerProps {}
export interface UnstyledIOTimePickerProps {
  classNamePrefix?: string
  className?: string
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIOTimePickerRef>
  theme?: UnstyledIOLabelProps['theme']
  arrowIcon?: React.ReactNode
}

export interface UnstyledIOTimePickerType extends FC<UnstyledIOTimePickerProps> {}
