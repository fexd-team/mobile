import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react'
import createFC from '../../createFC'
import { ProgressProps } from './type'
import { useMount, useUnmount } from 'ahooks'
import { getOffset } from '../utils'
import { classnames } from '@fexd/tools'

const prefix = 'exd-video-progress'

const Progress = createFC<ProgressProps>(function Progress({ videoWrapRef, isShowTool, showPlayBtn }) {
  const eleRef = useRef<any>(null)
  const [isTouchStart, setIsTouchStart] = useState<boolean>(false)
  const [processWidth, setProcessWidth] = useState<number>(0) // 视频进度条总长度
  const [leftInit, setLeftInit] = useState<number>(0) // 当前进度初始偏移量
  const [distance, setDistance] = useState<number>(0) // 移动的距离
  const [totalDuration, setTotalDuration] = useState<number>(0)

  useMount(() => {
    const outSide = document.getElementById('player-progress-outside')
    setProcessWidth(outSide?.clientWidth || 0)
    setLeftInit(getOffset(outSide).left || 0)
  })

  const changeStyle = (percentage: number): void => {
    const inside = document.getElementById('player-progress-inside')
    const point = document.getElementById('player-progress-point')

    if (inside) {
      inside.style.width = percentage + '%'
    }

    if (point) {
      point.style.left = percentage - 1 + '%'
    }
  }

  const onTimeupdate = useCallback(() => {
    if (!isTouchStart) {
      const percentage = (100 * eleRef.current.currentTime) / totalDuration
      changeStyle(percentage)
    }
  }, [isTouchStart, totalDuration])

  const onLoadedmetadata = () => {
    setTotalDuration(eleRef.current.duration)
  }

  const onEnd = useCallback(() => {
    changeStyle(0)
  }, [])

  useEffect(() => {
    eleRef.current = videoWrapRef.current.videoRef.current
    eleRef.current.addEventListener('timeupdate', onTimeupdate)
    eleRef.current.addEventListener('loadedmetadata', onLoadedmetadata)
    eleRef.current.addEventListener('ended', onEnd)
  }, [onEnd, onTimeupdate, totalDuration, videoWrapRef])

  useUnmount(() => {
    eleRef.current.removeEventListener('timeupdate', onTimeupdate)
    eleRef.current.removeEventListener('endloadedmetadataed', onLoadedmetadata)
    eleRef.current.removeEventListener('ended', onEnd)
  })

  const handleTouchStart = (ev: React.TouchEvent<HTMLDivElement>): void => {
    setIsTouchStart(true)
    const clientX = ev.changedTouches[0].clientX
    const newDis = clientX - leftInit
    setDistance(newDis)
  }

  const handleTouchMove = (ev: React.TouchEvent<HTMLDivElement>): void => {
    if (!isTouchStart) {
      return
    }

    const clientX = ev.changedTouches[0].clientX
    let disX = clientX - leftInit

    if (disX > processWidth) {
      disX = processWidth
    }

    if (disX < 0) {
      disX = 0
    }

    setDistance(disX)
    changeStyle((disX * 100) / processWidth)
  }

  const handleTouchEnd = () => {
    setIsTouchStart(false)
    const newTime = (distance / processWidth) * totalDuration
    videoWrapRef.current.changeVideoCurrTime(newTime)

    if (!showPlayBtn) {
      videoWrapRef.current.videoPlay()
    }
  }

  return (
    <div className={prefix} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className={`${prefix}-progress-outside`} id="player-progress-outside">
        <span className={`${prefix}-progress-inside`} id="player-progress-inside" />
        <span
          className={classnames(`${prefix}-progress-inside-point`, {
            [`${prefix}-progress-inside-point--show`]: isShowTool || isTouchStart,
          })}
          id="player-progress-point"
        />
      </div>
    </div>
  )
})

export default memo(Progress)
