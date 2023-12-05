import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface SkeletonProps extends JSXDivProps {
  round?: boolean
  ref?: React.Ref<any>
}

export default AUTO_API<SkeletonProps>()
