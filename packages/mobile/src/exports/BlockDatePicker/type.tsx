import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIODatePickerRef,
  UnstyledIODatePickerProps,
  PureUnstyledIODatePickerProps,
} from '../UnstyledIODatePicker/type'

export type BlockDatePickerRef = UnstyledIODatePickerRef

export interface PureBlockDatePickerProps extends Omit<PureUnstyledIODatePickerProps, 'theme'> {
  ref?: React.Ref<BlockDatePickerRef>
}
export interface BlockDatePickerProps extends Omit<UnstyledIODatePickerProps, 'theme' | 'ref'> {}
export interface BlockDatePickerProps extends PureBlockDatePickerProps {}

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

export default AUTO_API<PureBlockDatePickerProps>()
export const DOC_BlockDatePickerStyleVars = AUTO_API<BlockDatePickerStyleVars>()
