import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { classnames, run, debounce, Tween } from '@fexd/tools'
import { PickerViewProps } from './type'
import createFC from '../createFC'
import useIOControl from '../useIOControl'

const prefix = 'exd-picker-view'
const PickerView = createFC<PickerViewProps, HTMLDivElement>(function PickerView(
  { options = [], rows = 3, className, scaleSelected, ...props },
  forwardedRef,
) {
  const { value, setValue } = useIOControl({
    ...props,
    onChange(value) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      run(props, 'onChange', value, indexRef.current)
    },
  })
  const localRows = rows < 3 ? 3 : rows % 2 === 0 ? rows - 1 : rows
  const placeholderNumber = useMemo((): number => Math.floor(localRows / 2), [localRows])
  const itemRef = useRef<HTMLDivElement>(null)
  const [itemHeight, setItemHeight] = useState(50)
  const itemHeightRef = useRef(itemHeight)
  itemHeightRef.current = itemHeight
  const contentHeight = useMemo(() => itemHeight * localRows, [itemHeight, localRows])
  const indicatorTop = useMemo(() => itemHeight * placeholderNumber, [itemHeight, placeholderNumber])
  const contentRef = useRef<HTMLDivElement>(null)
  const [initialIndex = 0] = useState(() => options.findIndex((item) => item.value === (value ?? props?.defaultValue)))
  const indexRef = useRef<number>(initialIndex)
  // 闭包问题导致 options 改变但 handleScroll() 函数里拿到的仍然是旧值
  const optionsRef = useRef(options)
  const touchingRef = useRef(false) // 记录滚动中状态
  const resizingRef = useRef(false) // 记录是否正在调整窗口大小

  const handleScroll = useCallback(
    debounce(() => {
      // 修复还在滚动但强行关闭了组件的情况，滚动中同样不响应
      if (!contentRef || !contentRef.current || touchingRef.current || resizingRef.current) {
        return
      }
      // 1. 先找到当前位置选中的是哪个
      const prevIndex = indexRef.current
      const index = Math.round(contentRef.current.scrollTop / itemHeightRef.current)
      indexRef.current = index

      const fromPosition = contentRef.current!!.scrollTop
      const toPosition = index * itemHeightRef.current

      if (fromPosition !== toPosition) {
        // 2. 缓动回正
        new Tween({
          from: contentRef.current!!.scrollTop,
          to: index * itemHeightRef.current,
          duration: 48 * 2,
          loop: false,
        })
          .on('update', (value: number) => {
            if (!contentRef || !contentRef.current) {
              return
            }
            contentRef.current.scrollTop = value
          })
          .start()
      }

      if (prevIndex !== index) {
        // 3. 触发 onChange
        run(setValue, undefined, optionsRef.current?.[index]?.value)
      }
    }, 120),
    [],
  )

  useEffect(() => {
    const handleResize = debounce(() => {
      const height = itemRef.current?.getBoundingClientRect()?.height
      if (!height) {
        return
      }
      resizingRef.current = true
      setItemHeight(height)
      setTimeout(() => {
        resizingRef.current = false
        handleScroll()
      }, 120)
    }, 120)

    window.addEventListener('resize', handleResize, false)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 值发生改变，应同步更新
  useEffect(() => {
    optionsRef.current = options
    const index = options.findIndex((item) => item.value === value)
    if (index > -1) {
      contentRef.current!!.scrollTop = itemHeight * index
    }
  }, [value, options, itemHeight])

  useEffect(() => {
    optionsRef.current = options
    const index = options.findIndex((item) => item.value === props?.defaultValue)
    if (index > -1) {
      contentRef.current!!.scrollTop = itemHeight * index
    }
  }, [])

  if (rows < 3 || rows % 2 === 0) {
    console.error('Warning: row 必须大于 3 且为奇数')
  }

  return (
    <div {...props} onChange={undefined} className={classnames(prefix, className)} ref={forwardedRef}>
      <div className={`${prefix}-mask-top`} style={{ height: indicatorTop }} />
      <div className={`${prefix}-mask-bottom`} style={{ height: indicatorTop }} />
      <div className={`${prefix}-indicator`} style={{ top: indicatorTop }} />
      <div
        ref={contentRef}
        onScroll={(e) => {
          e.stopPropagation()
          handleScroll()
        }}
        onTouchStart={() => {
          touchingRef.current = true
        }}
        onTouchEnd={(e) => {
          touchingRef.current = false
          handleScroll() // 滚动结束后再触发一次
        }}
        className={`${prefix}-content`}
        style={{ height: contentHeight }}
      >
        <div ref={itemRef} className={`${prefix}-item`} />
        {Array.from(new Array(placeholderNumber - 1)).map((item, index) => (
          <div key={index} className={`${prefix}-item`} />
        ))}
        {options.map((item) => (
          <div
            key={item.value}
            className={classnames(`${prefix}-item`, {
              [`${prefix}-item--active`]: scaleSelected && String(item.value) === String(value),
            })}
          >
            {item.label}
          </div>
        ))}
        {Array.from(new Array(placeholderNumber)).map((item, index) => (
          <div key={index} className={`${prefix}-item`} />
        ))}
      </div>
    </div>
  )
})

PickerView.defaultProps = {
  scaleSelected: true,
}

export default PickerView
