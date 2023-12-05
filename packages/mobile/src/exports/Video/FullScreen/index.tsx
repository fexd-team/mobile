import React, { useEffect, useRef } from 'react'
import { Expand } from '@fexd/icons'
import { useUnmount } from 'ahooks'

import { FullScreenProps } from './type'
import createFC from '../../createFC'
import classList from '../../../helpers/classList'

const prefix = 'exd-video-fullscreen'

const FullScreen = createFC<FullScreenProps>(function FullScreen({ videoWrapRef, onChangIsFull }) {
  const eleRef = useRef<any>(null)
  let fullsreenDom: HTMLElement | null

  /** 全屏方法 */
  const requestFullScreen = () => {
    if (!videoWrapRef.current) {
      return
    }

    if (eleRef.current.requestFullscreen) {
      const fullscreenPromise = eleRef.current.requestFullscreen()

      if (fullscreenPromise) {
        fullscreenPromise.catch(function () {
          // do nothing
        })
      }
    } else if (eleRef.current.mozRequestFullScreen) {
      eleRef.current.mozRequestFullScreen()
    } else if (eleRef.current.webkitRequestFullScreen) {
      eleRef.current.webkitRequestFullScreen()
    } else if (eleRef.current.webkitEnterFullscreen) {
      eleRef.current.webkitEnterFullscreen()
    } else {
      eleRef.current.current.style.width = '100%'
      eleRef.current.current.style.height = '100%'
    }

    // classList(fullsreenDom).add('is-fullscreen')
    classList(fullsreenDom).add('is-fullscreen')
    onChangIsFull?.(true)
  }

  /** 退出全屏方法 */
  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      // @ts-ignore
      document.webkitExitFullscreen()
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen()
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen()
    }

    classList(fullsreenDom).remove('is-fullscreen')
    classList(fullsreenDom).remove('is-fullscreen')
    onChangIsFull?.(false)
  }

  /** 响应点击全屏 */
  const handleFullScreen = () => {
    if (classList(fullsreenDom).contains('is-fullscreen')) {
      exitFullScreen()
    } else {
      requestFullScreen()
    }
  }

  const change = () => {
    onChangIsFull?.(false)
  }

  /** 全屏状态变更 */
  const onFullscreenChange = () => {
    // TODO: pc端不起效果
    const fullscreenEl =
      document.fullscreenElement ||
      // @ts-ignore
      document.webkitFullscreenElement ||
      // @ts-ignore
      document.mozFullScreenElement ||
      // @ts-ignore
      document.msFullscreenElement

    if (fullscreenEl) {
      classList(fullsreenDom).add('is-fullscreen')
    } else if (classList(fullsreenDom).contains('is-fullscreen')) {
      // 退出全屏
      classList(fullsreenDom).remove('is-fullscreen')
      change() // 直接接收props里面的onChangIsFull去修改会出现问题
    }
  }

  const onwebkitbeginfullscreen = () => {
    classList(fullsreenDom).add('is-fullscreen')
    requestFullScreen()
  }

  const onwebkitendfullscreen = () => {
    classList(fullsreenDom).remove('is-fullscreen')
    exitFullScreen()
  }

  useEffect(() => {
    fullsreenDom = document.getElementById('fullscreen')
    ;['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach((item) => {
      document.addEventListener(item, onFullscreenChange)
    })

    eleRef.current = videoWrapRef.current.videoRef.current
    eleRef.current.addEventListener('webkitbeginfullscreen', onwebkitbeginfullscreen)
    eleRef.current.addEventListener('webkitendfullscreen', onwebkitendfullscreen)
  }, [])

  useUnmount(() => {
    ;['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach((item) => {
      document.removeEventListener(item, onFullscreenChange)
    })

    eleRef.current.removeEventListener('webkitbeginfullscreen', onwebkitbeginfullscreen)
    eleRef.current.removeEventListener('webkitendfullscreen', onwebkitendfullscreen)
  })

  return (
    <div onTouchEnd={handleFullScreen} className={prefix}>
      <Expand />
    </div>
  )
})

export default FullScreen
