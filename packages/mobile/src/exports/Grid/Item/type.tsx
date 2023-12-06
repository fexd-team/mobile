import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../../helpers/html.types'

export interface GridItemProps extends Omit<JSXDivProps, 'children'> {
  icon?: ReactNode | (() => ReactNode)
  text?: string
  children?: ReactNode | (() => ReactNode)
  extra?: ReactNode | (() => ReactNode)
  // ref?: React.Ref<any>
}

export default AUTO_API<GridItemProps>()
