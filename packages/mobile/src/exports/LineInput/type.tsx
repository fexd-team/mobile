import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps } from '../UnstyledIOInput/type'

export type LineInputRef = UnstyledIOInputRef
export interface LineInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<LineInputProps>()
