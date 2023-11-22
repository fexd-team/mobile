import React, { ReactNode } from 'react'
import { TransitionSpeed } from '../createTransition/type'

type JSXElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>
export type ProgressBarRef = HTMLDivElement
export interface ProgressBarProps extends JSXElement {
  value?: number
  speed?: TransitionSpeed | number
  children?: ReactNode
  ref?: React.Ref<any>
}
