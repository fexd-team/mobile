import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIODatePickerRef, UnstyledIODatePickerProps } from '../UnstyledIODatePicker/type'

export type LineDatePickerRef = UnstyledIODatePickerRef
export interface LineDatePickerProps extends Omit<UnstyledIODatePickerProps, 'theme'> {}

/**
 * LineDatePicker 样式变量
 */
export interface LineDatePickerStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default @ant-color-gray-7
   */
  '@line-date-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default @ant-color-gray-5
   */
  '@line-date-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@line-date-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default @ant-color-gray-6
   */
  '@line-date-picker-arrow-color'?: string
}

export const DOC_LineDatePickerStyleVars = AUTO_API<LineDatePickerStyleVars>()
