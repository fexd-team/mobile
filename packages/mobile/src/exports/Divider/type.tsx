import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface DividerProps extends JSXDivProps {
  children?: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
  vertical?: boolean
}

export default AUTO_API<DividerProps>()

export interface DividerStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-divider'
   */
  '@divider-prefix'?: string
  /**
   * @description 水平分隔线左右外边距
   * @default 16px
   */
  '@divider-margin-x'?: string
  /**
   * @description 分隔线文字字体大小
   * @default 10px
   */
  '@divider-font-size'?: string
  /**
   * @description 分隔线最小宽度
   * @default 48px
   */
  '@divider-line-min-width'?: string
  /**
   * @description 分隔线文字水平内边距
   * @default 16px
   */
  '@divider-text-padding-x'?: string
  /**
   * @description 垂直分隔线左右外边距
   * @default 8px
   */
  '@divider-vertical-margin-x'?: string
  /**
   * @description 分隔线边框宽度
   * @default 1px
   */
  '@divider-line-border-width'?: string
}

export const DOC_DividerStyleVars = AUTO_API<DividerStyleVars>()
