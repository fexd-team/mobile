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

export interface DemoBlockStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-demo-block'
   */
  '@demo-block-prefix'?: string
  /**
   * @description 背景颜色
   * @default #fff
   */
  '@demo-block-background'?: string
  /**
   * @description 内边距
   * @default 1px
   */
  '@demo-block-padding'?: string
  /**
   * @description 相邻 DemoBlock 的上外边距
   * @default 12px
   */
  '@demo-block-margin-top'?: string
  /**
   * @description 标题字体大小
   * @default 16px
   */
  '@demo-block-title-font-size'?: string
  /**
   * @description 标题颜色
   * @default #666
   */
  '@demo-block-title-color'?: string
  /**
   * @description 标题上内边距
   * @default 12px
   */
  '@demo-block-title-padding-top'?: string
  /**
   * @description 标题水平内边距
   * @default 16px
   */
  '@demo-block-title-padding-x'?: string
  /**
   * @description 内容区域内边距
   * @default 16px
   */
  '@demo-block-content-padding'?: string
  /**
   * @description Plain 模式标题颜色
   * @default #999
   */
  '@demo-block-plain-title-color'?: string
  /**
   * @description Plain 模式标题垂直内边距
   * @default 12px
   */
  '@demo-block-plain-title-padding-y'?: string
  /**
   * @description Plain 模式标题水平内边距
   * @default 16px
   */
  '@demo-block-plain-title-padding-x'?: string
  /**
   * @description Plain 模式标题字体大小
   * @default 14px
   */
  '@demo-block-plain-title-font-size'?: string
}

export const DOC_DemoBlockStyleVars = AUTO_API<DemoBlockStyleVars>()
