import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOPickerRef, UnstyledIOPickerProps, PureUnstyledIOPickerProps } from '../UnstyledIOPicker/type'

export type BlockPickerRef = UnstyledIOPickerRef
export interface PureBlockPickerProps extends Omit<PureUnstyledIOPickerProps, 'theme'> {
  ref?: React.Ref<BlockPickerRef>
}
export interface BlockPickerProps extends Omit<UnstyledIOPickerProps, 'theme' | 'ref'> {}
export interface BlockPickerProps extends PureBlockPickerProps {}

export default AUTO_API<PureBlockPickerProps>()

/**
 * BlockPicker 样式变量
 */
export interface BlockPickerStyleVars {
  /**
   * @description 选择器值文字大小
   * @default 14px
   */
  '@block-picker-value-font-size'?: string
  /**
   * @description 禁用态文字颜色
   * @default #999
   */
  '@block-picker-disabled-color'?: string
  /**
   * @description 禁用态箭头颜色
   * @default #ccc
   */
  '@block-picker-disabled-arrow-color'?: string
  /**
   * @description 清除按钮颜色
   * @default #ccc
   */
  '@block-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@block-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default #a5a0a1
   */
  '@block-picker-arrow-color'?: string
}

export const DOC_BlockPickerStyleVars = AUTO_API<BlockPickerStyleVars>()
