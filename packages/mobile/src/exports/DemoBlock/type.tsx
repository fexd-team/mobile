import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'

export interface PureDemoBlockProps {
  /** ref */
  ref?: React.Ref<DemoBlockRef>
  title?: string
  inline?: boolean
  plain?: boolean
  children?: any
}

export interface DemoBlockProps extends PureDemoBlockProps {}
export interface DemoBlockProps extends Omit<JSXDivProps, 'ref' | 'children'> {}

export type DemoBlockRef = HTMLDivElement
export interface DemoBlockType extends FC<DemoBlockProps> {}

export default AUTO_API<PureDemoBlockProps>()
