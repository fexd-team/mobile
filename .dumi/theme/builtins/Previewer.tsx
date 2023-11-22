import React, { useRef, useEffect, useState, useContext } from 'react'
import { context } from 'dumi/theme'
import { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer'
import Previewer from 'dumi-theme-default/src/builtins/Previewer'
import { isAndroid, isIOS, debounce } from '@fexd/tools'
import './Previewer.less'

export const ACTIVE_MSG_TYPE = 'dumi:scroll-into-demo'

const isMobile = isAndroid() || isIOS()

export default (props: IPreviewerProps) => {
  const ref = useRef<HTMLDivElement>()
  const { meta } = useContext(context)
  const [previewerProps, setPreviewerProps] = useState<null | IPreviewerProps>(null)
  const [isActive, setIsActive] = useState(false)
  const useMobileDemo = !previewerProps ? false : meta?.mobile ?? previewerProps?.mobile ?? true

  useEffect(() => {
    const isFirstDemo = useMobileDemo && document.querySelector('.__dumi-default-mobile-previewer') === ref.current
    const handler = debounce(() => {
      const scrollTop = document.documentElement.scrollTop + 128

      // post message if scroll into current demo
      if (
        (useMobileDemo &&
          // fallback to first demo
          isFirstDemo &&
          scrollTop < ref?.current?.offsetTop) ||
        // detect scroll position
        (scrollTop > ref?.current?.offsetTop && scrollTop < ref?.current?.offsetTop + ref?.current?.offsetHeight)
      ) {
        window.postMessage(
          { type: ACTIVE_MSG_TYPE, value: JSON.stringify({ identifier: props.identifier, demoUrl: props.demoUrl }) },
          '*',
        )
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }, 50)

    // only render mobile phone when screen max than 960px
    if (window?.outerWidth > 960 && useMobileDemo) {
      // active source code wrapper if scroll into demo
      handler()
      window.addEventListener('scroll', handler)

      // rewrite props for device mode
      setPreviewerProps(
        Object.assign(
          {},
          {
            // omit iframe
            iframe: null,
            // omit children
            children: null,
            // show source code
            defaultShowCode: true,
            // hide external action
            hideActions: ['EXTERNAL' as IPreviewerProps['hideActions'][0]].concat(props.hideActions),
          },
          props,
        ),
      )
    } else {
      // use standard mode if screen min than 960px
      setPreviewerProps(props)
    }

    return () => window.removeEventListener('scroll', handler)
  }, [props, useMobileDemo])

  useEffect(() => {
    if (!isMobile) {
      document?.documentElement?.classList?.add('desktop')
    }
  }, [])

  return (
    <div className={useMobileDemo ? '__dumi-default-mobile-previewer' : null} ref={ref}>
      {previewerProps && (
        <Previewer
          className={useMobileDemo && isActive ? '__dumi-default-previewer-target' : null}
          {...previewerProps}
          defaultShowCode={window?.outerWidth > 960 && useMobileDemo}
        />
      )}
    </div>
  )
}
