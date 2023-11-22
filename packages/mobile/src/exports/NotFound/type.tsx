import React, { ReactNode } from 'react'
import { FC } from '../../helpers/createFC'
import { EmptyProps, EmptyRef } from '../Empty/type'

export interface NotFoundProps extends EmptyProps {}
export type NotFoundRef = EmptyRef
export interface NotFoundType extends FC<NotFoundProps> {}
