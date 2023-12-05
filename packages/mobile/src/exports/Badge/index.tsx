import React, { useMemo } from 'react'
import { classnames } from '@fexd/tools'
import createFC from '../createFC'
import { BadgeProps, BadgeStatus } from './type'
import Stamp from './Stamp'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-badge'
interface BadgeType extends React.FC<BadgeProps> {
  Stamp: typeof Stamp
}

const Badge = createFC<BadgeProps>(function Badge(
  { visible, content, color, bgColor, dot, offset, children, className, style, overflowCount, showZero, type },
  forwardedRef,
) {
  /* 是否显示数字0 */
  const isShowZero = !showZero && (content === '0' || content === 0)

  /* 是否隐藏整个组件 */
  const isHidden = useMemo(() => {
    const isEmpty = !visible || (!dot && !content)
    return isEmpty
  }, [content, visible])

  /* 是否需要用到overFlwCount */
  const isShowOverFlwCount = useMemo(() => {
    const numberContent = parseInt(content as string, 10)
    const numberOverflowCount = parseInt(overflowCount as string, 10)

    if (Number.isNaN(numberContent) || Number.isNaN(numberOverflowCount)) {
      return false
    }
    return numberContent > numberOverflowCount
  }, [content, overflowCount])

  const badgeCls = classnames(prefix, {
    [`${prefix}-fixed`]: !!children,
    [`${prefix}-dot`]: dot,
    [`${prefix}-hidden`]: isHidden,
    [`${prefix}-status-${type}`]: BadgeStatus.includes(type as string),
  })

  const mergedStyle = useMemo<React.CSSProperties>(() => {
    if (!offset || !Array.isArray(offset)) {
      return { ...style }
    }
    const offsetStyle: React.CSSProperties = {}

    const right = parseInt(offset[0] as string, 10)
    const top = parseInt(offset[1] as string, 10)
    if (!Number.isNaN(right)) {
      offsetStyle.right = `${right}%`
    }
    if (!Number.isNaN(top)) {
      offsetStyle.top = `${top}%`
    }

    return {
      ...style,
      ...offsetStyle,
    }
  }, [offset, style])

  const element =
    dot || content ? (
      <div
        className={classnames(`${badgeCls}`, className)}
        style={{
          backgroundColor: bgColor,
          color,
          ...mergedStyle,
        }}
      >
        {dot ? null : isShowZero ? '' : isShowOverFlwCount ? `${overflowCount}+` : content}
      </div>
    ) : null
  return children ? (
    <div className={`${prefix}-wrap`}>
      {children}
      {element}
    </div>
  ) : (
    element
  )
}) as BadgeType

Badge.defaultProps = {
  dot: false,
  visible: true,
  showZero: false,
}

Badge.Stamp = Stamp
export default Badge
