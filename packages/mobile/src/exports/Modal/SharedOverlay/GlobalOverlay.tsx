import React, { useState, useEffect, useRef } from 'react'
import { render as renderComponent } from 'react-dom'
import { globalThis as root } from '@fexd/tools'

import { OverlayClassNamePrefix as prefix } from '../../Overlay'
import BasicModal from '../../BasicModal'
import { getAll, on } from './store'

const GLOBAL_OVERLAY_ID = `${prefix}-shared`
const GlobalSharedOverlay: React.FC<Record<string, unknown>> = function GlobalSharedOverlay() {
  const [visible, setVisible] = useState(false)
  const extraProps = useRef<any>({})

  useEffect(() => {
    const off = on('change', () => {
      const allOverlays = getAll()
      const visible = allOverlays.some((overlay) => !overlay.transparent)

      setVisible(visible)

      const firstOverlayProps = allOverlays[0] ?? {}

      delete firstOverlayProps.transparent
      extraProps.current = {
        ...extraProps.current,
        ...firstOverlayProps,
      }
    })

    return off
  }, [])

  return (
    <BasicModal
      modalId={GLOBAL_OVERLAY_ID}
      visible={visible}
      portalClassName={GLOBAL_OVERLAY_ID}
      type={GLOBAL_OVERLAY_ID}
      level="low"
      {...extraProps.current}
      maskTransparent={false}
      onExited={() => {
        extraProps.current = {}
      }}
    />
  )
}

export default GlobalSharedOverlay
export function render() {
  const monted = `${GLOBAL_OVERLAY_ID}_MOUNTED`
  if (!root.document || root[monted]) {
    return
  }
  const container = document.createElement('div')
  container.id = GLOBAL_OVERLAY_ID
  renderComponent(<GlobalSharedOverlay />, container)
  root[monted] = true
}
