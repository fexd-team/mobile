import { classnames } from '@fexd/tools'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import createFC from '../../helpers/createFC'
import FullScreen from './FullScreen'
import Mask from './Mask'
import PlaybackRate from './PlaybackRate'
import Progress from './Progress'
import Time from './Time'
import { VideoProps, VideoRef, VIDEO_COMPONENT_WRAP } from './type'
import Player from './Player'
import { PlayerRef } from './Player/type'
import VideoLoading from './VideoLoading'
import MutedButton from './MutedButton'
// import { subEventExecuteFun } from './utils'
// console.log()

export const prefix = 'exd-video'

const Video = createFC<VideoProps, VideoRef>(function Video({
  src: videoUrl,
  width,
  poster,
  autoPlay,
  onPlayingStateChange,
  onShowToolChange,
  isShowProgress = true,
}) {
  // console.log('Video render........')

  const videoWrapRef = useRef<PlayerRef>(null)
  const timer = useRef<any>(null)
  const hasClickRef = useRef<boolean>(false)
  const videoLoadingRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [showPlayBtn, setShowPlayBtn] = useState<boolean>(true)
  const [isShowTool, setIsShowTool] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isFull, setIsFull] = useState(false)

  /** 当前处于第几个速率 循环切换 */
  const [currentIndexRate, setCurrentIndexRate] = useState(0)

  const handleChangeVideoLoading = useCallback((v: boolean) => {
    videoLoadingRef.current.changeIsWaiting(v)
  }, [])

  useEffect(() => {
    if (!autoPlay) {
      setIsShowTool(true)
      setIsMuted(false)
    } else {
      setShowPlayBtn(false)
      handleChangeVideoLoading(true)
    }
  }, [autoPlay, handleChangeVideoLoading])

  useEffect(() => {
    /** 对外抛出视频播放状态 */
    if (onPlayingStateChange) {
      onPlayingStateChange(isPlaying)
    }
  }, [isPlaying, onPlayingStateChange])

  useEffect(() => {
    if (onShowToolChange) {
      onShowToolChange(isShowTool)
    }
  }, [isShowTool, onShowToolChange])

  useEffect(() => {
    // 退出全屏 PC端无法监测退出全屏
    if (!isFull && isPlaying) {
      setShowPlayBtn(false)
    }

    if (!isFull && !isPlaying) {
      setShowPlayBtn(true)
    }
  }, [isFull, isPlaying])

  /** 点击区域暂停视频播放 */
  const handleTouch = (ev: React.TouchEvent<HTMLDivElement>) => {
    ev.stopPropagation()

    if (!hasClickRef.current) {
      setIsMuted(false)
      hasClickRef.current = true
      return
    }

    setIsShowTool((old) => !old)
  }

  const controlTool = useCallback(() => {
    if (isShowTool && !showPlayBtn) {
      timer.current = setTimeout(() => {
        setIsShowTool(false)
      }, 2000)
    } else {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [showPlayBtn, isShowTool])

  useEffect(() => {
    controlTool()
  }, [controlTool, isShowTool])

  const handleChangIsFull = useCallback((val: any) => {
    setIsFull(val)
  }, [])

  const handleChangeIsShowTool = useCallback((val: any) => {
    setIsShowTool(val)
  }, [])

  const handleChangeMuted = useCallback((val: any) => {
    setIsMuted(val)
  }, [])

  const handleChangeShowBtn = useCallback((val: any) => {
    setShowPlayBtn(val)
  }, [])

  const handleChangeIsPlaying = useCallback((val: any) => {
    setIsPlaying(val)
  }, [])

  if (!videoUrl) {
    return null
  }

  return (
    <div className={prefix}>
      <div onTouchEnd={handleTouch} className={`${prefix}-player`}>
        <Player
          ref={videoWrapRef}
          onChangePlaying={handleChangeIsPlaying}
          onChangeToolShow={handleChangeIsShowTool}
          videoUrl={videoUrl}
          width={width}
          poster={poster}
          isMuted={isMuted}
          autoPlay={autoPlay}
          hasClickRef={hasClickRef}
          onChangShowBtn={handleChangeShowBtn}
        />
      </div>

      <VideoLoading isShowTool={isShowTool} videoWrapRef={videoWrapRef} ref={videoLoadingRef} />

      <MutedButton isMuted={isMuted} isShowTool={isShowTool} autoPlay={autoPlay} onChangeMuted={setIsMuted} />

      <Mask
        isShowTool={isShowTool}
        showPlayBtn={showPlayBtn}
        videoWrapRef={videoWrapRef}
        onChangShowBtn={handleChangeShowBtn}
        onChangeIsShowTool={handleChangeIsShowTool}
        onChangeMuted={handleChangeMuted}
        onChangeLoading={handleChangeVideoLoading}
      />

      <div className={`${prefix}-video-plugin`}>
        <div
          className={classnames(`${prefix}-plugin-top`, {
            [`${prefix}-plugin-top--hide`]: !isShowTool,
          })}
        >
          {/* 时间展示 */}
          <div className={`${prefix}-plugin-top-left`}>
            <Time videoWrapRef={videoWrapRef} />
          </div>

          <div className={`${prefix}-plugin-top-right`}>
            {/* 播放率 */}
            <PlaybackRate
              videoWrapRef={videoWrapRef}
              currentIndexRate={currentIndexRate}
              setCurrentIndexRate={setCurrentIndexRate}
              timer={timer.current}
              controlTool={controlTool}
            />
            {/* 全屏 */}
            <FullScreen videoWrapRef={videoWrapRef} onChangIsFull={handleChangIsFull} />
          </div>
        </div>

        {isShowProgress ? (
          <div className={`${prefix}-video-plugin-bottom`}>
            {/* 进度条 */}
            <Progress videoWrapRef={videoWrapRef} isShowTool={isShowTool} showPlayBtn={showPlayBtn} />
          </div>
        ) : null}
      </div>
    </div>
  )
})

Video.defaultProps = {
  autoPlay: true,
}

export default Video
