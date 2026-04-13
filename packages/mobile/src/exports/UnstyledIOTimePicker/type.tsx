import React from 'react'
import { FC } from '../createFC/type'

import { PureTimePickerProps, TimePickerProps, TimePickerRef } from '../TimePicker/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOTimePickerRef = TimePickerRef

export interface PureUnstyledIOTimePickerProps
  extends Omit<UnstyledIOLabelProps, 'children' | 'defaultValue' | 'onChange'> {}
export interface PureUnstyledIOTimePickerProps extends Omit<PureTimePickerProps, 'prefix' | 'placeholder'> {}
export interface PureUnstyledIOTimePickerProps {
  classNamePrefix?: string
  className?: string
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIOTimePickerRef>
  theme?: UnstyledIOLabelProps['theme']
  arrowIcon?: React.ReactNode
}

export interface UnstyledIOTimePickerProps extends Omit<TimePickerProps, 'ref' | 'prefix' | 'placeholder'> {}
export interface UnstyledIOTimePickerProps extends PureUnstyledIOTimePickerProps {}

export interface UnstyledIOTimePickerType extends FC<UnstyledIOTimePickerProps> {}
