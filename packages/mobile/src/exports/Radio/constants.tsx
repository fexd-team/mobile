import React from 'react'
import { CheckmarkCircle, EllipseOutline } from '@fexd/icons'

export const defaultIcon = (checked) => (checked ? <CheckmarkCircle /> : <EllipseOutline />)
export const prefix = 'exd-radio'
