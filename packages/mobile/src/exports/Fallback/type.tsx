import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { JSXDivProps } from '../../helpers/html.types'

export interface ErrorInfoType {
  error?: Error | unknown
  isOfflineError?: boolean
  isSystemError?: boolean
}

export interface FallbackProps extends Omit<JSXDivProps, 'children'> {
  error?: Error | unknown
  icon?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  children?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  footer?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  console?: boolean
}
export type FallbackRef = any
export interface FallbackType extends FC<FallbackProps> {}

export default AUTO_API<FallbackProps>()

export interface FallbackStyleVars {
  /**
   * @description 容器内边距
   * @default 24px
   */
  '@fallback-padding'?: string
  /**
   * @description 图标字体大小
   * @default 100px
   */
  '@fallback-icon-font-size'?: string
  /**
   * @description 图标颜色
   * @default #eee
   */
  '@fallback-icon-color'?: string
  /**
   * @description 图标下外边距
   * @default 12px
   */
  '@fallback-icon-margin-bottom'?: string
  /**
   * @description 图片高度
   * @default 208px
   */
  '@fallback-img-height'?: string
  /**
   * @description 图片上外边距
   * @default 24px
   */
  '@fallback-img-margin-top'?: string
  /**
   * @description 图片下外边距
   * @default 16px
   */
  '@fallback-img-margin-bottom'?: string
  /**
   * @description Footer 上外边距
   * @default 18px
   */
  '@fallback-footer-margin-top'?: string
  /**
   * @description 内容文字颜色
   * @default #666
   */
  '@fallback-content-color'?: string
  /**
   * @description 内容文字大小
   * @default 14px
   */
  '@fallback-content-font-size'?: string
  /**
   * @description 内容最大行数
   * @default 5
   */
  '@fallback-content-line-clamp'?: string
  /**
   * @description Console 文字大小
   * @default 14px
   */
  '@fallback-console-font-size'?: string
  /**
   * @description Console 文字颜色
   * @default #999
   */
  '@fallback-console-color'?: string
  /**
   * @description Console 上外边距
   * @default 12px
   */
  '@fallback-console-margin-top'?: string
}

export const DOC_FallbackStyleVars = AUTO_API<FallbackStyleVars>()
