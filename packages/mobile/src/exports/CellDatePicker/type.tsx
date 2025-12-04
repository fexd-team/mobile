import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIODatePickerRef, UnstyledIODatePickerProps } from '../UnstyledIODatePicker/type'

export type CellDatePickerRef = UnstyledIODatePickerRef
export interface CellDatePickerProps extends Omit<UnstyledIODatePickerProps, 'theme'> {}

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

export const DOC_CellDatePickerStyleVars = AUTO_API<CellDatePickerStyleVars>()
