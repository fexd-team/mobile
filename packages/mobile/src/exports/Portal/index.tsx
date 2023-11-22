import React, { useMemo, useEffect, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { globalThis as root, get, run, debounce, throttle } from '@fexd/tools'

import createFC from '../../helpers/createFC'

export interface PortalProps {
  children: React.ReactNode
  className?: string
  to?: any
}

let dropTasks: any[] = []
const drop = debounce(
  throttle(() => {
    dropTasks.forEach((fn) => run(fn))
    dropTasks = []
  }, 1000),
  128,
)

const Portal = createFC<PortalProps, any>(function Portal({ children, className, to: appendTo }, forwardedRef) {
  const container = useMemo(() => document.createElement('div'), [])
  useImperativeHandle(forwardedRef, () => container)

  useEffect(() => {
    if (className) {
      container.className = className
    }
  }, [className])

  useEffect(() => {
    run(appendTo, 'appendChild', container)

    return () => {
      dropTasks.push(() => {
        run(appendTo, 'removeChild', container)
      })
      // 卸载行为优化
      drop()
    }
  }, [])

  return createPortal(children, container)
})

Portal.defaultProps = {
  to: get(root, 'document.body'),
}

export default Portal
