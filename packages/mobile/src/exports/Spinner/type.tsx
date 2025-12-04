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
   * @description 组件的 className 前缀
   * @default 'exd-spin'
   */
  '@spinner-prefix'?: string
  /**
   * @description 加载动画大小
   * @default 32px
   */
  '@spinner-size'?: string
  /**
   * @description 圆环描边宽度
   * @default 3
   */
  '@spinner-stroke-width'?: number
  /**
   * @description 动画持续时间
   * @default 1.6s
   */
  '@spinner-animation-duration'?: string
}

export const DOC_SpinnerStyleVars = AUTO_API<SpinnerStyleVars>()
