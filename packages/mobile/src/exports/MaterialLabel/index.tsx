import React, { useState, useEffect, useRef } from 'react'
import { classnames, isNumber, get } from '@fexd/tools'

import { MaterialLabelProps as MaterialLabelPureProps } from './type'
import createFC from '../../helpers/createFC'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

interface MaterialLabelProps extends Omit<JSXDivElement, 'prefix' | 'placeholder'> {}
interface MaterialLabelProps extends Omit<MaterialLabelPureProps, 'onClick'> {}

const prefixClassName = 'exd-material-label'

const MaterialLabel = createFC<MaterialLabelProps, HTMLDivElement>(function MaterialLabel(
  {
    className,
    placeholder,
    label = placeholder,
    autoHeight = false,
    prefix,
    suffix,
    helper,
    active,
    type,
    disabled,
    children,
    onClick,
    ...props
  },
  forwardedRef,
) {
  const prefixRef = useRef<HTMLDivElement>(null)
  const [prefixWidth, setPrefixWidth] = useState(0)

  useEffect(() => {
    if (prefix) {
      setTimeout(() => {
        setPrefixWidth(get(prefixRef, 'current.offsetWidth', 0))
      })
    }
  }, [prefix])

  return (
    <div
      {...props}
      className={classnames(`${prefixClassName}__material-label`, className, {
        [`${prefixClassName}__warn`]: type === 'warn',
        [`${prefixClassName}__error`]: type === 'error',
        [`${prefixClassName}__info`]: type === 'info',
        [`${prefixClassName}__disabled`]: disabled,
        [`${prefixClassName}__material-label--auto-height`]: autoHeight,
      })}
      ref={forwardedRef}
      onClick={onClick}
    >
      <div className={`${prefixClassName}__bar`}>
        {prefix && (
          <div className={`${prefixClassName}__prefix`} ref={prefixRef}>
            {prefix}
          </div>
        )}
        <div
          className={classnames(`${prefixClassName}__label`, {
            [`${prefixClassName}__label--active`]: active,
            [`${prefixClassName}__label--capitalize`]: true,
          })}
          style={
            isNumber(prefixWidth) && prefixWidth > 0
              ? {
                  left: active ? 0 : prefixWidth,
                }
              : {}
          }
        >
          {label}
        </div>
        {active && placeholder && label !== placeholder && (
          <div className={`${prefixClassName}__placeholder`}>{placeholder}</div>
        )}
        <label className={`${prefixClassName}__content`}>{children}</label>
        <div className={`${prefixClassName}__suffix`}>{suffix}</div>
      </div>
      <div className={`${prefixClassName}__helper`}>{helper}</div>
    </div>
  )
})

MaterialLabel.defaultProps = {
  className: '',
  placeholder: '',
  suffix: null,
  helper: null,
  active: false,
  onClick: () => null,
}

export default MaterialLabel
