import { useCallback, useMemo } from 'react'
import { EventBus, debounce } from '@fexd/tools'

import { OverlayProps } from '../../Overlay'

interface SharedOverlayInfo extends Omit<OverlayProps, 'visible'> {}

const eventBus = new EventBus()
const overlays = new Map<string, SharedOverlayInfo>()

export function getAll(): SharedOverlayInfo[] {
  return [...overlays.values()]
}

export function add(id: string, overlay: SharedOverlayInfo) {
  overlays.set(id, overlay)
  eventBus.emit('change')
}

export function remove(id: string) {
  overlays.delete(id)
  eventBus.emit('change')
}

export const on = (event: string, handler: (...args: any[]) => any) => {
  eventBus.on(event, handler)

  return () => {
    eventBus.off(event, handler)
  }
}
