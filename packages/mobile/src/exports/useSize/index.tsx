import { useEffect, useState } from 'react'
import { run } from '@fexd/tools'

type Size = { width: number; height: number }

export default function useSize(target: any): Size {
  const [state, setState] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = run<any>(entry.target, 'getBoundingClientRect')

        setState({
          width,
          height,
        })
      })
    })

    resizeObserver.observe(target?.current ?? target)
    return () => {
      resizeObserver.disconnect()
    }
  }, [target])

  return state
}
