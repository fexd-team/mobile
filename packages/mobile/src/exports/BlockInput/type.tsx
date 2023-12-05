import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps } from '../UnstyledIOInput/type'

export type BlockInputRef = UnstyledIOInputRef
export interface BlockInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<BlockInputProps>()
