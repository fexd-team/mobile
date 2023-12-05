import AUTO_API from '../../helpers/AUTO_API'
import React, { createContext } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface NavBarProps extends JSXDivProps {
  alignCenter?: boolean
  children: React.ReactNode
  left?: React.ReactNode | (() => React.ReactNode)
  right?: React.ReactNode | (() => React.ReactNode)
  contentClassName?: string
  ref?: React.Ref<HTMLDivElement>
}

export default AUTO_API<NavBarProps>()
