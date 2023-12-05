import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from '../UnstyledIOLabel/type'

export type LineIOLabelRef = UnstyledIOLabelRef

export interface LineIOLabelProps extends Omit<UnstyledIOLabelProps, 'theme'> {}

export default AUTO_API<LineIOLabelProps>()
