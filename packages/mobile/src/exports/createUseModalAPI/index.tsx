import React, { useMemo } from 'react'
import uniqueId from '../uniqueId'
import ModalStation from '../ModalStation'
import { MethodType, MethodConfig } from '../createModalAPI/type'

export default function createUseModalAPI<P>(
  showMethod: MethodType<P>,
): () => [(config: Omit<Parameters<MethodType<P>>[0], 'stationId'>) => ReturnType<MethodType<P>>, React.ReactElement] {
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
