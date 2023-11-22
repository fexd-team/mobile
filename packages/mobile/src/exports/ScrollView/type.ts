import { JSXDivElement } from '../../helpers/html.types'

export type ScrollViewRef = HTMLDivElement
export interface ScrollViewProps extends JSXDivElement {
  children?: any
  className?: any
  distanceToReachEnd?: any
  onEndReached?: (done: () => void) => void
  distanceEvents?: any
  shadow?: any
  wrapperClassName?: any
  ref?: React.Ref<ScrollViewRef>
}
