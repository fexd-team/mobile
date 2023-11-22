import { useRef, useEffect } from 'react'
import { run, clamp } from '@fexd/tools'

import classList from '../../helpers/classList'

export interface ScrollLockOptions {
  elements: any[]
  lock: boolean
}

const lockClassName = 'exd-scroll-lock'
const lockHandler = (e: Event) => e.preventDefault()
type unlockFn = () => void

// 多个 lock 来源作用于同一元素时，进行计数处理
const counter = new Map()

export function scrollLock(element: any): unlockFn {
  // 计数加锁
  const count = counter.get(element) ?? 0
  if (count === 0) {
    classList(element).add(lockClassName)
    run(element, 'addEventListener', lockHandler, { passive: false })
  }
  counter.set(element, count + 1)

  return () => {
    // 计数解锁
    const count = counter.get(element) ?? 0
    if (count - 1 === 0) {
      classList(element).remove(lockClassName)
      run(element, 'removeEventListener', lockHandler, { passive: false })
    }
    counter.set(element, clamp(count - 1, 0))
  }
}

export default function useScrollLock(options: ScrollLockOptions) {
  const { lock: needLock, elements } = options
  const elementListRef = useRef<any[]>([])
  elementListRef.current = elements

  useEffect(() => {
    if (!needLock) {
      return
    }

    const unlockFuncList = elementListRef.current.map((element) => scrollLock(run(element)))

    return () => {
      unlockFuncList.forEach((fn) => run(fn))
    }
  }, [needLock])
}
