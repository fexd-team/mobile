import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { PureBasicPickerProps, BasicPickerProps, BasicPickerRef } from '../usePickerProps/type'
import {
  PureCascadePickerViewProps,
  CascadePickerViewProps,
  CascadePickerViewValue,
  CascadeOption,
} from '../CascadePickerView/type'

export type CascadePickerRef = BasicPickerRef

export interface PureCascadePickerProps extends Omit<PureBasicPickerProps, 'defaultValue' | 'value' | 'onChange'> {}

export interface PureCascadePickerProps extends Omit<PureCascadePickerViewProps, 'onChange' | 'children'> {
  /** 值改变的回调，只有在确认选中后触发 */
  onChange?: (values: CascadePickerViewValue, selectedOptions: CascadeOption[]) => void
  /** 触发区域内容，支持函数式 children */
  children?:
    | React.ReactNode
    | ((selectedValues?: CascadePickerViewValue, selectedOptions?: CascadeOption[]) => React.ReactNode)
  ref?: React.Ref<CascadePickerRef>
}

export interface CascadePickerProps
  extends Omit<BasicPickerProps, 'ref' | 'value' | 'defaultValue' | 'onChange' | 'children'> {}
export interface CascadePickerProps extends Omit<CascadePickerViewProps, 'ref' | 'children' | 'onChange'> {}
export interface CascadePickerProps extends PureCascadePickerProps {}

export interface CascadePickerType extends FC<CascadePickerProps> {}

export default AUTO_API<PureCascadePickerProps>()
