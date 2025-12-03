import React from 'react'
import { classnames, source } from '@fexd/tools'

import createFC from '../createFC'
import { FC } from '../createFC/type'

const classNamePrefix = 'mc-iconfont'

export interface IconfontProps {
  type: string
  prefix?: string
  svg?: boolean
  className?: string
  onClick?: React.MouseEventHandler<any>
  style?: React.CSSProperties
}

const Iconfont = createFC<IconfontProps, any>(function Iconfont(
  { type: iconType, prefix, svg: isSvg = false, className, ...props },
  forwardedRef,
) {
  const type = `${prefix}-${iconType}`
  // SVG 模式需要添加 # 前缀来引用内部 symbol
  const svgHref = `#${type}`

  return isSvg ? (
    <svg aria-hidden="true" {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      <use xlinkHref={svgHref} />
    </svg>
  ) : (
    <i
      {...props}
      className={classnames(`${classNamePrefix} icon`, type, className, prefix, {
        iconfont: prefix === 'icon',
      })}
      ref={forwardedRef}
    />
  )
}) as FC<IconfontProps> & {
  loadIconfont: () => void
}

Iconfont.defaultProps = {
  prefix: 'mc',
  svg: false,
}

Iconfont.loadIconfont = () => {
  source.css('https://at.alicdn.com/t/c/font_3629196_pifvlm76us.css')
  source.js('https://at.alicdn.com/t/c/font_3629196_pifvlm76us.js')
}

export default Iconfont
