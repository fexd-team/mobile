import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from '../UnstyledIOLabel/type'

export type CellIOLabelRef = UnstyledIOLabelRef

export interface CellIOLabelProps extends Omit<UnstyledIOLabelProps, 'theme'> {}

export default AUTO_API<CellIOLabelProps>()
