import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps, PureUnstyledIOInputProps } from '../UnstyledIOInput/type'

export type CellInputRef = UnstyledIOInputRef
export interface PureCellInputProps extends PureUnstyledIOInputProps {}
export interface CellInputProps extends PureCellInputProps {}
export interface CellInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<PureCellInputProps>()
