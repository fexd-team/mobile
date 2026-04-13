import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIOCascadePickerRef,
  UnstyledIOCascadePickerProps,
  PureUnstyledIOCascadePickerProps,
} from '../UnstyledIOCascadePicker/type'

export type LineCascadePickerRef = UnstyledIOCascadePickerRef

export interface PureLineCascadePickerProps extends Omit<PureUnstyledIOCascadePickerProps, 'theme'> {
  ref?: React.Ref<LineCascadePickerRef>
}
export interface LineCascadePickerProps extends Omit<UnstyledIOCascadePickerProps, 'theme' | 'ref'> {}
export interface LineCascadePickerProps extends PureLineCascadePickerProps {}

export default AUTO_API<PureLineCascadePickerProps>()

export interface LineCascadePickerStyleVars {
  /** @description 禁用态文字颜色 @default ant-color-gray-7 */
  '@line-cascade-picker-disabled-color'?: string
  /** @description 清除按钮颜色 @default ant-color-gray-5 */
  '@line-cascade-picker-clear-color'?: string
  /** @description 箭头图标大小 @default 18px */
  '@line-cascade-picker-arrow-font-size'?: string
  /** @description 箭头图标颜色 @default ant-color-gray-6 */
  '@line-cascade-picker-arrow-color'?: string
}

export const DOC_LineCascadePickerStyleVars = AUTO_API<LineCascadePickerStyleVars>()
