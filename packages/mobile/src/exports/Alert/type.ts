import { JSXDivElement } from '../../helpers/html.types'

export const types = ['success', 'warning', 'info', 'error'] as const
type Type = typeof types[number]

export const variantTypes = ['outlined', 'filled'] as const
type VariantType = typeof variantTypes[number]
export interface AlertProps extends Omit<JSXDivElement, 'title'> {
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
