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
