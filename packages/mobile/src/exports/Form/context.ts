// @ts-nocheck
import { Form } from '../formini'
import { createContext } from 'react'

export const context = createContext<Form | undefined>(undefined)
export const { Provider, Consumer } = context
