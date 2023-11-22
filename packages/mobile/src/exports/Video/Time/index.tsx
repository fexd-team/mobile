import React, { useEffect, memo, useRef, useCallback } from 'react'
import createFC from '../../../helpers/createFC'
import { useUnmount } from 'ahooks'
import { TimeProps, ChangType } from './type'
import { timeTranslate } from '../utils'

const prefix = 'exd-video-time'

const Time = createFC<TimeProps>(function Time({ videoWrapRef }) {
  const eleRef = useRef<any>(null)

  const changeInnerHtml = (type: ChangType, time = '00:00') => {
    const currentTimeDom = document.getElementById('player-time-current')
    const totalTimeDom = document.getElementById('player-time-total')

    if (type === ChangType.Curr && currentTimeDom) {
      currentTimeDom.innerHTML = time
    }

    if (type === ChangType.Total && totalTimeDom) {
      totalTimeDom.innerHTML = time
    }
  }

  const onTimeupdate = useCallback(() => {
    const currentShowTime = timeTranslate(eleRef.current?.currentTime)
    changeInnerHtml(ChangType.Curr, currentShowTime)
  }, [])

  const onLoadedmetadata = () => {
    const totalTime = timeTranslate(eleRef.current.duration)
    changeInnerHtml(ChangType.Total, totalTime)
  }

  const onEnd = () => {
    changeInnerHtml(ChangType.Curr, '00:00')
  }

  useEffect(() => {
    eleRef.current = videoWrapRef.current.videoRef.current
    eleRef.current.addEventListener('timeupdate', onTimeupdate)
    eleRef.current.addEventListener('loadedmetadata', onLoadedmetadata)
    eleRef.current.addEventListener('ended', onEnd)
  }, [onTimeupdate, videoWrapRef])

  useUnmount(() => {
    eleRef.current.removeEventListener('timeupdate', onTimeupdate)
    eleRef.current.removeEventListener('endloadedmetadataed', onLoadedmetadata)
    eleRef.current.removeEventListener('ended', onEnd)
  })

  return (
    <div className={prefix}>
      <span id="player-time-current">00:00</span>/<span id="player-time-total">00:00</span>
    </div>
  )
})

export default memo(Time)
