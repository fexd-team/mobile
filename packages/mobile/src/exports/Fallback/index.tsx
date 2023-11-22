import React from 'react'
import { get, run, classnames, source } from '@fexd/tools'
import { WarningOutline } from '@fexd/icons'

import createFC from '../../helpers/createFC'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface ErrorInfoType {
  error?: Error | unknown
  isOfflineError?: boolean
  isSystemError?: boolean
}

export interface FallbackProps extends Omit<JSXDivElement, 'children'> {
  error?: Error | unknown
  icon?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  children?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  footer?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  console?: boolean
}

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
            source.js('//cdn.jsdelivr.net/npm/eruda', 'eruda').then((eruda) => {
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
