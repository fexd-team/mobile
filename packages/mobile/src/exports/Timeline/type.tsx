import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { TimelineItemProps } from './Item/type'
import { JSXDivProps } from '../../helpers/html.types'

interface ActivityConfig extends Omit<TimelineItemProps, 'children'> {
  content?: TimelineItemProps['children']
}

export interface TimelineProps extends Omit<JSXDivProps, 'children' | 'content'> {
  children?: ReactNode | (() => ReactNode)
  data?: ActivityConfig[]
  ref?: React.Ref<any>
}

export default AUTO_API<TimelineProps>()
