import React, { memo, useState, useMemo, useEffect } from 'react'
import createFC from '../../createFC'
import { PlaybackRateProps, ALL_PLAYBACK_RATE, ALL_PLAYBACK_RATE_TEXT } from './type'

const prefix = 'exd-video-playbackrate'

const PlaybackRate = createFC<PlaybackRateProps>(function PlaybackRate({
  videoWrapRef,
  currentIndexRate,
  setCurrentIndexRate,
  timer,
  controlTool,
}) {
  const [changing, setChanging] = useState(false)

  /** 当前播放速率 */
  const currentRate = useMemo(() => {
    return ALL_PLAYBACK_RATE[currentIndexRate]
  }, [currentIndexRate])

  /** 当前播放速率文字描述 */
  const text = useMemo(() => {
    return ALL_PLAYBACK_RATE_TEXT[currentIndexRate]
  }, [currentIndexRate])

  useEffect(() => {
    const ele = videoWrapRef.current.videoRef.current
    if (ele.playbackRate.toFixed(1) !== currentRate.toFixed(1)) {
      videoWrapRef.current.changeVideoPlaybackRate(Number(currentRate))
    }
  }, [currentRate, videoWrapRef])

  /** 响应循环切换速率 */
  const handleChangeRate = () => {
    if (changing) {
      return
    }

    setChanging(true)
    clearTimeout(timer)
    const length = ALL_PLAYBACK_RATE.length

    if (currentIndexRate + 1 === length) {
      setCurrentIndexRate(0)
    } else {
      setCurrentIndexRate((old: number) => old + 1)
    }

    setChanging(false)
    controlTool()
  }

  return (
    <div className={prefix} onTouchEnd={handleChangeRate}>
      {text}
    </div>
  )
})

export default memo(PlaybackRate)
