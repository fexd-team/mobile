import React from 'react'

import { HTMLJSXElement } from '../../helpers/html.types'

export type SwitchRef = HTMLLabelElement

export interface SwitchProps extends Omit<HTMLJSXElement<HTMLLabelElement>, 'defaultValue' | 'onChange'> {
  checked?: boolean
  children?: React.ReactNode
  ref?: React.Ref<SwitchRef>
  onChange?: (checked: boolean) => void
}
