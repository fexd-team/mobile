import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIODatePickerRef,
  UnstyledIODatePickerProps,
  PureUnstyledIODatePickerProps,
} from '../UnstyledIODatePicker/type'

export type LineDatePickerRef = UnstyledIODatePickerRef

export interface PureLineDatePickerProps extends Omit<PureUnstyledIODatePickerProps, 'theme'> {
  ref?: React.Ref<LineDatePickerRef>
}
export interface LineDatePickerProps extends Omit<UnstyledIODatePickerProps, 'theme' | 'ref'> {}
export interface LineDatePickerProps extends PureLineDatePickerProps {}

/**
 * LineDatePicker 样式变量
 */
export interface LineDatePickerStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-7
   */
  '@line-date-picker-disabled-color'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-5
   */
  '@line-date-picker-clear-color'?: string
  /**
   * @description 箭头图标大小
   * @default 18px
   */
  '@line-date-picker-arrow-font-size'?: string
  /**
   * @description 箭头图标颜色
   * @default ant-color-gray-6
   */
  '@line-date-picker-arrow-color'?: string
}

export default AUTO_API<PureLineDatePickerProps>()
export const DOC_LineDatePickerStyleVars = AUTO_API<LineDatePickerStyleVars>()
