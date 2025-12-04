import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOPickerRef, UnstyledIOPickerProps, PureUnstyledIOPickerProps } from '../UnstyledIOPicker/type'

export type CellPickerRef = UnstyledIOPickerRef
export interface PureCellPickerProps extends Omit<PureUnstyledIOPickerProps, 'theme'> {
  ref?: React.Ref<CellPickerRef>
}
export interface CellPickerProps extends Omit<UnstyledIOPickerProps, 'theme' | 'ref'> {}
export interface CellPickerProps extends PureCellPickerProps {}

export default AUTO_API<PureCellPickerProps>()

/**
 * CellPicker 样式变量
 */
export interface CellPickerStyleVars {
  /**
   * @description 选择器值文字大小
   * @default 14px
   */
  '@cell-picker-value-font-size'?: string
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-7
   */
  '@cell-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-5
   */
  '@cell-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@cell-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default ant-color-gray-6
   */
  '@cell-picker-arrow-color'?: string
}

export const DOC_CellPickerStyleVars = AUTO_API<CellPickerStyleVars>()
