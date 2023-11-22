/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { throttle } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'

type AnyFunction = (...args: any[]) => any

export default function useThrottleFn<T extends AnyFunction>(fn: T, wait: number): T {
  const memoizedFn = useMemoizedFn<T>(fn)
  return useMemo<T>(() => (wait > 0 ? throttle(memoizedFn as any, wait) : memoizedFn), [wait])
}
