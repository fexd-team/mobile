import { JSXDivElement } from '../../helpers/html.types'

export const sizes = ['small', 'normal', 'large'] as const
export const shapes = ['circle', 'square'] as const

type Size = typeof sizes[number]
type Shape = typeof shapes[number]

export interface AvatarProps extends JSXDivElement {
  size?: Size
  shape?: Shape
  color?: string
  backgroundColor?: string
  src?: string
  alt?: string
  children?: React.ReactNode
  onLoad?: React.ReactEventHandler<HTMLImageElement>
  onError?: React.ReactEventHandler<HTMLImageElement>
}
export type AvatarRef = any
