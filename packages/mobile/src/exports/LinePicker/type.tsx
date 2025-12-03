import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOPickerRef, UnstyledIOPickerProps, PureUnstyledIOPickerProps } from '../UnstyledIOPicker/type'

export type LinePickerRef = UnstyledIOPickerRef
export interface PureLinePickerProps extends Omit<PureUnstyledIOPickerProps, 'theme'> {
  ref?: React.Ref<LinePickerRef>
}
export interface LinePickerProps extends Omit<UnstyledIOPickerProps, 'theme' | 'ref'> {}
export interface LinePickerProps extends PureLinePickerProps {}

export default AUTO_API<PureLinePickerProps>()

/**
 * LinePicker 样式变量
 */
export interface LinePickerStyleVars {
  /**
   * @description 选择器值文字大小
   * @default 14px
   */
  '@line-picker-value-font-size'?: string
  /**
   * @description 禁用态文字颜色
   * @default @ant-color-gray-7
   */
  '@line-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default @ant-color-gray-5
   */
  '@line-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@line-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default @ant-color-gray-6
   */
  '@line-picker-arrow-color'?: string
}

export const DOC_LinePickerStyleVars = AUTO_API<LinePickerStyleVars>()
