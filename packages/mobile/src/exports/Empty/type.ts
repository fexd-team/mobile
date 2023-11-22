import { JSXDivElement } from '../../helpers/html.types'
import { FC } from '../../helpers/createFC'

export type EmptyRef = HTMLDivElement
export interface EmptyProps extends JSXDivElement {
  icon?: React.ReactNode
  iconStyle?: React.CSSProperties
  text?: React.ReactNode
}

export interface EmptyType extends FC<EmptyProps> {}
