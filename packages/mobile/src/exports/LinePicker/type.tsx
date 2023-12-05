import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOPickerRef, UnstyledIOPickerProps } from '../UnstyledIOPicker/type'

export type LinePickerRef = UnstyledIOPickerRef
export interface LinePickerProps extends Omit<UnstyledIOPickerProps, 'theme'> {}

export default AUTO_API<LinePickerProps>()
