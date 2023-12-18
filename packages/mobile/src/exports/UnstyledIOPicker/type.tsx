import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { PurePickerProps, PickerProps, PickerRef } from '../Picker/type'
import { PickerOptionValue, PickerOption } from '../PickerView/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOPickerRef = PickerRef

export interface PureUnstyledIOPickerProps
  extends Omit<UnstyledIOLabelProps, 'children' | 'onChange' | 'defaultValue'> {
  /** 值改变的回调函数 */
  onChange?: (value: PickerOptionValue, item: PickerOption) => void
}
export interface PureUnstyledIOPickerProps extends PurePickerProps {}
export interface PureUnstyledIOPickerProps {
  classNamePrefix?: string
  className?: string
  /** 当前控件的名称 */
  label?: React.ReactNode
  /** 当前控件的提示状态 */
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIOPickerRef>
  theme?: UnstyledIOLabelProps['theme']

  /**
   * @description 右侧箭头图标
   * @default <ChevronForwardSharp />
   */
  arrowIcon?: React.ReactNode
}

export interface UnstyledIOPickerProps extends PickerProps {}
export interface UnstyledIOPickerProps extends PureUnstyledIOPickerProps {}

export default AUTO_API<PureUnstyledIOPickerProps>()
