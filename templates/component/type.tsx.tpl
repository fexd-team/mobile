import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'

export interface Pure{{ name }}Props {
  /** ref */
  ref?: React.Ref<{{ name }}Ref>
}

export interface {{ name }}Props extends Pure{{ name }}Props {}
export interface {{ name }}Props extends  Omit<JSXDivProps, 'ref'> {}

export type {{ name }}Ref = HTMLDivElement
export interface {{ name }}Type extends FC<{{ name }}Props> {}

export default AUTO_API<Pure{{ name }}Props>()
