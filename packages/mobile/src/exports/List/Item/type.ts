import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../../helpers/html.types'

export interface ListItemProps extends Omit<JSXDivProps, 'children'> {
  border?: boolean
  children?: ReactNode | (() => ReactNode)
  extra?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
