import React from 'react'
import { FC } from '../../helpers/createFC'

import { TimePickerProps, TimePickerRef } from '../TimePicker/type'
import { MaterialIOLabelProps } from '../MaterialIOLabel/type'

export type MaterialTimePickerRef = TimePickerRef

export interface MaterialTimePickerProps extends Omit<MaterialIOLabelProps, 'children'> {}
export interface MaterialTimePickerProps extends TimePickerProps {}
export interface MaterialTimePickerProps {
  className?: string
  label?: string
  labelType?: MaterialIOLabelProps['type']
  ref?: React.Ref<MaterialTimePickerRef>
}

export interface MaterialTimePickerType extends FC<MaterialTimePickerProps> {}
