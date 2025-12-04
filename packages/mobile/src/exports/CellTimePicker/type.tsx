import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOTimePickerRef, UnstyledIOTimePickerProps } from '../UnstyledIOTimePicker/type'

export type CellTimePickerRef = UnstyledIOTimePickerRef
export interface CellTimePickerProps extends Omit<UnstyledIOTimePickerProps, 'theme'> {}

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

export const DOC_CellTimePickerStyleVars = AUTO_API<CellTimePickerStyleVars>()
