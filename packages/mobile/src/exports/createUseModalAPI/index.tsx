import React, { useMemo } from 'react'
import uniqueId from '../uniqueId'
import ModalStation from '../ModalStation'
import { MethodType, MethodConfig, ModalMethodController } from '../createModalAPI/type'

export default function createUseModalAPI<P>(
  showMethod: MethodType<P>,
): () => [(config: Omit<MethodConfig<P>, 'stationId'>) => ModalMethodController<P>, React.ReactElement] {
  return function useShowModal() {
    const stationId = useMemo(() => uniqueId('modal-station'), [])

    const showWithStation = useMemo(
      () => (config: Omit<MethodConfig<P>, 'stationId'>) => {
        return showMethod({
          ...config,
          stationId,
        } as any)
      },
      [stationId],
    )

    const station = useMemo(() => <ModalStation id={stationId} />, [stationId])

    return [showWithStation, station]
  }
}
