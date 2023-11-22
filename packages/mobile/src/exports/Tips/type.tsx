import { ReactNode } from 'react'
import { FC } from '../../helpers/createFC'

export interface TipsProps {
  title: ReactNode | (() => ReactNode)
  visible?: boolean
  placement?: string
  children?: ReactNode
  zIndex?: number
  theme?: string
  modal?: boolean
  // autoAdjustOverflow?: boolean
  onVisibleChange?: (visible: boolean) => void
}
export type TipsRef = any
export interface TipsType extends FC<TipsProps> {}
