import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { EventBus } from '@fexd/tools'

export type ModelHook<T = any, P = any> = (hookArg: P) => T

export interface UseModel<T> {
  (): T
  data?: T
}

export default function createModel<T, P>(useCustomizedHook: ModelHook<T, P>, initialState?: P) {
  const dom = document.createElement('div')
  const eventBus = new EventBus()
  const useModel: UseModel<T> = () => {
    const [state, setState] = useState(useModel.data as T)

    useEffect(() => {
      const listener = (nextState: T) => {
        setState(nextState)
      }
      eventBus.on('update', listener)

      return () => {
        eventBus.off('update', listener)
      }
    }, [])

    return state
  }

  function Model() {
    const state = useCustomizedHook(initialState as P)

    useEffect(() => {
      eventBus.emit('update', state)
      useModel.data = state
    }, [state])

    return null
  }

  Model.displayName = useCustomizedHook.name || 'Model'
  render(<Model />, dom)

  return useModel
}
