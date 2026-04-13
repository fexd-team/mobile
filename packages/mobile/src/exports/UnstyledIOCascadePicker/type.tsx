import React from 'react'
import { FC } from '../createFC/type'
import { PureCascadePickerProps, CascadePickerProps, CascadePickerRef } from '../CascadePicker/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOCascadePickerRef = CascadePickerRef

export interface PureUnstyledIOCascadePickerProps
  extends Omit<UnstyledIOLabelProps, 'children' | 'onClick' | 'defaultValue' | 'onChange'> {
  /** 值改变的回调 */
  onChange?: PureCascadePickerProps['onChange']
}
export interface PureUnstyledIOCascadePickerProps extends Omit<PureCascadePickerProps, 'onChange'> {}
export interface PureUnstyledIOCascadePickerProps {
  classNamePrefix?: string
  className?: string
  /** 当前控件的名称 */
  label?: React.ReactNode
  /** 当前控件的提示状态 */
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIOCascadePickerRef>
  theme?: UnstyledIOLabelProps['theme']
  /**
   * @description 右侧箭头图标
   * @default <ChevronForwardSharp />
   */
  arrowIcon?: React.ReactNode
  /**
   * @description 格式化展示文本的分隔符
   * @default ' / '
   */
  separator?: string
}

export interface UnstyledIOCascadePickerProps extends Omit<CascadePickerProps, 'prefix' | 'placeholder'> {}
export interface UnstyledIOCascadePickerProps extends PureUnstyledIOCascadePickerProps {}

export interface UnstyledIOCascadePickerType extends FC<UnstyledIOCascadePickerProps> {}
