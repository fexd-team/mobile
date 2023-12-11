import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { isFunction, globalThis as root, run } from '@fexd/tools'

import createFC from '../createFC'
import { ProviderProps, ProviderRef, ProviderType } from './type'
import GlobalSharedOverlay from '../Modal/SharedOverlay/GlobalOverlay'
import ModalStation from '../ModalStation'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-provider'

const Provider = createFC<ProviderProps, ProviderRef>(function Provider({ children, __global, ...props }, ref) {
  useEffect(() => {
    // 如果不是全局 Provider，需要卸载掉全局的 Provider
    if (!__global) {
      const monted = `GLOBAL_FEXD_PROVIDER`
      const container = root.document?.getElementById(monted)
      if (container) {
        ReactDOM?.unmountComponentAtNode?.(container)
        container.remove()
        delete root[monted]
      }
    }
  }, [])

  /* 组件逻辑实现 */
  return (
    <>
      {children}
      <GlobalSharedOverlay />
      <ModalStation id="DEFAULT_STATION" />
    </>
  )
}) as ProviderType

Provider.defaultProps = {}

export default Provider

export async function renderGlobalProvider() {
  try {
    if (isFunction(ReactDOM?.render)) {
      return run(async () => {
        const monted = `GLOBAL_FEXD_PROVIDER`
        if (!root.document || root[monted]) {
          return true
        }
        const container = document.createElement('div')
        container.id = monted

        await new Promise((resolve) => {
          ReactDOM?.render?.(
            <>
              <GlobalSharedOverlay />
              <ModalStation id="DEFAULT_STATION" deleteStationMapKeyAfterUnmount={false} />
            </>,
            container,
            () => resolve(true),
          )
        })
        document.body.appendChild(container)
        root[monted] = true
        return true
      })
    }
    return Promise.resolve(true)
  } catch (error) {
    return Promise.resolve(false)
    // console.error(error)
  }
}
