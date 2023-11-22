import { Context } from 'react'
import { FC } from '../../../helpers/createFC'
import { JSXDivElement } from '../../../helpers/html.types'
import { CellProps } from '../type'

export interface CellGroupProps extends JSXDivElement {}
export interface CellGroupProps extends Pick<CellProps, 'size'> {}
export interface CellGroupProps {
  title?: string
  inset?: boolean
  border?: boolean
}
export type CellGroupRef = HTMLDivElement

export interface CellGroupType extends FC<CellGroupProps> {}
export type CellGroupContext = Context<CellGroupProps>
