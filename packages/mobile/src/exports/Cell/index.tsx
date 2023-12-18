import React, { useMemo, useContext, useState } from 'react'
import { isFunction, classnames, run } from '@fexd/tools'
import { ChevronForward } from '@fexd/icons'

import Spinner from '../Spinner'
import Group, { context as cellGroupContext } from './Group'
import createFC from '../createFC'
import { CellProps, CellRef, CellType } from './type'

const prefix = 'exd-cell'
const Cell = createFC<CellProps, CellRef>(function Cell(
  {
    onClick,
    children,
    title,
    value: propValue,
    description,
    size: propSize,
    border: propBorder,
    suffix: propSuffix,
    prefix: propPrefix,
    loading: propLoading,
    className,
    ...props
  },
  forwardedRef,
) {
  const { size: groupSize, border: groupBorder } = useContext(cellGroupContext)
  const size = propSize ?? groupSize ?? 'normal'
  const border = propBorder ?? groupBorder ?? true

  const autoLoading = propLoading === 'auto'
  const [loadingInside, setLoadingInside] = useState(false)
  const loading = autoLoading ? loadingInside : propLoading

  const tapable = useMemo(() => isFunction(onClick), [onClick])
  const value = children ?? propValue
  const suffix = useMemo(
    () =>
      propSuffix ??
      (loading ? (
        <div className={`${prefix}-loading`}>
          <Spinner />
        </div>
      ) : tapable ? (
        <ChevronForward className={`${prefix}-arrow`} />
      ) : null),
    [propSuffix, loading, tapable],
  )

  const hasLabelContent = !!(title || description)
  const hasLabel = !!(propPrefix || hasLabelContent)
  const hasValue = !!(value || suffix)
  const valueOnly = hasValue && !hasLabel

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={classnames(prefix, className, {
        [`${prefix}-${size}`]: !!size,
        [`${prefix}-border`]: border === true,
        [`${prefix}-border-always`]: border === 'always',
        [`${prefix}-tapable`]: tapable,
      })}
      onClick={(...args) => {
        setLoadingInside(true)
        Promise.resolve(run(onClick, undefined, ...args)).finally(() => setLoadingInside(false))
      }}
    >
      {hasLabel && (
        <div className={`${prefix}-label`}>
          {propPrefix && <div className={`${prefix}-prefix`}>{propPrefix}</div>}
          {hasLabelContent && (
            <div className={`${prefix}-label-content`}>
              {title && <div className={`${prefix}-title`}>{title}</div>}
              {description && <div className={`${prefix}-description`}>{description}</div>}
            </div>
          )}
        </div>
      )}
      {hasValue && (
        <div
          className={classnames(`${prefix}-value`, {
            [`${prefix}-value-only`]: valueOnly,
          })}
        >
          {value && <div className={`${prefix}-value-content`}>{value}</div>}
          {suffix && <div className={`${prefix}-suffix`}>{suffix}</div>}
        </div>
      )}
    </div>
  )
}) as CellType

Cell.defaultProps = {
  loading: 'auto',
}
Cell.Group = Group

export default Cell
