import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from '../UnstyledIOLabel/type'

export type BlockIOLabelRef = UnstyledIOLabelRef

export interface BlockIOLabelProps extends Omit<UnstyledIOLabelProps, 'theme'> {}

export default AUTO_API<BlockIOLabelProps>()
