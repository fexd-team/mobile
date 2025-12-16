import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export type ScrollViewRef = HTMLDivElement
export interface ScrollViewProps extends JSXDivProps {
  children?: any
  className?: any
  distanceToReachEnd?: any
  onEndReached?: (done: () => void) => void
  distanceEvents?: any
  shadow?: any
  wrapperClassName?: any
  ref?: React.Ref<ScrollViewRef>
}

export default AUTO_API<ScrollViewProps>()

/**
 * ScrollView 样式变量
 */
export interface ScrollViewStyleVars {
  /**
   * @description 全局尺寸缩放比例
   * @default 1
   */
  '@size-scale'?: string | number
}

export const DOC_ScrollViewStyleVars = AUTO_API<ScrollViewStyleVars>()
