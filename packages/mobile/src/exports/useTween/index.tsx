/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Tween } from '@fexd/tools'
import { EasingFunction } from '@fexd/tools/es/easing'
import { useGetState } from 'ahooks'

export interface TweenConfig {
  from?: number
  to?: number
  duration?: number
  ease?: EasingFunction
  loop?: boolean
}

export default function useTween(followValue: number, config: TweenConfig = {}) {
  const [value, setValue, getValue] = useGetState<number>(config.from ?? 0)
  const [tween] = useState(() => new Tween(config))

  const run = (config: TweenConfig = {}) =>
    tween
      .stop()
      .config({
        from: getValue(),
        ...config,
      })
      .restart()
  const to = (to: number) => run({ to })

  useEffect(() => {
    const updateListener = (value: number) => setValue(value)
    tween.on('update', updateListener)

    return () => {
      tween.off('update', updateListener)
    }
  }, [])

  useEffect(() => {
    to(followValue)
  }, [followValue])

  return {
    value,
    setValue,
    getValue,
    run,
    to,
    stop: tween.stop,
    core: tween,
  }
}
