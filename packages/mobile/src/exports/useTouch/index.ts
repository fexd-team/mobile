/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback } from 'react'
import { run, uniqByKey } from '@fexd/tools'
import { useEventListener, useGetState } from 'ahooks'

import useThrottleFn from '../useThrottleFn'

function toFixed(num: number = 0, fractionDigits = 2) {
  return Number(num.toFixed(fractionDigits))
}

export interface TouchData {
  key: string
  x: number // 当前坐标（相对 target 元素） - 横向
  y: number // 当前坐标（相对 target 元素） - 纵向
  percentX: number // 当前坐标百分比 - 横向
  percentY: number // 当前坐标百分比 - 纵向
  dX: number // 当前坐标与上一次坐标的偏移值 - 横向
  dY: number // 当前坐标与上一次坐标的偏移值 - 纵向
  dPercentX: number // 当前坐标与上一次坐标的偏移值百分比 - 横向
  dPercentY: number // 当前坐标与上一次坐标的偏移值百分比 - 纵向
  offsetX: number // 当前坐标与初始 touchStart 坐标的偏移值 - 横向
  offsetY: number // 当前坐标与初始 touchStart 坐标的偏移值 - 纵向
  offsetPercentX: number // 当前坐标与初始 touchStart 坐标的偏移值百分比 - 横向
  offsetPercentY: number // 当前坐标与初始 touchStart 坐标的偏移值百分比 - 纵向
  tracks: TouchData[] // 轨迹历史
}

export interface UseTouchOption {
  rate?: number
  disabled?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  // premise?: any // 触发前提
  onStart?: (touches: TouchData[], prevTouches: TouchData[]) => void
  onMove?: (touches: TouchData[], prevTouches: TouchData[]) => void
  onEnd?: (touches: TouchData[], prevTouches: TouchData[]) => void
}

export const START_EVENT = 'onStart'
export const MOVE_EVENT = 'onMove'
export const END_EVENT = 'onEnd'

export default function useTouch(
  target: any,
  {
    disabled,
    rate: wait = 16,
    preventDefault = true,
    stopPropagation = false,
    // premise = () => true,
    ...restOption
  }: UseTouchOption = {},
) {
  const [touches, setTouches, getTouches] = useGetState<TouchData[]>([])

  const getTargetClientRect = () => {
    const targetDom = target?.current ?? target
    const targetRect = run<any>(targetDom, 'getBoundingClientRect')
    return targetRect
  }

  // 将 MouseEvent 和 TouchEvent 格式化为统一格式数据
  const normalize = (touch: any) => {
    const targetRect = getTargetClientRect()
    const x = toFixed(touch?.clientX - targetRect?.left)
    const y = toFixed(touch?.clientY - targetRect?.top)

    return {
      key: `${x},${y}`,
      x,
      y,
      percentX: toFixed((x * 100) / targetRect?.width),
      percentY: toFixed((y * 100) / targetRect?.height),
    }
  }
  const getNextTouches = (touches: any[], currentTouches: TouchData[]) => {
    const targetRect = getTargetClientRect()
    return touches.map((touch, idx) => {
      const nextTouches = normalize(touch)
      const currentTracks = currentTouches[idx]?.tracks ?? []
      const currentPosition: any = currentTracks[currentTracks?.length - 1] ?? nextTouches
      const firstPosition: any = currentTracks[0] ?? nextTouches
      const dX = toFixed(nextTouches.x - currentPosition?.x)
      const dY = toFixed(nextTouches.y - currentPosition?.y)
      const dPercentX = toFixed((dX * 100) / targetRect?.width)
      const dPercentY = toFixed((dY * 100) / targetRect?.height)
      const offsetX = toFixed(nextTouches.x - firstPosition?.x)
      const offsetY = toFixed(nextTouches.y - firstPosition?.y)
      const offsetPercentX = toFixed((offsetX * 100) / targetRect?.width)
      const offsetPercentY = toFixed((offsetY * 100) / targetRect?.height)

      return {
        ...nextTouches,
        dX,
        dY,
        dPercentX,
        dPercentY,
        offsetX,
        offsetY,
        offsetPercentX,
        offsetPercentY,
        tracks: uniqByKey<TouchData>([...currentTracks, nextTouches], 'key'), // 轨迹历史
      }
    })
  }
  const updateTouches = useThrottleFn((lifecycle, eventTouches: any = []) => {
    const currentTouches = getTouches()
    const nextTouches = getNextTouches(eventTouches, currentTouches)

    if (currentTouches?.length === 0 && nextTouches?.length === 0) {
      return
    }

    setTouches(nextTouches)
    run(restOption, lifecycle, nextTouches, currentTouches ?? nextTouches ?? [])
  }, wait)
  const shouldMouseEventPreventDefaultRef = useRef(false)
  const wrapEventHandler = (handler: (e: any) => void) => (e: any) => {
    if (disabled) {
      return
    }

    if (stopPropagation) {
      e.stopPropagation()
    }
    // preventDefault 需要排除 touchstart、touchend 事件，否则点击行为将失效
    if (preventDefault && !['touchstart', 'touchend'].includes(e?.type) && shouldMouseEventPreventDefaultRef.current) {
      e.preventDefault()
    }

    // 鼠标按下时，不阻止默认行为，否则用户无法选中文本
    if (e?.type === 'mousedown') {
      shouldMouseEventPreventDefaultRef.current = true
    }

    if (e?.type === 'mouseup') {
      shouldMouseEventPreventDefaultRef.current = false
    }

    const eventTouches = 'touches' in e ? [...(e.touches ?? [])] : [e]

    handler(eventTouches)
  }

  // 以下是各种事件监听
  const getTouchEventOption = useCallback(
    (lifecycle: string): [any, any] => [
      wrapEventHandler((eventTouches) => {
        updateTouches(lifecycle, eventTouches)
      }),
      { target },
    ],
    [],
  )
  useEventListener('touchstart', ...getTouchEventOption(START_EVENT))
  useEventListener('touchmove', ...getTouchEventOption(MOVE_EVENT))
  useEventListener('touchend', ...getTouchEventOption(END_EVENT))

  // 以下兼容鼠标事件
  const mouseDown = useRef(false)
  const getMouseEventOption = useCallback(
    (lifecycle: string): [any, any] => [
      wrapEventHandler((eventTouches) => {
        if (!mouseDown.current && (lifecycle === MOVE_EVENT || lifecycle === END_EVENT)) {
          return
        }

        updateTouches(lifecycle, lifecycle === END_EVENT ? [] : eventTouches)
        if (lifecycle === START_EVENT) {
          mouseDown.current = true
        }

        if (lifecycle === END_EVENT) {
          mouseDown.current = false
        }
      }),
      { target: lifecycle === START_EVENT ? target : document.documentElement },
    ],
    [],
  )
  useEventListener('mousedown', ...getMouseEventOption(START_EVENT))
  useEventListener('mousemove', ...getMouseEventOption(MOVE_EVENT))
  useEventListener('mouseup', ...getMouseEventOption(END_EVENT))
  useEventListener('mouseleave', ...getMouseEventOption(END_EVENT)) // 鼠标移出容器时视为触摸结束

  return {
    main: touches[0],
    touches,
  }
}
