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
