import React, { ReactNode } from 'react'
import useSize from '../../useSize'
import { classnames, run, value } from '@fexd/tools'
import createFC from '../../createFC'
import { FlexItemProps, itemSize, itemType } from './type'
import FlexContext from '../FlexContext'

const prefix = 'exd-flex-item'

const Item = createFC<FlexItemProps, HTMLDivElement>(function Item(
  { children, className, style, span, pull, push, offset, order, xs, sm, md, lg },
  forwardedRef,
) {
  const { targetRef, smValue = 580, mdValue = 990, lgValue = 1600 } = React.useContext(FlexContext)
  const { width } = useSize(targetRef || document.body)
  let sizeClassObj = {}

  const mapSize = (size: number) => {
    const sizeType: itemType = {}
    let sizeProps: itemSize = {}
    if (size < smValue) {
      sizeType.type = xs
      sizeType.value = 'xs'
    } else if (size >= smValue && size < mdValue) {
      sizeType.type = sm
      sizeType.value = 'sm'
    } else if (size >= mdValue && size < lgValue) {
      sizeType.type = md
      sizeType.value = 'md'
    } else if (size >= lgValue) {
      sizeType.type = lg
      sizeType.value = 'lg'
    }
    if (typeof sizeType.type === 'number') {
      sizeProps.span = sizeType.type
    } else if (typeof sizeType.type === 'object') {
      sizeProps = sizeType.type || {}
    }

    sizeClassObj = {
      [`${prefix}-${sizeType.value}-${sizeProps.span}`]: sizeProps.span !== undefined,
      [`${prefix}-${sizeType.value}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
      [`${prefix}-${sizeType.value}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
      [`${prefix}-${sizeType.value}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
      [`${prefix}-${sizeType.value}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
    }
  }

  mapSize(width)

  return (
    <div
      className={classnames(
        prefix,
        className,
        {
          [`${prefix}-${span}`]: span !== undefined,
          [`${prefix}-order-${order}`]: order,
          [`${prefix}-offset-${offset}`]: offset,
          [`${prefix}-push-${push}`]: push,
          [`${prefix}-pull-${pull}`]: pull,
        },
        sizeClassObj,
      )}
      ref={forwardedRef}
      style={style}
    >
      <div className={classnames(`${prefix}-content`, {})}>{run(children) as ReactNode}</div>
    </div>
  )
})

Item.defaultProps = {}
export default Item
