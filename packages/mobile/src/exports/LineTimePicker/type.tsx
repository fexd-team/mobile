import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOTimePickerRef, UnstyledIOTimePickerProps } from '../UnstyledIOTimePicker/type'

export type LineTimePickerRef = UnstyledIOTimePickerRef
export interface LineTimePickerProps extends Omit<UnstyledIOTimePickerProps, 'theme'> {}

/**
 * LineTimePicker 样式变量
 */
export interface LineTimePickerStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default @ant-color-gray-7
   */
  '@line-time-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default @ant-color-gray-5
   */
  '@line-time-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@line-time-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default @ant-color-gray-6
   */
  '@line-time-picker-arrow-color'?: string
}

export const DOC_LineTimePickerStyleVars = AUTO_API<LineTimePickerStyleVars>()
