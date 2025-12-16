import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export const sizes = ['small', 'normal', 'large'] as const
export const shapes = ['circle', 'square'] as const

type Size = (typeof sizes)[number]
type Shape = (typeof shapes)[number]

export interface AvatarProps extends JSXDivProps {
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

export default AUTO_API<AvatarProps>()

export interface AvatarStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-avatar'
   */
  '@avatar-prefix'?: string
  /**
   * @description Avatar 组合的 className 前缀
   * @default 'exd-avatar-group'
   */
  '@avatar-group-prefix'?: string
  /**
   * @description 大尺寸头像大小
   * @default 56px
   */
  '@avatar-large-size'?: string
  /**
   * @description 大尺寸头像字体大小
   * @default 24px
   */
  '@avatar-large-font-size'?: string
  /**
   * @description 标准尺寸头像大小
   * @default 32px
   */
  '@avatar-normal-size'?: string
  /**
   * @description 标准尺寸头像字体大小
   * @default 16px
   */
  '@avatar-normal-font-size'?: string
  /**
   * @description 小尺寸头像大小
   * @default 24px
   */
  '@avatar-small-size'?: string
  /**
   * @description 小尺寸头像字体大小
   * @default 12px
   */
  '@avatar-small-font-size'?: string
  /**
   * @description 头像背景颜色
   * @default ant-color-gray-4
   */
  '@avatar-background'?: string
  /**
   * @description 头像文字颜色
   * @default ant-color-cyan-4
   */
  '@avatar-color'?: string
  /**
   * @description 方形头像圆角大小
   * @default 3px
   */
  '@avatar-square-border-radius'?: string
  /**
   * @description Avatar 组合重叠距离
   * @default -8px
   */
  '@avatar-group-overlap'?: string
  /**
   * @description Avatar 组合边框宽度
   * @default 2px
   */
  '@avatar-group-border-width'?: string
  /**
   * @description Avatar 组合边框颜色
   * @default color-white (#fff)
   */
  '@avatar-group-border-color'?: string
  /**
   * @description Avatar 组合额外项背景色
   * @default ant-color-orange-2 (#ffe7ba)
   */
  '@avatar-group-extra-background'?: string
  /**
   * @description Avatar 组合额外项文字颜色
   * @default ant-color-orange-6 (#fa8c16)
   */
  '@avatar-group-extra-color'?: string
  /**
   * @description Avatar 组合额外项字体大小
   * @default 14px
   */
  '@avatar-group-extra-font-size'?: string
}

export const DOC_AvatarStyleVars = AUTO_API<AvatarStyleVars>()
