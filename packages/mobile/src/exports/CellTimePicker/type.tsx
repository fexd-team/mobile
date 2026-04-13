import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIOTimePickerRef,
  UnstyledIOTimePickerProps,
  PureUnstyledIOTimePickerProps,
} from '../UnstyledIOTimePicker/type'

export type CellTimePickerRef = UnstyledIOTimePickerRef

export interface PureCellTimePickerProps extends Omit<PureUnstyledIOTimePickerProps, 'theme'> {
  ref?: React.Ref<CellTimePickerRef>
}
export interface CellTimePickerProps extends Omit<UnstyledIOTimePickerProps, 'theme' | 'ref'> {}
export interface CellTimePickerProps extends PureCellTimePickerProps {}

/**
 * CellTimePicker 样式变量
 */
export interface CellTimePickerStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-7
   */
  '@cell-time-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-5
   */
  '@cell-time-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@cell-time-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default ant-color-gray-6
   */
  '@cell-time-picker-arrow-color'?: string
}

export default AUTO_API<PureCellTimePickerProps>()
export const DOC_CellTimePickerStyleVars = AUTO_API<CellTimePickerStyleVars>()
