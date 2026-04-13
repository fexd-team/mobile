import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIODatePickerRef,
  UnstyledIODatePickerProps,
  PureUnstyledIODatePickerProps,
} from '../UnstyledIODatePicker/type'

export type CellDatePickerRef = UnstyledIODatePickerRef

export interface PureCellDatePickerProps extends Omit<PureUnstyledIODatePickerProps, 'theme'> {
  ref?: React.Ref<CellDatePickerRef>
}
export interface CellDatePickerProps extends Omit<UnstyledIODatePickerProps, 'theme' | 'ref'> {}
export interface CellDatePickerProps extends PureCellDatePickerProps {}

/**
 * CellDatePicker 样式变量
 */
export interface CellDatePickerStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-7
   */
  '@cell-date-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-5
   */
  '@cell-date-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@cell-date-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default ant-color-gray-6
   */
  '@cell-date-picker-arrow-color'?: string
}

export default AUTO_API<PureCellDatePickerProps>()
export const DOC_CellDatePickerStyleVars = AUTO_API<CellDatePickerStyleVars>()
