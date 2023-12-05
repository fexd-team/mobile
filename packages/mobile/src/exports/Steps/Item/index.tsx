import React from 'react'
import { classnames, run } from '@fexd/tools'

import createFC from '../../createFC'
import { StepItemProps } from './type'

const prefix = 'exd-step'
const StepItem = createFC<StepItemProps, HTMLLIElement>(function (
  { icon, step = 1, type = 'default', title, children, className, ...props },
  ref,
) {
  const showStep = !!icon

  return (
    <li
      ref={ref}
      className={classnames(prefix, className, {
        [`${prefix}--${type}`]: type !== 'default',
      })}
      {...props}
    >
      <div className={`${prefix}-header`}>
        <div className={`${prefix}-header-icon`}>
          {showStep ? run(icon) : <div className={`${prefix}-header-icon-circle`}>{step}</div>}
        </div>
      </div>
      {(title || children) && (
        <div className={`${prefix}-content`}>
          <div className={`${prefix}-content-container`}>
            <div className={`${prefix}-content-title`}>{run(title)}</div>
            <div className={`${prefix}-content-description`}>{run(children)}</div>
          </div>
        </div>
      )}
    </li>
  )
})

StepItem.defaultProps = {
  step: 1,
  type: 'default',
}

export default StepItem
