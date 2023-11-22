import React, { memo, useEffect, useRef, useCallback, useState, useMemo, useImperativeHandle, forwardRef } from 'react'
import { VideoLoadingProps, VideoLoadingRef } from './type'
import { classnames } from '@fexd/tools'
import { useUnmount } from 'ahooks'
import FullpageSpinner from '../../FullpageSpinner'

const prefix = 'exd-video-loading'

const VideoLoading = forwardRef<VideoLoadingRef, VideoLoadingProps>(({ isShowTool, videoWrapRef }, parentRef) => {
  const eleRef = useRef<any>(null)
  const [isWaiting, setIsWaiting] = useState<boolean>(false)
  const isShow = useMemo(() => isWaiting && !isShowTool, [isShowTool, isWaiting])

  const onWaiting = useCallback(() => {
    setIsWaiting(true)
  }, [])

  const onPlaying = useCallback(() => {
    setIsWaiting(false)
  }, [])

  useImperativeHandle(parentRef, () => {
    return {
      changeIsWaiting(rate: boolean) {
        return setIsWaiting(rate)
      },
    }
  })

  useEffect(() => {
    eleRef.current = videoWrapRef.current.videoRef.current
    eleRef.current.addEventListener('waiting', onWaiting)
    eleRef.current.addEventListener('playing', onPlaying)
  }, [onWaiting, onPlaying, videoWrapRef])

  useUnmount(() => {
    eleRef.current.removeEventListener('waiting', onWaiting)
    eleRef.current.removeEventListener('playing', onPlaying)
  })

  return (
    <div className={classnames(prefix, isShow ? '' : `${prefix}-hide`)}>
      {/* <img src={require('./imgs/loading.gif')} alt="" /> */}
      <FullpageSpinner />
    </div>
  )
})

export default memo(VideoLoading)
