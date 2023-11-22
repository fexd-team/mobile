import React, { useEffect } from 'react'

import { OverlayProps } from '../../Overlay'
import { render as renderGlobalOverlay } from './GlobalOverlay'
import { add, remove } from './store'

interface SharedOverlayProps extends OverlayProps {
  modalId: string
}
const SharedOverlay: React.FC<SharedOverlayProps> = function GlobalSharedOverlay({ visible, modalId, ...props }) {
  useEffect(() => {
    if (!visible) {
      return
    }

    add(modalId, props)

    return () => {
      remove(modalId)
    }
  }, [visible])

  return null
}

renderGlobalOverlay()

export default SharedOverlay
