// @ts-nocheck
import { Form } from '../createForm'
import { createContext } from 'react'

export const context = createContext<Form | undefined>(undefined)
export const { Provider, Consumer } = context
