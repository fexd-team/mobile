import React, { useRef, useEffect, useState, useImperativeHandle } from 'react'
import { classnames, run } from '@fexd/tools'
import createFC from '../../helpers/createFC'
import { FlexProps } from './type'
import FlexContext from './FlexContext'
import Item from './Item'

const prefix = 'exd-flex'
interface FlexType extends React.FC<FlexProps> {
  Item: typeof Item
}

const Flex = createFC<FlexProps, HTMLDivElement>(function (
  { children, wrap, align, justify, className, smValue, mdValue, lgValue, targetRef },
  forwardedRef,
) {
  const flexContext = React.useMemo(
    () => ({
      targetRef,
      smValue,
      mdValue,
      lgValue,
    }),
    [targetRef, smValue, mdValue, lgValue],
  )

  return (
    <FlexContext.Provider value={flexContext}>
      <div
        className={classnames(prefix, className, {
          [`${prefix}-no-wrap`]: wrap === false,
          [`${prefix}-${align}`]: align,
          [`${prefix}-${justify}`]: justify,
        })}
        ref={forwardedRef}
      >
        {run(children)}
      </div>
    </FlexContext.Provider>
  )
}) as FlexType

Flex.defaultProps = {
  align: 'top',
  justify: 'start',
  wrap: true,
}

Flex.Item = Item

export default Flex
