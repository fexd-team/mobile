import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export const types = ['success', 'warning', 'info', 'error'] as const
type Type = (typeof types)[number]

export const variantTypes = ['outlined', 'filled'] as const
type VariantType = (typeof variantTypes)[number]
export interface AlertProps extends Omit<JSXDivProps, 'title'> {
  type?: Type
  showIcon?: boolean
  closable?: boolean
  closeText?: React.ReactNode
  variant?: VariantType
  icon?: React.ReactNode
  title?: React.ReactNode
  children: React.ReactNode
  onClose?: React.MouseEventHandler
}
export type AlertRef = any

export default AUTO_API<AlertProps>()
