import React from 'react'
import { run, classnames } from '@fexd/tools'

import createFC from '../../helpers/createFC'
import Item from './Item'
import { ListProps } from './type'

interface ListType extends React.FC<ListProps> {
  Item: React.FC<any>
}

const prefix = 'exd-list'
const List: ListType = createFC<ListProps, HTMLDivElement>(function List(
  { headerBorder, header, className, children, borderless, ...props },
  forwardedRef,
) {
  const hasHeader = !!header

  return (
    <div
      {...props}
      className={classnames(prefix, className, {
        [`${prefix}-borderless`]: borderless,
      })}
      ref={forwardedRef}
    >
      {hasHeader && (
        <Item border={headerBorder}>
          <div className={`${prefix}-header`}>{run(header)}</div>
        </Item>
      )}
      {children}
    </div>
  )
}) as ListType

List.Item = Item
List.defaultProps = {
  headerBorder: true,
}

export default List
