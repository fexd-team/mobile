import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface ListProps extends JSXDivProps {
  headerBorder?: boolean
  header?: ReactNode | (() => ReactNode)
  children?: ReactNode
  borderless?: boolean
  ref?: React.Ref<any>
}

export default AUTO_API<ListProps>()
