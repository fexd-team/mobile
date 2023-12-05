import React from 'react'
import { classnames, run } from '@fexd/tools'
import createFC from '../createFC'
import { detectFlexGapSupported } from '../../helpers/styleChecker'
import { GridProps } from './type'
import GridContext from './GridContext'
import Item from './Item'

const prefix = 'exd-grid'
interface GridType extends React.FC<GridProps> {
  Item: typeof Item
}

const Grid = createFC<GridProps, HTMLDivElement>(function (props, forwardedRef) {
  const {
    vertical = true,
    gutter = [0, 0],
    columns = 4,
    border = true,
    center = true,
    square = false,
    children,
    className,
    ...restProps
  } = props

  const [flexGapSupported, setFlexGapSupported] = React.useState(false)
  const gridContext = React.useMemo(
    () => ({
      gutter,
      columns,
      border,
      center,
      vertical,
      square,
      flexGapSupported,
    }),
    [gutter, columns, border, center, vertical, square, flexGapSupported],
  )

  const mergedStyle: React.CSSProperties = {}
  const gutterState = Array.isArray(gutter) && gutter[0] > 0 && gutter[1] > 0

  if (gutter && gutter[0] > 0) {
    const gutterWrap = gutter[0]
    mergedStyle.paddingLeft = gutterWrap
  }

  if (flexGapSupported && gutter && gutter[1] > 0) {
    const verticalGutter = gutter[1]
    mergedStyle.rowGap = verticalGutter
  }

  React.useEffect(() => {
    setFlexGapSupported(detectFlexGapSupported())
  }, [])

  return (
    <GridContext.Provider value={gridContext}>
      <div
        {...restProps}
        className={classnames(prefix, className, {
          [`${prefix}-vertical`]: vertical,
          [`${prefix}-line-top`]: border && !gutterState,
          [`${prefix}-line`]: border,
        })}
        style={{ ...mergedStyle }}
        ref={forwardedRef}
      >
        {children && run(children)}
      </div>
    </GridContext.Provider>
  )
}) as GridType

Grid.Item = Item

export default Grid
