import React, { isValidElement } from 'react'
import { run, isObject } from '@fexd/tools'

import createFC from '../createFC'
import { HookProps } from './type'

const Hook = createFC<HookProps>(function Hook({ hook, children, ...props }): JSX.Element | null {
  const content = run<JSX.Element>(hook ?? children, undefined, props) ?? null

  if (isObject(content) && !isValidElement(content)) {
    return null
  }

  return content
})

export default Hook
