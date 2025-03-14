import React, { useEffect, useContext } from 'react'
import { IRouteComponentProps } from '@umijs/types'
import { context } from 'dumi/theme'
import { Provider } from '@fexd/mobile'
import vl from 'umi-hd'
import flex from 'umi-hd/lib/flex'
import vw from 'umi-hd/lib/vw'
import vh from 'umi-hd/lib/vh'
import { isAndroid, isIOS } from '@fexd/tools'
// import ResizeObserver from 'resize-observer-polyfill/src'

import IThemeConfig from '../typings/config'

import '@root/packages/mobile/src/style.less'

console.log('raw', window.ResizeObserver)
delete window.ResizeObserver
console.log('delete', window.ResizeObserver)
window.ResizeObserver = window._ResizeObserver
console.log('polyfill', window.ResizeObserver)

const isMobile = isAndroid() || isIOS()

// available HD modes
const HD_MODES = {
  vl,
  flex,
  vw,
  vh,
}

try {
  document?.documentElement?.classList?.add('desktop')
} catch (err) {
  //
}

const MobileDemoLayout: React.FC<IRouteComponentProps> = ({ children }) => {
  const { config } = useContext(context)
  const { hd: { rules = [{ mode: 'vw', options: [100, 750] }] } = {} } = config.theme as IThemeConfig

  useEffect(() => {
    if (isMobile) {
      document?.documentElement?.classList?.remove('desktop')
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      const { clientWidth } = document.documentElement

      rules
        // discard invalid rules
        .filter((rule) => HD_MODES[rule.mode])
        // match first valid rule
        .some((rule: any) => {
          if (
            // without min & max width
            (Number.isNaN(rule.minWidth * 1) && Number.isNaN(rule.maxWidth * 1)) ||
            // min width only
            (Number.isNaN(rule.maxWidth * 1) && clientWidth > rule.minWidth) ||
            // max width only
            (Number.isNaN(rule.minWidth * 1) && clientWidth < rule.maxWidth) ||
            // both min & max width
            (clientWidth > rule.minWidth && clientWidth < rule.maxWidth)
          ) {
            HD_MODES[rule.mode](...[].concat(rule.options))
            document.documentElement.setAttribute('data-scale', 'true')
            return true
          }
        })
    }

    handler()
    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [rules])

  return (
    <>
      <style>{`
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
      <div className="__dumi-default-mobile-demo-layout">
        <Provider>{children}</Provider>
      </div>
    </>
  )
}

export default MobileDemoLayout
