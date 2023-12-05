import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export interface PortalProps {
  children: React.ReactNode
  className?: string
  to?: any
}
export type PortalRef = any
export interface PortalType extends FC<PortalProps> {}

export default AUTO_API<PortalProps>()
