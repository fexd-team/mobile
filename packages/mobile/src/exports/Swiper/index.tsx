/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import React, { useRef, useImperativeHandle, useEffect, useMemo, useCallback } from 'react'
import { classnames, isArray, run, debounce } from '@fexd/tools'
import { useMemoizedFn, usePrevious } from 'ahooks'

import Space from '../Space'
import useTween from '../useTween'
import useTouch from '../useTouch'
import useSize from '../useSize'
import useIOControl from '../useIOControl'
import createFC from '../createFC'
import { SwiperProps, SwiperRef, SwiperType } from './type'
// 此处不引入 style.less，目的是实现按需引用

function outQuad(pos: number) {
  return -(Math.pow(pos - 1, 2) - 1)
}

/**
 * 循环模式下对有序数组按当前坐标进行调整，例如
 * [0,1,2,3] 当前为 0 时，应得到 [2,3,0,1]，保证 0 左侧为尾值
 * 类似地，[0,1,2] 当前为 0 时，应得到 [2,0,1]
 * [0,1,2,3,4] 当前为 0 时，应得到 [3,4,0,1,2]
 */
function loopSort(length: number, currentIdx: number) {
  const middle = length / 2
  const groupItem = Array(length)
    .fill('')
    .map((_, currentIdx) => currentIdx)
  const loopRange = [...groupItem, ...groupItem, ...groupItem]
  const start = Math.round(length - middle)
  let range = currentIdx % length

  if (range < 0) {
    range += length
  }

  return loopRange.slice(start + range, start + length + range)
}

export const prefix = 'exd-swiper'
const Swiper = createFC<SwiperProps, SwiperRef>(function Swiper(
  {
    className,
    children: propChildren,
    interval,
    autoplay,
    loop: propLoop,
    swipeable,
    vertical,
    speed,
    easing,
    rate,
    preventDefault,
    stopPropagation,
    indicator,
    ...props
  },
  ref,
) {
  const children = useMemo(
    () => (isArray(propChildren) ? propChildren : [propChildren]).filter(Boolean),
    [propChildren],
  )
  const childrenLength = children?.length
  const loop = childrenLength >= 3 ? propLoop : false
  const containerRef = useRef<SwiperRef>()
  useImperativeHandle(ref, () => containerRef.current)
  const { width, height } = useSize(containerRef)
  const { value, setValue, getValue } = useIOControl(props)
  const prevPropValue = usePrevious(props?.value)
  /**
   * 循环模式下 value 的偏移值，用来修正内外 value 差值，例如：
   * 3 个子元素，loop 模式下元素由左往右 3 -> 1，内部视作 3 -> 4
   * 而真实 value 为 1，修正值为 4 - 1 === 3
   * 修正值可决定动画方向
   */
  const valueLoopOffset = useRef(0)
  const dragging = useRef(false)

  // 受控状态下，prevPropValue 变化时，计算动画方向
  useMemo(() => {
    // 非循环模式不计算、触摸滑动时不计算
    if (!loop || dragging.current) {
      return
    }

    const valueCross = [prevPropValue, value].join('')

    // 如果是首 -> 尾，则动画方向为 ←（纵向时为 ↑）
    if (valueCross === `0${childrenLength - 1}`) {
      valueLoopOffset.current = valueLoopOffset.current - childrenLength
    }

    // 如果是尾 -> 首，则动画方向为 →（纵向时为 ↓）
    if (valueCross === `${childrenLength - 1}0`) {
      valueLoopOffset.current = valueLoopOffset.current + childrenLength
    }
  }, [prevPropValue])

  // 内部 value，与外部 value 有所不同，参考 valueLoopOffset 的说明
  const stateValue = value + valueLoopOffset.current
  const size = vertical ? height : width
  // 根据当前的 value 值计算期望的呈现位置（偏移值，单位为百分比）
  const calcTargetOffsetPercent = useMemoizedFn(
    (value) => (size * (loop ? value : value % childrenLength) * -100) / size || 0,
  )
  // 期望的呈现位置（偏移值，单位为百分比）
  const targetOffsetPercent = useMemo(() => calcTargetOffsetPercent(stateValue), [stateValue])

  // 最大偏移值百分比，取值为内容的总宽或总高，用在非循环模式下，在抵达边缘时限制滑动
  const maxOffsetPercent = useMemo(() => (size * (childrenLength - 1) * -100) / size || 0, [size, childrenLength])

  // 缓动值，可将当前轮播图位置缓动到期望位置上
  const tween = useTween(targetOffsetPercent, {
    duration: speed,
    ease: easing,
  })

  // 当前滑动位置所对应的下标位
  const currentTweenIdx = Math.round(tween.value / -100)
  // 根据当前滑动下标做内容的排序，参考 loopSort 函数的说明
  const loopSortedIdx = useMemo(
    () => (loop ? loopSort(childrenLength, currentTweenIdx) : []),
    [loop, childrenLength, currentTweenIdx],
  )

  // 以下为自动播放相关，使用 setTimeout，可控性佳
  const autoplayTimer = useRef<any>()
  const stopAutoplay = () => clearTimeout(autoplayTimer.current)
  const startAutoplay = () => {
    stopAutoplay()

    if (!autoplay) {
      return
    }

    autoplayTimer.current = setTimeout(() => {
      const nextValue = getValue() + 1
      setValue(nextValue >= childrenLength ? 0 : nextValue)
    }, interval)
  }
  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [interval, autoplay, childrenLength, value])

  // 以下为触摸事件相关
  useTouch(containerRef, {
    disabled: !swipeable,
    rate,
    preventDefault,
    stopPropagation,
    onStart: () => {
      dragging.current = true
      stopAutoplay()
    },
    // 滑动时，累加每次滑动的增量来实现精细的偏移效果，并且可增加阻尼功能
    onMove([{ dPercentX, dPercentY }]) {
      tween.stop()
      tween.setValue((offset) => {
        // 滑动增量的阻尼系数
        const damping =
          // 非循环模式下时，抵达边缘时滑动阻尼增大
          (!loop && (offset > 0 || offset < maxOffsetPercent) ? 0.2 : 1) *
          // 纵向时阻尼增大以优化手感
          (vertical ? 0.66 : 0.88)

        return offset + (vertical ? dPercentY : dPercentX) * damping
      })
    },
    onEnd(current, [{ offsetPercentX, offsetPercentY, offsetX, offsetY }]) {
      const offsetPercent = vertical ? offsetPercentY : offsetPercentX
      const offset = vertical ? offsetY : offsetX
      // 单次滑动偏移值百分比大于 30%，或偏移像素值大于 200px 时，视作需要进行更新
      const shouldUpdate = Math.abs(offsetPercent) >= 30 || Math.abs(offset) >= 200

      // 滑动的方向
      const direction = offsetPercent > 0 ? 1 : -1
      const nextStateValue = getValue() + valueLoopOffset.current - direction
      const nextValue =
        (nextStateValue < 0 ? childrenLength + (nextStateValue % childrenLength) : nextStateValue) % childrenLength

      // 非循环状态下，不可越界，循环状态下不做限制
      if (shouldUpdate && (loop || (nextStateValue >= 0 && nextStateValue <= childrenLength - 1))) {
        valueLoopOffset.current = loop ? nextStateValue - nextValue : 0
        setValue(nextValue)
      } else {
        // 不更新则退回到当前的目标位置
        tween.to(targetOffsetPercent)
      }
      startAutoplay()
      dragging.current = false
    },
  })

  // 内部 value 修正值定期重置为 0
  const resetValueLoopOffset = useCallback(
    debounce(() => {
      if (dragging.current) {
        return
      }

      tween.setValue(calcTargetOffsetPercent(getValue()))
      valueLoopOffset.current = 0
    }, interval),
    [interval],
  )
  useEffect(() => {
    resetValueLoopOffset()
  }, [tween.value])

  return (
    <div
      {...props}
      ref={containerRef}
      className={classnames(prefix, className, {
        [`${prefix}-vertical`]: vertical,
        [`${prefix}-loop`]: loop,
      })}
      onChange={undefined}
    >
      <div
        className={`${prefix}-wrapper`}
        style={{
          transform: vertical ? `translateY(${tween.value}%)` : `translateX(${tween.value}%)`,
        }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`${prefix}-item`}
            style={
              loop
                ? {
                    // 循环状态下，每个子元素需按 loopSortedIdx 排序，结合当前的缓动位置，进行适当偏移，以实现循环效果
                    [vertical ? 'top' : 'left']: `${
                      (loopSortedIdx.indexOf(idx) - Math.floor(childrenLength / 2) + currentTweenIdx) * 100
                    }%`,
                  }
                : undefined
            }
          >
            {child}
          </div>
        ))}
      </div>
      {run(indicator, undefined, childrenLength, value + 1) || (
        <Space className={`${prefix}-indicator`} direction={vertical ? 'vertical' : 'horizontal'} gap={6}>
          {children.map((child, idx) => (
            <div
              key={idx}
              className={classnames(`${prefix}-indicator-item`, {
                [`${prefix}-indicator-item-active`]: idx === value % childrenLength,
              })}
            />
          ))}
        </Space>
      )}
    </div>
  )
}) as SwiperType

Swiper.defaultProps = {
  defaultValue: 0,
  interval: 3500,
  vertical: false,
  autoplay: true,
  loop: false,
  swipeable: true,
  speed: 300,
  easing: outQuad,
  rate: 0,
  preventDefault: true,
  stopPropagation: false,
}

export default Swiper
