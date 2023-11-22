import { useState, useCallback } from 'react'

export default function useForcedUpdate(): [() => void, number] {
  const [renderKey, setRenderKey] = useState(Math.random)
  const forcedUpdate = useCallback(() => setRenderKey(Math.random), [])

  return [forcedUpdate, renderKey]
}
