import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIOCascadePickerRef,
  UnstyledIOCascadePickerProps,
  PureUnstyledIOCascadePickerProps,
} from '../UnstyledIOCascadePicker/type'

export type CellCascadePickerRef = UnstyledIOCascadePickerRef

export interface PureCellCascadePickerProps extends Omit<PureUnstyledIOCascadePickerProps, 'theme'> {
  ref?: React.Ref<CellCascadePickerRef>
}
export interface CellCascadePickerProps extends Omit<UnstyledIOCascadePickerProps, 'theme' | 'ref'> {}
export interface CellCascadePickerProps extends PureCellCascadePickerProps {}

export default AUTO_API<PureCellCascadePickerProps>()

export interface CellCascadePickerStyleVars {
  /** @description 禁用态文字颜色 @default ant-color-gray-7 */
  '@cell-cascade-picker-disabled-color'?: string
  /** @description 清除按钮颜色 @default ant-color-gray-5 */
  '@cell-cascade-picker-clear-color'?: string
  /** @description 箭头图标大小 @default 18px */
  '@cell-cascade-picker-arrow-font-size'?: string
  /** @description 箭头图标颜色 @default ant-color-gray-6 */
  '@cell-cascade-picker-arrow-color'?: string
}

export const DOC_CellCascadePickerStyleVars = AUTO_API<CellCascadePickerStyleVars>()
