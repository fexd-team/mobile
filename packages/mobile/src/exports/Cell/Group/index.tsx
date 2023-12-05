import React, { useMemo, createContext } from 'react'
import { classnames } from '@fexd/tools'

import createFC from '../../createFC'
import { CellGroupProps, CellGroupRef, CellGroupType, CellGroupContext } from './type'

export const context: CellGroupContext = createContext<CellGroupProps>({})

const prefix = 'exd-cell-group'

const CellGroup = createFC<CellGroupProps, CellGroupRef>(function CellGroup(
  { className, children, title, inset, ...props },
  ref,
) {
  const contextValue = useMemo(
    () => ({
      title,
      inset,
      ...props,
    }),
    [title, inset, props],
  )

  return (
    <context.Provider value={contextValue}>
      <div
        className={classnames(prefix, className, {
          [`${prefix}-inset`]: inset,
        })}
        ref={ref}
      >
        {title && <div className={classnames([`${prefix}-title`])}>{title}</div>}
        <div className={`${prefix}-content`}>{children}</div>
      </div>
    </context.Provider>
  )
}) as CellGroupType

CellGroup.defaultProps = {
  inset: false,
  border: true,
  size: 'normal',
}

export default CellGroup
