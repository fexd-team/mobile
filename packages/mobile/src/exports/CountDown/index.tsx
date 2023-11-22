import { useState, useEffect, useRef } from 'react'
import { value } from '@fexd/tools'

import { CountDownProps } from './type'
import createFC from '../../helpers/createFC'

const fix0 = Array.from({ length: 10 }, (_, i) => `0${i}`)
const formatTime = (t: number) => {
  let h = t / 1000 / 3600
  let m = (h - Math.floor(h)) * 60
  let s = (m - Math.floor(m)) * 60
  h = Math.floor(h).toString() as unknown as number
  m = Math.floor(m).toString() as unknown as number
  s = Math.floor(s).toString() as unknown as number

  return `${value(fix0[h], h)}:${value(fix0[m], m)}:${value(fix0[s], s)}`
}

const getCountDown = (deadline: number, localOffset = 0) => {
  if (!deadline) {
    return '-- -- --'
  }

  const date = Date.now() + localOffset

  return date < deadline ? formatTime(deadline - date) : '00:00:00'
}

const Countdown = createFC<CountDownProps, any>(function ({ deadline, localOffset }, ref) {
  const [countdown, setCountdown] = useState(() => getCountDown(deadline, localOffset))
  const interval = useRef<any>()

  const stop = () => clearInterval(interval.current)
  const count = () => {
    const countdown = getCountDown(deadline, localOffset)

    if (countdown === '00:00:00') {
      stop()
    }

    setCountdown(countdown)
  }

  const start = () => {
    count()
    interval.current = setInterval(count, 1000)
  }

  useEffect(() => {
    start()

    return stop
  }, [deadline, localOffset])

  return value(countdown, null)
})

export default Countdown
