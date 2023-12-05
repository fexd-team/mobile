import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { HTMLJSXProps } from '../../helpers/html.types'

export type SwitchRef = HTMLLabelElement

export interface SwitchProps extends Omit<HTMLJSXProps<HTMLLabelElement>, 'defaultValue' | 'onChange'> {
  checked?: boolean
  children?: React.ReactNode
  ref?: React.Ref<SwitchRef>
  onChange?: (checked: boolean) => void
}

export default AUTO_API<SwitchProps>()
