import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIOTimePickerRef,
  UnstyledIOTimePickerProps,
  PureUnstyledIOTimePickerProps,
} from '../UnstyledIOTimePicker/type'

export type BlockTimePickerRef = UnstyledIOTimePickerRef

export interface PureBlockTimePickerProps extends Omit<PureUnstyledIOTimePickerProps, 'theme'> {
  ref?: React.Ref<BlockTimePickerRef>
}
export interface BlockTimePickerProps extends Omit<UnstyledIOTimePickerProps, 'theme' | 'ref'> {}
export interface BlockTimePickerProps extends PureBlockTimePickerProps {}

/**
 * BlockTimePicker 样式变量
 */
export interface BlockTimePickerStyleVars {
  /**
   * @description 时间值文字大小
   * @default 14px
   */
  '@block-time-picker-value-font-size'?: string
  /**
   * @description 禁用态文字颜色
   * @default #999
   */
  '@block-time-picker-disabled-color'?: string
  /**
   * @description 禁用态箭头颜色
   * @default #ccc
   */
  '@block-time-picker-disabled-arrow-color'?: string
  /**
   * @description 清除按钮颜色
   * @default #ccc
   */
  '@block-time-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@block-time-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default #a5a0a1
   */
  '@block-time-picker-arrow-color'?: string
}

export default AUTO_API<PureBlockTimePickerProps>()
export const DOC_BlockTimePickerStyleVars = AUTO_API<BlockTimePickerStyleVars>()
