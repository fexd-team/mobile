import React, { ReactNode } from 'react'
import { isFunction, classnames, run } from '@fexd/tools'
import createFC from '../../createFC'
import { GridItemProps } from './type'
import GridContext from '../GridContext'

const prefix = 'exd-grid-item'
const Item = createFC<GridItemProps, HTMLDivElement>(function Item(
  { onClick, children, text, icon, className, ...props },
  forwardedRef,
) {
  const { gutter, columns, border, center, vertical, square, flexGapSupported } = React.useContext(GridContext)

  const clickable = isFunction(onClick)
  const mergedStyle: React.CSSProperties = {}

  if (gutter && gutter[0] > 0) {
    const horizontalGutter = gutter[0]
    mergedStyle.paddingRight = horizontalGutter
  }

  if (!flexGapSupported && gutter && gutter[1] > 0) {
    const verticalGutter = gutter[1] / 2
    mergedStyle.marginTop = verticalGutter
    mergedStyle.marginBottom = verticalGutter
  }

  if (columns) {
    const percent = `${100 / +columns}%`
    mergedStyle.flexBasis = percent

    if (square) {
      mergedStyle.paddingTop = percent
    }
  }

  return (
    <div
      style={{ ...mergedStyle }}
      className={classnames(prefix, className, {
        [`${prefix}-square`]: square,
      })}
      ref={forwardedRef}
    >
      <div
        className={classnames(`${prefix}-content`, {
          [`${prefix}-content-center`]: center,
          [`${prefix}-line`]: border,
          [`${prefix}-surround`]: border && gutter && (gutter[0] > 0 || gutter[1] > 0),
          [`${prefix}-horizontal`]: !vertical,
          [`${prefix}-content-square`]: square,
          [`${prefix}-active`]: clickable,
        })}
        onClick={onClick}
      >
        {children ? (
          (run(children) as ReactNode)
        ) : (
          <React.Fragment>
            <span className={`${prefix}-icon`}>{run(icon)}</span>
            <span className={`${prefix}-text`}>{run(text)}</span>
          </React.Fragment>
        )}
      </div>
    </div>
  )
})

Item.defaultProps = {}
export default Item
