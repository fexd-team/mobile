import React from 'react'
import { classnames } from '@fexd/tools'
import createFC from '../../createFC'
import { AvatarGroupProps, AvatarGroupRef } from './type'
import Avatar from '../index'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-avatar-group'
const AvatarGroup = createFC<AvatarGroupProps, AvatarGroupRef>(function AvatarGroup(props, ref) {
  const { max = 5, total, className, children, ...rest } = props

  const curTotal = total || React.Children.count(props.children)
  const counts = React.Children.count(children)
  const shrink = counts > max
  const needShowExtra = curTotal > counts
  const extraNums = shrink ? Math.abs(counts - max) : needShowExtra ? Math.abs(curTotal - counts) : 0
  const childCounts = shrink ? Math.abs(counts - max) : needShowExtra ? counts : curTotal
  const childrens = React.Children.toArray(children).slice(0, childCounts).reverse()

  const className2Use: string = classnames(prefix, className)

  return (
    <div ref={ref} className={className2Use} {...rest}>
      {(shrink || needShowExtra) && (
        <div className={`${prefix}-extra`}>
          <Avatar>+{extraNums}</Avatar>
        </div>
      )}
      {childrens.map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child)
        }
        return null
      })}
    </div>
  )
})

AvatarGroup.defaultProps = {}

export default AvatarGroup
