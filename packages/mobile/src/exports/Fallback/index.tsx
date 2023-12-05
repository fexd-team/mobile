import React from 'react'
import { get, run, classnames, source } from '@fexd/tools'
import { WarningOutline } from '@fexd/icons'

import createFC from '../createFC'
import { ErrorInfoType, FallbackProps } from './type'

const Fallback = createFC<FallbackProps, HTMLDivElement>(function (
  { error, className, icon, children, footer, console: showConsoleEntry, ...props },
  forwardedRef,
) {
  const isOfflineError = /OFFLINE/.test(get(error, 'stack')) || get(window, 'navigator.onLine') === false
  const isSystemError = [/^TypeError:/, /^SyntaxError:/].some((reg) => reg.test(get(error, 'stack')))

  const errorInfo: ErrorInfoType = {
    error,
    isOfflineError,
    isSystemError,
  }

  return (
    <div {...props} className={classnames('exd-fallback', className)} ref={forwardedRef}>
      <div className="exd-fallback-icon">{run(icon, undefined, errorInfo)}</div>
      <div className="exd-fallback-content">{run(children, undefined, errorInfo)}</div>
      <div className="exd-fallback-footer">{run(footer, undefined, errorInfo)}</div>
      {showConsoleEntry && (
        <a
          className="exd-fallback-console"
          onClick={() => {
            source.js('https://cdn.jsdelivr.net/npm/eruda', 'eruda').then((eruda) => {
              run(eruda, 'init')
              console.error(error)
              run(eruda, 'show')
            })
          }}
        >
          console
        </a>
      )}
    </div>
  )
})

Fallback.defaultProps = {
  icon: <WarningOutline />,
  console: false,
}

export default Fallback
