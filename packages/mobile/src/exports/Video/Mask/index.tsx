import React from 'react'
import { classnames } from '@fexd/tools'
import { Play, Pause } from '@fexd/icons'

import createFC from '../../createFC'
import { MaskProps } from './type'

const prefix = 'exd-video-mask'

const Mask = createFC<MaskProps>(function Mask({
  videoWrapRef,
  onChangeIsShowTool,
  onChangeMuted,
  onChangeLoading,
  showPlayBtn,
  onChangShowBtn,
  isShowTool,
}) {
  return (
    <div
      className={classnames(prefix, {
        [`${prefix}--hide`]: !isShowTool,
      })}
      onClick={(ev) => {
        ev.stopPropagation()
        onChangeIsShowTool((old: boolean) => !old)
      }}
    >
      {showPlayBtn ? (
        <div
          onClick={(ev) => {
            ev.stopPropagation()
            onChangeMuted(false)
            videoWrapRef.current.videoPlay()
            onChangeLoading(true)
            onChangShowBtn(false)
          }}
        >
          {/* <img src={playBtn} alt="" onTouchEnd={handlePlay} /> */}
          <Play />
        </div>
      ) : (
        <div
          onClick={(ev) => {
            ev.stopPropagation()
            videoWrapRef.current.videoPause()
            onChangShowBtn(true)
          }}
        >
          <Pause />
        </div>
      )}
    </div>
  )
})

export default Mask
