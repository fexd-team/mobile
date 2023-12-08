import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps, PureUnstyledIOInputProps } from '../UnstyledIOInput/type'

export type BlockInputRef = UnstyledIOInputRef
export interface PureBlockInputProps extends PureUnstyledIOInputProps {}
export interface BlockInputProps extends PureBlockInputProps {}
export interface BlockInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<PureBlockInputProps>()
