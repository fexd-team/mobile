import React from 'react'
import { isString, isNumber, classnames, run } from '@fexd/tools'
import createFC from '../../createFC'
import { SpaceItemProps } from './type'

const prefix = 'exd-space-item'
const Item = createFC<SpaceItemProps, HTMLDivElement>(function Item(
  { children, className, split, last, intervalGap, horizontalGap, direction, wrap, ...props },
  forwardedRef,
) {
  let style: React.CSSProperties = {}
  if (direction === 'vertical') {
    if (!last) {
      style = { marginBottom: intervalGap / (split ? 2 : 1) }
    }
  } else {
    style = {
      ...(!last && { marginRight: intervalGap / (split ? 2 : 1) }),
      ...(wrap && { marginBottom: horizontalGap }),
    }
  }
  return (
    <>
      <div className={classnames(prefix, className)} style={style}>
        {run(children)}
      </div>
      {!last && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  )
})

export default Item
