import hoistStatics from 'hoist-non-react-statics'
import { creatorCache } from '../../helpers/createFC'

export default function cloneFC<T>(Component: T): T {
  const createComponent = creatorCache.get(Component)
  const ClonedComponent = createComponent()

  ClonedComponent.defaultProps = (Component as any).defaultProps || ClonedComponent.defaultProps || {}

  return hoistStatics(ClonedComponent, Component as any)
}
