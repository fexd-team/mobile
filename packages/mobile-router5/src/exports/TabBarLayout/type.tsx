import { TransitionSwitchProps } from '@fexd/mobile/es/exports/TransitionSwitch/type'
import { FC } from '@fexd/mobile/es/helpers/createFC'

export type TabBarLayoutRef = any

export type TabConfig = {
  name: string
  icon?: React.ReactNode
}

export interface TabBarLayoutProps {
  children: React.ReactNode[]
  animate?: TransitionSwitchProps['animate']
  tabs?: TabConfig[]
}
export interface TabBarLayoutType extends FC<TabBarLayoutProps> {}
