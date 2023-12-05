import React from 'react'
import createFC from '../createFC'
import { SpaceProps, SpaceGapType } from './type'
import { classnames, isArray } from '@fexd/tools'
import Item from './Item'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-space'

const spaceGapMap: SpaceGapType = {
  small: 8,
  middle: 16,
  large: 24,
}

const Space = createFC<SpaceProps, HTMLDivElement>(function Space(
  { children, align, direction, gap, split, className, wrap, ...props },
  forwardedRef,
) {
  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align

  const gapArray: any = isArray(gap) ? gap : [gap, gap]
  const intervalGap = spaceGapMap[gapArray[0]] ?? gapArray[0] ?? 0
  const horizontalGap = spaceGapMap[gapArray[1]] ?? gapArray[1] ?? 0

  const childrenLength = children?.length ?? 1
  /* 组件逻辑实现 */
  return (
    <div
      {...props}
      ref={forwardedRef}
      style={{ ...(wrap && { marginBottom: horizontalGap * -1 }) }}
      className={classnames(prefix, className, {
        [`${prefix}-${direction}`]: !!direction,
        [`${prefix}-wrap`]: wrap,
        [`${prefix}-align-${mergedAlign}`]: !!mergedAlign,
      })}
    >
      {React.Children.map(children, (child: any, idx: number) => (
        <Item
          key={idx}
          className={`${prefix}-item`}
          last={idx === childrenLength - 1}
          split={split}
          intervalGap={intervalGap}
          horizontalGap={horizontalGap}
          direction={direction}
          wrap={wrap}
        >
          {child}
        </Item>
      ))}
    </div>
  )
})

Space.defaultProps = {
  gap: 'small',
  direction: 'horizontal',
  // align: 'center',
}

export default Space
