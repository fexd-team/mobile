import { JSXDivProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'

export type ViewRef = HTMLDivElement

export interface ViewProps extends JSXDivProps {
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse'
  auto?: boolean
  height?: number
  width?: number
  center?: true | 'vertical' | 'horizontal'
  ref?: React.Ref<ViewRef>
}

export interface ViewType extends FC<ViewProps> {}
