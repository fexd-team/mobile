import AUTO_API from '../../../helpers/AUTO_API'
import { JSXDivProps } from '../../../helpers/html.types'

export interface AvatarGroupProps extends JSXDivProps {
  max?: number
  total?: number
}
export type AvatarGroupRef = any

export default AUTO_API<AvatarGroupProps>()
