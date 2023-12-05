import React, { forwardRef, memo, ForwardRefRenderFunction } from 'react'
import { FC } from './type'

export const creatorCache = new Map()

export default function createFC<P = Record<string, unknown>, T = unknown>(
  render: ForwardRefRenderFunction<T, P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
): FC<P> {
  const createFunctionalComponent = (): FC<P> => {
    // 避免 forwardRef 参数长度警告
    if (render?.length < 2) {
      Object.defineProperty(render, 'length', {
        get() {
          return 2
        },
      })
    }
    const Component = memo<any>(forwardRef<T, P>(render), propsAreEqual) as unknown as FC<P>
    Component.defaultProps = {}
    return Component
  }

  const Component = createFunctionalComponent()
  creatorCache.set(Component, createFunctionalComponent)
  return Component as FC<P>
}
