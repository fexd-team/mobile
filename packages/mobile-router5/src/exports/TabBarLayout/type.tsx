import { FC, TransitionSwitchProps } from '@fexd/mobile'

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
