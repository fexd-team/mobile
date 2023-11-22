import { JSXDivElement } from '../../helpers/html.types'
import { FC } from '../../helpers/createFC'

export type ViewRef = HTMLDivElement

export interface ViewProps extends JSXDivElement {
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse'
  auto?: boolean
  height?: number
  width?: number
  center?: true | 'vertical' | 'horizontal'
  ref?: React.Ref<ViewRef>
}

export interface ViewType extends FC<ViewProps> {}
