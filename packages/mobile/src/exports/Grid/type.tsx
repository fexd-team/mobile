import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface GridProps extends JSXDivProps {
  children?: React.ReactNode
  // ref?: React.Ref<HTMLDivElement>
  vertical?: boolean
  gutter?: [number, number]
  columns?: number
  border?: boolean
  center?: boolean
  square?: boolean
}

export default AUTO_API<GridProps>()

/**
 * Grid 样式变量
 */
export interface GridStyleVars {
  /**
   * @description Grid 组件样式前缀
   * @default 'exd-grid'
   */
  '@grid-prefix'?: string
  /**
   * @description Grid 字体大小
   * @default 10px
   */
  '@grid-font-size'?: string
  /**
   * @description Grid.Item 组件样式前缀
   * @default 'exd-grid-item'
   */
  '@grid-item-prefix'?: string
  /**
   * @description 图标大小
   * @default 20px
   */
  '@grid-item-icon-size'?: string
  /**
   * @description 文字字体大小
   * @default 12px
   */
  '@grid-item-text-font-size'?: string
  /**
   * @description 文字行高
   * @default 1.5
   */
  '@grid-item-text-line-height'?: string | number
  /**
   * @description 文字上外边距（垂直布局）
   * @default 8px
   */
  '@grid-item-text-margin-top'?: string
  /**
   * @description 文字左外边距（水平布局）
   * @default 8px
   */
  '@grid-item-text-margin-left'?: string
  /**
   * @description 内容区垂直内边距
   * @default 16px
   */
  '@grid-item-padding-y'?: string
  /**
   * @description 内容区水平内边距
   * @default 8px
   */
  '@grid-item-padding-x'?: string
  /**
   * @description 背景色
   * @default #fff
   */
  '@grid-item-background'?: string
  /**
   * @description 点击态背景色
   * @default #f2f3f5
   */
  '@grid-item-active-background'?: string
  /**
   * @description 全局尺寸缩放比例
   * @default 1
   */
  '@size-scale'?: string | number
  /**
   * @description 文字颜色
   * @default #262626
   */
  '@color-gray-primary'?: string
  /**
   * @description 边框颜色
   * @default #d9d9d9
   */
  '@color-gray-border'?: string
}

export const DOC_GridStyleVars = AUTO_API<GridStyleVars>()
