import React, { useEffect, useState, useRef, useCallback } from 'react'
import TabItem from './Item'
import createFC from '../createFC'
import { classnames, delay, run } from '@fexd/tools'
import useIOControl from '../useIOControl'
import { TabsProps, ValueType } from './type'

const Tabs = createFC<TabsProps, any>(function Tabs(
  { display: defaultDisplay, data = [], ellipsis = false, className, ...props },
  forwardRef,
) {
  const { value, setValue } = useIOControl(props)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [transformActive, setTransformActive] = useState(0)
  const [offsetLeftActive, setOffsetLeftActive] = useState(0)
  const [offsetWidthActive, setOffsetWidthActive] = useState(0)

  const indicatorRef = useRef<HTMLDivElement>(null)
  const flexTabsRef = useRef<HTMLDivElement>(null)
  const scrollTabsRef = useRef<HTMLDivElement>(null)

  const display = defaultDisplay ?? (data.length > 3 ? 'scroll' : 'flex')

  const getTransform = (value: ValueType) => {
    const index = data.findIndex((tab) => tab.value === value)

    if (index === -1) {
      setCurrentIndex(index)
      setTransformActive(0)
      return
    }

    const halfOfBottom = (indicatorRef.current as HTMLDivElement).offsetWidth / 2
    const halfOfItem = offsetWidthActive / 2
    const transform = offsetLeftActive + halfOfItem - halfOfBottom

    // 初始化，第一次
    if (!transformActive) {
      setTransformActive(transform)
      // 等待下划线的动画时间过去
      return delay(300).then(() => {
        setCurrentIndex(index)
      })
    }

    setCurrentIndex(index)
    setTransformActive(transform)
    return
  }

  const onTabItemClick = useCallback((value: ValueType, index: number) => {
    // 避免重复点击频繁触发
    if (index === currentIndex) {
      return
    }

    setValue(value)
  }, [])

  const onOffsetChange = useCallback((offsetLeft: number, offsetWidth: number) => {
    setOffsetLeftActive(offsetLeft)
    setOffsetWidthActive(offsetWidth)
  }, [])

  useEffect(() => {
    getTransform(value)
  }, [value, offsetWidthActive, offsetLeftActive])

  useEffect(() => {
    const scrollTabs = scrollTabsRef.current as HTMLDivElement
    if (display === 'scroll') {
      // Tabs的宽度
      const offsetWidth = scrollTabs.offsetWidth
      // 滚动条距离左边的滚动距离
      const scrollLeft = scrollTabs.scrollLeft

      if (scrollLeft > 0) {
        // 滚动的距离大于item距离左边的距离
        if (scrollLeft > offsetLeftActive) {
          const disappearWidth = scrollTabs.scrollLeft - offsetLeftActive
          // 开始调整
          scrollTabs.scrollTo({
            left: scrollLeft - disappearWidth,
            behavior: 'smooth',
          })
          return
        }

        // Item 距离 Tabs 左边的距离
        const itemOffsetLeft = offsetLeftActive - scrollLeft
        // 滚动的距离小于item距离左边的距离
        const appearWidth = offsetWidth - itemOffsetLeft
        if (appearWidth < offsetWidthActive) {
          // 开始调整
          scrollTabs.scrollTo({
            left: scrollLeft + offsetWidthActive - appearWidth,
            behavior: 'smooth',
          })
          return
        }
      } else {
        // Item 距离左边的距离 + Item 的宽度
        const totalWidth = offsetLeftActive + offsetWidthActive
        if (totalWidth > offsetWidth) {
          // 开始调整
          scrollTabs.scrollTo({
            left: scrollLeft + totalWidth - offsetWidth,
            behavior: 'smooth',
          })
          return
        }
      }
    }
  }, [transformActive])

  return (
    <div {...props} ref={forwardRef} className={classnames('exd-tabs', className)} onChange={undefined}>
      <div ref={indicatorRef} className="exd-tabs__indicator" />

      {/* 当选项数量小于等于3 */}
      {display === 'flex' && (
        <div ref={flexTabsRef} className="exd-tabs--flex">
          {data.map((tab, index) => (
            <TabItem
              key={index}
              display={display}
              tabIndex={index}
              disabled={tab.disabled}
              value={tab.value}
              // {...tab}
              isActive={value === tab.value}
              onClick={onTabItemClick}
              onOffsetChange={onOffsetChange}
              ellipsis={ellipsis}
            >
              {tab.icon && <span>{run(tab.icon)}</span>}
              {tab.label}
            </TabItem>
          ))}

          <div
            className={classnames('exd-tabs--flex__indicator', {
              'exd-tabs--flex__indicator--hidden': currentIndex === -1,
            })}
            style={{ transform: `translateX(${transformActive}px)` }}
          />
        </div>
      )}

      {/* 当选项数量大于3 */}
      {display === 'scroll' && (
        <div className={'exd-tabs--scroll'}>
          <div ref={scrollTabsRef} className="exd-tabs--scroll__overflow">
            <div className="exd-tabs--scroll__container">
              {data.map((tab, index) => (
                <TabItem
                  key={index}
                  display="scroll"
                  tabIndex={index}
                  disabled={tab.disabled}
                  value={tab.value}
                  // {...tab}
                  isActive={value === tab.value}
                  onClick={onTabItemClick}
                  onOffsetChange={onOffsetChange}
                >
                  {tab.icon && <span>{run(tab.icon)}</span>}
                  {tab.label}
                </TabItem>
              ))}
            </div>
            <div
              className={classnames('exd-tabs--scroll__indicator', {
                'exd-tabs--scroll__indicator--hidden': currentIndex === -1,
              })}
              style={{ transform: `translateX(${transformActive}px)` }}
            />
          </div>
        </div>
      )}
    </div>
  )
})

export default Tabs
