import React, { useState, useEffect, useRef, isValidElement } from 'react'
import { classnames, isNumber, get, isFunction } from '@fexd/tools'

import { BlockLabelProps } from './type'
import createFC from '../createFC'
import UnstyledLabel from '../UnstyledLabel'

const prefixClassName = 'exd-block-label'

const BlockLabel = createFC<BlockLabelProps, any>(function BlockLabel(props, forwardedRef) {
  const {
    className,
    style,
    placeholder,
    label = placeholder,
    autoHeight = false,
    keepHelperPlaceholder,
    prefix,
    suffix,
    helper,
    active,
    type,
    disabled,
    children,
    onClick,
    wrapperProps = {},
    labelProps = {},
    barProps = {},
    contentProps = {},
    placeholderProps = {},
    prefixProps = {},
    suffixProps = {},
    helperProps = {},
  } = props

  return (
    <UnstyledLabel
      {...props}
      style={{}}
      ref={forwardedRef}
      wrapperProps={{
        onClick,
        ...wrapperProps,
        className: classnames(
          `${prefixClassName}__wrapper`,
          {
            [`${prefixClassName}__warn`]: type === 'warn',
            [`${prefixClassName}__error`]: type === 'error',
            [`${prefixClassName}__info`]: type === 'info',
            [`${prefixClassName}__success`]: type === 'success',
            [`${prefixClassName}__disabled`]: disabled,
            [`${prefixClassName}__wrapper--auto-height`]: autoHeight,
          },
          wrapperProps?.className,
        ),
      }}
      barProps={{
        ...barProps,
        className: classnames(`${prefixClassName}__bar`, className, barProps?.className),
        style: {
          ...(style ?? {}),
          ...(barProps?.style ?? {}),
        },
      }}
      labelProps={
        isFunction(labelProps)
          ? labelProps
          : ({ prefixWidth }) => ({
              ...labelProps,
              className: classnames(
                `${prefixClassName}__label`,
                {
                  [`${prefixClassName}__label--active`]: active,
                  // [`${prefixClassName}__label--capitalize`]: true,
                },

                labelProps?.className,
              ),
              style: { left: isNumber(prefixWidth) ? prefixWidth : 0, ...(labelProps?.style ?? {}) },
            })
      }
      contentProps={{
        ...contentProps,
        className: classnames(
          `${prefixClassName}__content`,
          {
            [`${prefixClassName}__content--active`]: active,
          },
          contentProps?.className,
        ),
      }}
      placeholderProps={{
        ...placeholderProps,
        className: classnames(`${prefixClassName}__placeholder`, placeholderProps?.className),
      }}
      prefixProps={{
        ...prefixProps,
        className: classnames(`${prefixClassName}__prefix`, prefixProps?.className),
      }}
      suffixProps={{
        ...suffixProps,
        className: classnames(`${prefixClassName}__suffix`, suffixProps?.className),
      }}
      helperProps={{
        ...helperProps,
        className: classnames(`${prefixClassName}__helper`, helperProps?.className),
      }}
    />
  )
})

BlockLabel.defaultProps = {
  className: '',
  placeholder: '',
  suffix: null,
  helper: null,
  active: false,
  onClick: () => null,
  autoHeight: false,
  keepHelperPlaceholder: false,
}

export default BlockLabel
