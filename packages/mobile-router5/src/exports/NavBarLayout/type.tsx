import { TransitionSwitchProps } from '@fexd/mobile/es/exports/TransitionSwitch/type'
import { FC } from '@fexd/mobile/es/helpers/createFC'
import { JSXDivElement } from '@fexd/mobile/es/helpers/html.types'

export interface NavBarLayoutProps extends JSXDivElement {
  title?: string
  animate?: TransitionSwitchProps['animate']
  children: React.ReactNode[]
}
export type NavBarLayoutRef = HTMLDivElement
export interface NavBarLayoutType extends FC<NavBarLayoutProps> {}
