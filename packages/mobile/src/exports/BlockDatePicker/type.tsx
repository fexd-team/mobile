import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIODatePickerRef, UnstyledIODatePickerProps } from '../UnstyledIODatePicker/type'

export type BlockDatePickerRef = UnstyledIODatePickerRef
export interface BlockDatePickerProps extends Omit<UnstyledIODatePickerProps, 'theme'> {}

/**
 * BlockDatePicker 样式变量
 */
export interface BlockDatePickerStyleVars {
  /**
   * @description 日期值文字大小
   * @default 14px
   */
  '@block-date-picker-value-font-size'?: string
  /**
   * @description 禁用态文字颜色
   * @default #999
   */
  '@block-date-picker-disabled-color'?: string
  /**
   * @description 禁用态箭头颜色
   * @default #ccc
   */
  '@block-date-picker-disabled-arrow-color'?: string
  /**
   * @description 清除按钮颜色
   * @default #ccc
   */
  '@block-date-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@block-date-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default #a5a0a1
   */
  '@block-date-picker-arrow-color'?: string
}

export const DOC_BlockDatePickerStyleVars = AUTO_API<BlockDatePickerStyleVars>()
