import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIOTimePickerRef,
  UnstyledIOTimePickerProps,
  PureUnstyledIOTimePickerProps,
} from '../UnstyledIOTimePicker/type'

export type LineTimePickerRef = UnstyledIOTimePickerRef

export interface PureLineTimePickerProps extends Omit<PureUnstyledIOTimePickerProps, 'theme'> {
  ref?: React.Ref<LineTimePickerRef>
}
export interface LineTimePickerProps extends Omit<UnstyledIOTimePickerProps, 'theme' | 'ref'> {}
export interface LineTimePickerProps extends PureLineTimePickerProps {}

/**
 * LineTimePicker 样式变量
 */
export interface LineTimePickerStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-7
   */
  '@line-time-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-5
   */
  '@line-time-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@line-time-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default ant-color-gray-6
   */
  '@line-time-picker-arrow-color'?: string
}

export default AUTO_API<PureLineTimePickerProps>()
export const DOC_LineTimePickerStyleVars = AUTO_API<LineTimePickerStyleVars>()
