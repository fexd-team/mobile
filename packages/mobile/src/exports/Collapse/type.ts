import React from 'react'
import { JSXDivElement } from '../../helpers/html.types'

export type ActiveKeyType = React.Key

export type CollapseRef = HTMLDivElement

export interface CollapseProps extends Omit<JSXDivElement, 'onChange'> {
  defaultActiveKey?: ActiveKeyType | ActiveKeyType[]
  activeKey?: ActiveKeyType | ActiveKeyType[]
  accordion?: boolean
  onChange?: (activeKey: ActiveKeyType[]) => void
  // children?: React.ReactNode
  expandIcon?: React.ReactNode
  iconRotate?: boolean
  ref?: React.Ref<CollapseRef>
}

export interface CollapsePanelProps extends Omit<JSXDivElement, 'title'> {
  title?: React.ReactNode | string
  disabled?: boolean
  headerClass?: string
  // children?: React.ReactNode
  expandIcon?: React.ReactNode
  iconRotate?: boolean
  isActive?: boolean
  panelKey?: string | number
  onItemClick?: (panelKey: string | number) => void
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
}
