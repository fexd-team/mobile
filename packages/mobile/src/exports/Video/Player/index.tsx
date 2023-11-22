import React, { memo, forwardRef, useRef, useImperativeHandle, RefObject } from 'react'
import { PlayerProps, PlayerRef } from './type'
import { useMount, useUnmount } from 'ahooks'
import { DEFAULT_WIDTH } from '../type'

const Player = forwardRef<PlayerRef, PlayerProps>(
  (
    { width, poster, videoUrl, onChangePlaying, onChangeToolShow, isMuted, autoPlay, hasClickRef, onChangShowBtn },
    parentRef,
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    /** 设置当前视频是否处于播放状态 */
    const handlePlaying = () => {
      onChangePlaying(true)
    }

    /** 设置当前视频是否处于暂停状态 */
    const handleAbort = () => {
      onChangePlaying(false)
    }

    /** 修改当前视频播放的时刻 */
    const changeVideoCurrTime = (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time
      }
    }

    /** 修改当前视频播放速率 */
    const changeVideoPlaybackRate = (rate: number) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = rate
      }
    }

    /** 对父组件输出实例和方法 */
    useImperativeHandle(parentRef, () => {
      return {
        videoRef,
        videoPause() {
          return videoRef.current?.pause()
        },
        videoPlay() {
          return videoRef.current?.play()
        },
        changeVideoCurrTime(time: number) {
          return changeVideoCurrTime(time)
        },
        changeVideoPlaybackRate(rate: number) {
          return changeVideoPlaybackRate(rate)
        },
      }
    })

    const onEnd = () => {
      onChangePlaying(false)
      onChangeToolShow(true)
      hasClickRef.current = true
      onChangShowBtn(true)
    }

    useMount(() => {
      /** 监听视频播放结束 */
      videoRef.current?.addEventListener('ended', onEnd)
    })

    useUnmount(() => {
      videoRef.current?.removeEventListener('ended', onEnd)
    })

    return (
      <video
        ref={videoRef}
        poster={poster}
        onPlaying={handlePlaying}
        onAbort={handleAbort}
        onPause={handleAbort}
        width={width ?? DEFAULT_WIDTH}
        src={videoUrl}
        // @ts-ignore
        type="video/mp4"
        height="100%"
        controlsList="nodownload" // 不下载
        disablePictureInPicture //防止浏览器建议图片中的上下文
        playsInline={true}
        webkit-playsinline="true"
        autoPlay={autoPlay}
        muted={isMuted}
      >
        <p>设备不支持</p>
      </video>
    )
  },
)

export default memo(Player)
