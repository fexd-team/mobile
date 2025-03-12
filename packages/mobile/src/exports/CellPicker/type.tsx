import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOPickerRef, UnstyledIOPickerProps, PureUnstyledIOPickerProps } from '../UnstyledIOPicker/type'

export type CellPickerRef = UnstyledIOPickerRef
export interface PureCellPickerProps extends Omit<PureUnstyledIOPickerProps, 'theme'> {
  ref?: React.Ref<CellPickerRef>
}
export interface CellPickerProps extends Omit<UnstyledIOPickerProps, 'theme' | 'ref'> {}
export interface CellPickerProps extends PureCellPickerProps {}

export default AUTO_API<PureCellPickerProps>()
