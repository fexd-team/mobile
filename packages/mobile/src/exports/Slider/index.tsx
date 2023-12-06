import React, { useMemo, useCallback, useRef, useImperativeHandle } from 'react'
import { classnames, clamp, run, isNumber, isArray } from '@fexd/tools'

import useIOControl from '../useIOControl'
import createFC from '../createFC'
import useTouch, { TouchData } from '../useTouch'
import { SliderProps, SliderRef, SliderType } from './type'
// 此处不引入 style.less，目的是实现按需引用

/**
 * 简易的 ceil 数值限制函数，作用是将数值限制在基准值倍数上
 * 例如：
 *    simpleCeil(2.4, 1) ==> 2
 *    simpleCeil(2.5, 1) ==> 3
 *    simpleCeil(2.5, 2) ==> 2
 * @param num 被限制的数值
 * @param base 基准值
 */
function simpleCeil(num: number, base: number) {
  return base * Math.round(num / base)
}

export const prefix = 'exd-slider'
const Slider = createFC<SliderProps, SliderRef>(function Slider(
  {
    className,
    disabled,
    min: propMin,
    max: propMax,
    step: propStep,
    rate,
    vertical,
    onChange,
    onChangeCommitted,
    track,
    thumb,
    ...props
  },
  ref,
) {
  const min = propMin!
  const max = propMax!
  const step = propStep!
  const clampValue = (value: number) => clamp(simpleCeil(value, step), min, max)
  const clampPercent = (percent: number) => clamp((100 * (percent - min)) / (max - min), 0, 100)

  // 是否是单滑块状态，取决于 value 或 defaultValue 是否为 number 类型
  // FIXME: 当 value 与 defaultValue 类型不相符时，此处可能存在问题，待验证与修正
  const double = !isArray(props?.value) && !isArray(props?.defaultValue)
  const single = !double

  // 组件内 value 一律使用 [number, number]
  // 此处将 value 由 numler | [number, number] 格式化为 [number, number] 类型
  const normalizePropValue = (propKey: 'value' | 'defaultValue') => {
    if (propKey in props) {
      props[propKey] = (
        isNumber(props?.[propKey]) ? [min, props?.[propKey]] : isArray(props?.[propKey]) ? props?.[propKey] : [min, min]
      ) as any

      if (single) {
        ;(props[propKey] as [number, number])[0] = min
      }

      props[propKey] = (props[propKey]! as [number, number]).map(clampValue) as any
    }
  }
  normalizePropValue('defaultValue')
  normalizePropValue('value')

  // 以下为值相关逻辑
  const { value = [], setValue } = useIOControl<[number, number]>({
    ...(props as any),
    onChange(value) {
      if (single) {
        const nextValue = value[1]
        run(onChange, undefined, nextValue)
        return
      }

      run(onChange, undefined, value)
    },
  })
  const [valueFrom, valueTo] = value
  const percentFrom = useMemo(() => clampPercent(valueFrom!), [valueFrom])
  const percentTo = useMemo(() => clampPercent(valueTo!), [valueTo])
  const applyValue = (touches: TouchData[]) => {
    const percent2value = (percent: number) => (percent * (max - min)) / 100 + min
    const getTouchPercent = (touch: any): number => (vertical ? 100 - touch?.percentY : touch?.percentX)

    if (single || touches?.length === 1) {
      const [main] = touches
      const percent = getTouchPercent(main)
      const nextValue = percent2value(percent)
      const nextClampedValue = clampValue(nextValue)

      setValue(([valueFrom, valueTo] = [min, min]) => {
        if (single) {
          return [min, nextClampedValue]
        }

        const middle = (valueTo - valueFrom) / 2 + valueFrom // 左右值中间点

        if (nextValue > middle) {
          return [valueFrom, nextClampedValue]
        }

        return [nextClampedValue, valueTo]
      })

      return
    }

    // 支持双指操作
    if (touches?.length >= 2) {
      const [firstTouch, secondTouch] = touches
      const firstPercent = getTouchPercent(firstTouch)
      const sencondPercent = getTouchPercent(secondTouch)

      const [percentFrom, percentTo] =
        firstPercent < sencondPercent ? [firstPercent, sencondPercent] : [sencondPercent, firstPercent]

      setValue([clampValue(percent2value(percentFrom)), clampValue(percent2value(percentTo))])
    }

    return
  }

  // 以下为 DOM / Ref 相关逻辑
  const containerRef = useRef<SliderRef>(null)
  useImperativeHandle(ref, () => containerRef.current!)
  useTouch(containerRef, {
    disabled,
    rate,
    onStart: applyValue,
    onMove: applyValue,
    onEnd(current, prev) {
      if (single) {
        run(onChangeCommitted, undefined, valueTo)
        return
      }

      run(onChangeCommitted, undefined, value)
    },
  })

  return (
    <div
      {...(props as any)}
      ref={containerRef}
      className={classnames(prefix, className, {
        [`${prefix}-vertical`]: vertical,
        [`${prefix}-horizontal`]: !vertical,
        [`${prefix}-disabled`]: disabled,
      })}
    >
      <div className={classnames(`${prefix}-bar`)}>
        {thumb && (
          <>
            {!single && (
              <div
                className={classnames(`${prefix}-node`)}
                style={{ [vertical ? 'top' : 'left']: `${percentFrom}%` }}
              />
            )}
            <div className={classnames(`${prefix}-node`)} style={{ [vertical ? 'top' : 'left']: `${percentTo}%` }} />
          </>
        )}
        {track && (
          <div
            className={classnames(`${prefix}-track`)}
            style={
              single && track === 'inverted'
                ? {
                    [vertical ? 'top' : 'left']: `${percentTo - percentFrom}%`,
                    [vertical ? 'height' : 'width']: `${100 - (percentTo - percentFrom)}%`,
                  }
                : {
                    [vertical ? 'top' : 'left']: `${percentFrom}%`,
                    [vertical ? 'height' : 'width']: `${percentTo - percentFrom}%`,
                  }
            }
          />
        )}
      </div>
    </div>
  )
}) as SliderType

Slider.defaultProps = {
  defaultValue: [0, 0],
  min: 0,
  max: 100,
  step: 1,
  rate: 16,
  track: true,
  thumb: true,
  vertical: false,
}

export default Slider
