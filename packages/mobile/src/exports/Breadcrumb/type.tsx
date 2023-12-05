import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface BreadcrumbProps extends Omit<JSXDivProps, 'onClick'> {
  data: React.ReactNode[]
  onClick?: (idx: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  ref?: React.Ref<any>
}

export default AUTO_API<BreadcrumbProps>()
