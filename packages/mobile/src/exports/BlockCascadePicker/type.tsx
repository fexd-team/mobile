import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import {
  UnstyledIOCascadePickerRef,
  UnstyledIOCascadePickerProps,
  PureUnstyledIOCascadePickerProps,
} from '../UnstyledIOCascadePicker/type'

export type BlockCascadePickerRef = UnstyledIOCascadePickerRef

export interface PureBlockCascadePickerProps extends Omit<PureUnstyledIOCascadePickerProps, 'theme'> {
  ref?: React.Ref<BlockCascadePickerRef>
}
export interface BlockCascadePickerProps extends Omit<UnstyledIOCascadePickerProps, 'theme' | 'ref'> {}
export interface BlockCascadePickerProps extends PureBlockCascadePickerProps {}

export default AUTO_API<PureBlockCascadePickerProps>()

export interface BlockCascadePickerStyleVars {
  /** @description 值文字大小 @default 14px */
  '@block-cascade-picker-value-font-size'?: string
  /** @description 禁用态文字颜色 @default #999 */
  '@block-cascade-picker-disabled-color'?: string
  /** @description 禁用态箭头颜色 @default #ccc */
  '@block-cascade-picker-disabled-arrow-color'?: string
  /** @description 清除按钮颜色 @default #ccc */
  '@block-cascade-picker-clear-color'?: string
  /** @description 箭头图标大小 @default 18px */
  '@block-cascade-picker-arrow-font-size'?: string
  /** @description 箭头图标颜色 @default #a5a0a1 */
  '@block-cascade-picker-arrow-color'?: string
}

export const DOC_BlockCascadePickerStyleVars = AUTO_API<BlockCascadePickerStyleVars>()
