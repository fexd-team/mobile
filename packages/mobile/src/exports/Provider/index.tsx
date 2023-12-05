import React from 'react'
import createFC from '../createFC'
import { ProviderProps, ProviderRef, ProviderType } from './type'
import GlobalSharedOverlay from '../Modal/SharedOverlay/GlobalOverlay'
import ModalStation from '../ModalStation'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-provider'
const Provider = createFC<ProviderProps, ProviderRef>(function Provider(props, ref) {
  /* 组件逻辑实现 */
  return (
    <>
      Provider
      <GlobalSharedOverlay />
      <ModalStation id="DEFAULT_STATION" />
    </>
  )
}) as ProviderType

Provider.defaultProps = {}

export default Provider
