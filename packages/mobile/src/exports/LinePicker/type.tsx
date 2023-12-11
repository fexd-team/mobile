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
