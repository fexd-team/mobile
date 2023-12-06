import React, { useState, useEffect, useRef, isValidElement } from 'react'
import { classnames, isNumber, get, run } from '@fexd/tools'

import { UnstyledLabelProps } from './type'
import createFC from '../createFC'

const labelPrefix = 'exd-label'

const UnstyledLabel = createFC<UnstyledLabelProps, any>(function UnstyledLabel(
  {
    className,
    onClick,
    placeholder,
    label = placeholder,
    autoHeight,
    keepHelperPlaceholder,
    prefix,
    suffix,
    helper,
    active,
    type,
    disabled,
    children,
    wrapperProps,
    labelProps: getLabelProps,
    barProps,
    contentProps,
    placeholderProps,
    prefixProps,
    suffixProps,
    helperProps,
    useLabelWrapper,
    ...props
  },
  forwardedRef,
) {
  const prefixRef = useRef<HTMLDivElement>(null)
  const [prefixWidth, setPrefixWidth] = useState(0)
  const BarWrapper: any = useLabelWrapper ? 'label' : 'div'

  useEffect(() => {
    if (prefix) {
      setTimeout(() => {
        setPrefixWidth(get(prefixRef, 'current.offsetWidth', 0))
      })
    }
  }, [prefix])

  const labelProps = run(getLabelProps, undefined, { prefixWidth })
  const content = run(children)

  return (
    <div
      {...props}
      onClick={onClick}
      {...wrapperProps}
      className={classnames(labelPrefix, wrapperProps?.className, className)}
      ref={forwardedRef}
    >
      <BarWrapper {...barProps} className={barProps?.className}>
        {prefix && (
          <div ref={prefixRef} {...prefixProps} className={prefixProps?.className}>
            {run(prefix)}
          </div>
        )}
        <div {...labelProps} className={labelProps?.className}>
          {run(label)}
        </div>
        {active && placeholder && label !== placeholder && (
          <div {...placeholderProps} className={placeholderProps?.className}>
            {run(placeholder)}
          </div>
        )}
        <div {...contentProps} className={contentProps?.className}>
          {content}
        </div>
        {suffix && (
          <div {...suffixProps} className={suffixProps?.className}>
            {run(suffix)}
          </div>
        )}
      </BarWrapper>
      {(keepHelperPlaceholder || helper) && (
        <div {...helperProps} className={helperProps?.className}>
          {run(helper)}
        </div>
      )}
    </div>
  )
})

UnstyledLabel.defaultProps = {
  className: '',
  onClick: () => null,
  placeholder: '',
  suffix: null,
  helper: null,
  active: false,
  keepHelperPlaceholder: false,
  useLabelWrapper: true,
  wrapperProps: {
    className: '',
    onClick: () => null,
  },
  labelProps: {},
  barProps: {},
  contentProps: {},
  placeholderProps: {},
  prefixProps: {},
  suffixProps: {},
  helperProps: {},
}

export default UnstyledLabel
