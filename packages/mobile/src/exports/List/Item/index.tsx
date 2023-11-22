import React from 'react'
import { isFunction, classnames, run } from '@fexd/tools'
import { ChevronForward } from '@fexd/icons'

import createFC from '../../../helpers/createFC'
import { ListItemProps } from './type'

const prefix = 'exd-list-item'
const Item = createFC<ListItemProps, HTMLDivElement>(function Item(
  { children, border, className, onClick, extra = isFunction(onClick) ? <ChevronForward /> : undefined, ...props },
  forwardedRef,
) {
  const clickable = isFunction(onClick)

  return (
    <div
      {...props}
      className={classnames(prefix, className, {
        [`${prefix}-clickable`]: clickable,
        [`${prefix}-borderless`]: !border,
      })}
      onClick={onClick}
      ref={forwardedRef}
    >
      <div className={`${prefix}-label`}>{run(children)}</div>
      <div className={`${prefix}-value`}>{run(extra)}</div>
    </div>
  )
})

Item.defaultProps = {
  border: true,
}

export default Item
