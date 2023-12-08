import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps, PureUnstyledIOInputProps } from '../UnstyledIOInput/type'

export type LineInputRef = UnstyledIOInputRef
export interface PureLineInputProps extends PureUnstyledIOInputProps {}
export interface LineInputProps extends PureLineInputProps {}
export interface LineInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<PureLineInputProps>()
