import React, { useImperativeHandle, useMemo } from 'react'
import { classnames, clamp } from '@fexd/tools'
import { Star } from '@fexd/icons'
import { useMemoizedFn } from 'ahooks'

import useTouch from '../useTouch'
import useIOControl from '../useIOControl'
import createFC from '../createFC'
import { RateProps } from './type'

export const prefix = 'exd-rate'
const Rate = createFC<RateProps, HTMLDivElement>(function Rate(
  { count, readOnly, character, className, allowHalf, disabled, size, ...props },
  forwardedRef,
) {
  /* 组件逻辑实现 */
  const { value: currentValue, setValue } = useIOControl(props)
  const characterList = useMemo(() => Array(count).fill(null), [count])
  const containerRef = React.useRef<HTMLDivElement>(null)
  const touchingRef = React.useRef(false)
  const applyValue = useMemoizedFn((value: number) => {
    if (disabled || readOnly) return
    setValue(clamp(value, 0, count))
  })
  const applyTouch = useMemoizedFn((touch) => {
    if (!touchingRef.current) {
      return
    }
    const percentCount = (touch.percentX / 100) * count!

    if (allowHalf) {
      const nextValue = Math.round(percentCount * 2) / 2
      applyValue(nextValue)
      return
    }

    applyValue(Math.round(percentCount))
  })
  useTouch(containerRef, {
    onStart: (touches) => {
      if (readOnly) return
      touchingRef.current = true
      applyTouch(touches?.[0])
    },
    onMove: (touches) => {
      applyTouch(touches?.[0])
    },
    onEnd: () => {
      touchingRef.current = false
    },
  })
  useImperativeHandle(forwardedRef, () => containerRef.current!)

  const renderCharacter = (value: number, half: boolean) => (
    <div
      className={classnames(`${prefix}-character`, {
        [`${prefix}-character-active`]: currentValue >= value,
        [`${prefix}-character-half`]: half,
      })}
    >
      {character}
    </div>
  )

  return (
    <div
      {...props}
      className={classnames(
        `${prefix}`,
        {
          [`${prefix}-readonly`]: readOnly,
          [`${prefix}-disabled`]: disabled,
          [`${prefix}-size-${size}`]: true,
        },
        className,
      )}
      ref={containerRef}
      onChange={undefined}
    >
      {characterList.map((_, i) => (
        <div key={i} className={classnames(`${prefix}-box`)}>
          {allowHalf && renderCharacter(i + 0.5, true)}
          {renderCharacter(i + 1, false)}
        </div>
      ))}
    </div>
  )
})

Rate.defaultProps = {
  defaultValue: 0,
  count: 5,
  character: <Star />,
  size: 'default',
}

export default Rate
