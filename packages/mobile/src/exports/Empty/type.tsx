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

export interface EmptyStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-empty'
   */
  '@empty-prefix'?: string
  /**
   * @description Empty 容器内边距
   * @default 32px
   */
  '@empty-padding'?: string
  /**
   * @description Empty 图标尺寸
   * @default 60px
   */
  '@empty-icon-size'?: string
  /**
   * @description Empty 图标颜色
   * @default @color-gray-disable (#bfbfbf)
   */
  '@empty-icon-color'?: string
  /**
   * @description Empty 图片宽度
   * @default 120px
   */
  '@empty-image-width'?: string
  /**
   * @description Empty 文字颜色
   * @default @color-gray-secondary (#8c8c8c)
   */
  '@empty-text-color'?: string
  /**
   * @description Empty 文字上边距
   * @default 12px
   */
  '@empty-text-margin-top'?: string
  /**
   * @description Empty 文字下边距
   * @default 16px
   */
  '@empty-text-margin-bottom'?: string
}

export const DOC_EmptyStyleVars = AUTO_API<EmptyStyleVars>()
