import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface NoticeBarProps extends JSXDivProps {
  text?: ReactNode
  animation?: boolean
  ref?: React.Ref<any>
}

export default AUTO_API<NoticeBarProps>()
