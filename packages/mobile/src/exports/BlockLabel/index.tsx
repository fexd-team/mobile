import React, { useState, useEffect, useRef, isValidElement } from 'react'
import { classnames, isNumber, get, isFunction } from '@fexd/tools'

import { BlockLabelProps } from './type'
import createFC from '../../helpers/createFC'
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
        className: classnames(
          `${prefixClassName}__bar`,
          {
            // 'border-[#d9d9d9]': !type || type === 'info',
            // 'border-[#1890ff]': type === 'warn',
            // 'border-[#52c41a]': type === 'success',
            // 'border-[#fa8c16]': type === 'warn',
            // 'border-[#f5222d]': type === 'error',
            // 'bg-black/5 opacity-70': disabled,
            // 'border-[#d9d9d9]':
          },
          className,
          barProps?.className,
        ),
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
                  [`${prefixClassName}__label--capitalize`]: true,
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
      // placeholderTextProps={{
      //   ...placeholderTextProps,
      //   className: classnames(`text-base text-[#999]`, placeholderTextProps?.className),
      // }}
      // className="h-6"
      prefixProps={{
        ...prefixProps,
        className: classnames(`${prefixClassName}__prefix`, prefixProps?.className),
      }}
      // prefixTextProps={prefixTextProps}
      suffixProps={{
        ...suffixProps,
        className: classnames(`${prefixClassName}__suffix`, suffixProps?.className),
      }}
      // suffixTextProps={suffixTextProps}
      helperProps={{
        ...helperProps,
        className: classnames(
          `${prefixClassName}__helper`,
          // {
          //   'min-h-[18px]': keepHelperPlaceholder,
          //   // 'opacity-0': !type,
          // },
          helperProps?.className,
        ),
      }}
      // helperTextProps={{
      //   ...helperTextProps,
      //   className: classnames(
      //     `text-xs`,
      //     {
      //       'text-[#888]': !type || type === 'info',
      //       // 'text-[#1890ff]': type === 'warn',
      //       'text-[#52c41a]': type === 'success',
      //       'text-[#fa8c16]': type === 'warn',
      //       'text-[#f5222d]': type === 'error',
      //       // 'text-[#d9d9d9]':
      //     },
      //     helperTextProps?.className,
      //   ),
      // }}
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
