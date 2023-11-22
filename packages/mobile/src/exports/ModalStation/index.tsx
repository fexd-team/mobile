import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { isFunction } from '@fexd/tools'

// interface IStationMap {
//   [id: string]: any
// }

type IStationMap = Record<string, unknown>

export const stationMap: IStationMap = {}
export default function ModalStation({ id }: { id: string }) {
  const [modalMap, setModalMap] = useState<any>({})

  useEffect(() => {
    stationMap[id] = {
      add: (id: string, render: () => React.ReactElement) =>
        setModalMap((map: Record<string, unknown>) => ({
          ...map,
          [id]: render,
        })),
      remove: (id: string) =>
        setModalMap((map: Record<string, unknown>) => ({
          ...map,
          [id]: undefined,
        })),
    }

    return () => {
      delete stationMap[id]
    }
  }, [])

  return (
    <div>
      {Object.entries(modalMap)
        .filter(([, render]) => isFunction(render))
        .map(([key, render]: any) => (
          <div key={key}>{render()}</div>
        ))}
    </div>
  )
}

const container = document.createElement('div')
render(<ModalStation id="DEFAULT_STATION" />, container)
