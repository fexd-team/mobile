import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { JSXSpanProps } from '../../helpers/html.types'

export interface SpinnerProps extends JSXSpanProps {
  delay?: number
  ref?: React.Ref<HTMLSpanElement>
}
export type SpinnerRef = any
export interface SpinnerType extends FC<SpinnerProps> {}

export default AUTO_API<SpinnerProps>()

/**
 * Spinner 样式变量
 */
export interface SpinnerStyleVars {
  /**
   * @description 加载动画大小
   * @default 32px * @size-scale
   */
  '@spinner-size'?: string
}

export const DOC_SpinnerStyleVars = AUTO_API<SpinnerStyleVars>()
