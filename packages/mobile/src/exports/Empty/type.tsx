import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'

export type EmptyRef = HTMLDivElement
export interface EmptyProps extends JSXDivProps {
  icon?: React.ReactNode
  iconStyle?: React.CSSProperties
  text?: React.ReactNode
}

export interface EmptyType extends FC<EmptyProps> {}

export default AUTO_API<EmptyProps>()
