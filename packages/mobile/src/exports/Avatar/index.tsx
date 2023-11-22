import React, { CSSProperties, useState } from 'react'
import { classnames } from '@fexd/tools'
import createFC from '../../helpers/createFC'
import { sizes, shapes, AvatarProps, AvatarRef } from './type'
import AvatarGroup from './Group'

type BasicAvatarType = React.FC<AvatarProps>
interface AvatarType extends BasicAvatarType {
  Group: typeof AvatarGroup
}

export const prefix = 'exd-avatar'
const Avatar: AvatarType = createFC<AvatarProps, AvatarRef>(function Avatar(props, ref) {
  const {
    size = 'normal',
    shape = 'circle',
    color,
    backgroundColor,
    src,
    alt,
    style,
    className,
    children,
    onLoad,
    onError,
    ...rest
  } = props
  const [error, setError] = useState<boolean>(false)

  const className2Use: string = classnames(prefix, className, {
    [`${prefix}-${size}`]: sizes.includes(size),
    [`${prefix}-${shape}`]: shapes.includes(shape),
    [`${prefix}-error`]: error,
  })

  const style2Use: CSSProperties = {
    color,
    backgroundColor,
    ...style,
  }

  let content = null
  if (src && !error) {
    content = (
      <img
        src={src}
        alt="头像图片"
        onLoad={onLoad}
        onError={(e) => {
          setError(true)
          if (typeof onError === 'function') onError(e)
        }}
      />
    )
  } else if (alt) {
    content = alt[0]
  } else if (children) {
    content = children
  }

  return (
    <div ref={ref} className={className2Use} style={style2Use} {...rest}>
      {content}
    </div>
  )
}) as AvatarType

Avatar.defaultProps = {}
Avatar.Group = AvatarGroup
export default Avatar
