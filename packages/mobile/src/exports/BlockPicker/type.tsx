import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOPickerRef, UnstyledIOPickerProps } from '../UnstyledIOPicker/type'

export type BlockPickerRef = UnstyledIOPickerRef
export interface BlockPickerProps extends Omit<UnstyledIOPickerProps, 'theme'> {}

export default AUTO_API<BlockPickerProps>()
