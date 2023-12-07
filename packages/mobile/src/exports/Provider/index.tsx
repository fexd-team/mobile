import React from 'react'
import ReactDOM from 'react-dom'
import { isFunction, globalThis as root, run } from '@fexd/tools'

import createFC from '../createFC'
import { ProviderProps, ProviderRef, ProviderType } from './type'
import GlobalSharedOverlay from '../Modal/SharedOverlay/GlobalOverlay'
import ModalStation from '../ModalStation'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-provider'
const Provider = createFC<ProviderProps, ProviderRef>(function Provider({ children, ...props }, ref) {
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

try {
  if (isFunction(ReactDOM?.render)) {
    run(() => {
      const monted = `GLOBAL_FEXD_PROVIDER`
      if (!root.document || root[monted]) {
        return
      }
      const container = document.createElement('div')
      container.id = monted
      ReactDOM?.render?.(<Provider />, container)
      root[monted] = true
    })
  }
} catch (error) {
  // console.error(error)
}
