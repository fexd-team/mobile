import React, { useRef, useEffect } from 'react'
import { classnames, run } from '@fexd/tools'
import createFC from '../../createFC'
import { TabItemProps } from './type'

const prefix = 'exd-tabs__item'
const TabItem = createFC<TabItemProps, HTMLDivElement>(function TabItem({
  value,
  display,
  disabled,
  tabIndex,
  isActive,
  onClick,
  onOffsetChange,
  children,
  className,
  ellipsis,
  ...props
}) {
  const tabItemRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (disabled) {
      return
    }

    run(onClick, undefined, value, tabIndex)
  }

  useEffect(() => {
    if (isActive) {
      const { offsetLeft, offsetWidth } = tabItemRef?.current as HTMLDivElement
      run(onOffsetChange, undefined, offsetLeft, offsetWidth)
    }
  }, [isActive])

  return (
    <div
      ref={tabItemRef}
      className={classnames(prefix, className, {
        [`${prefix}--active`]: isActive,
        [`${prefix}--flex`]: display === 'flex',
        [`${prefix}--scroll`]: display === 'scroll',
        [`${prefix}--ellipsis`]: ellipsis,
        [`${prefix}--disabled`]: disabled,
      })}
      {...props}
      onClick={handleClick}
    >
      {run(children)}
    </div>
  )
})

TabItem.defaultProps = {
  ellipsis: false,
  disabled: false,
}

export default TabItem
