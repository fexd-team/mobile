import React, { memo } from 'react'
import createFC from '../../createFC'
import { MutedButtonProps } from './type'
import { classnames } from '@fexd/tools'
import { VolumeMute } from '@fexd/icons'

// const mutedSrc = require('./imgs/icon-muted@2x.png')

const prefix = 'exd-video-muted'

const MutedButton = createFC<MutedButtonProps>(function MutedButton({ isMuted, isShowTool, autoPlay, onChangeMuted }) {
  const isShowButton = isMuted && !isShowTool && autoPlay

  /** 修改是否静音 */
  const handleUnMuted = (ev: React.TouchEvent<HTMLDivElement>) => {
    ev.stopPropagation()
    onChangeMuted(false)
  }

  return (
    <div
      className={classnames(prefix, {
        [`${prefix}--hide`]: !isShowButton,
      })}
      onTouchEnd={handleUnMuted}
    >
      <div className={`${prefix}-icon`}>
        {/* <img src={mutedSrc} alt="" /> */}
        <VolumeMute />
      </div>
      <div className={`${prefix}-text`}>点击取消静音</div>
      <div className={`${prefix}-box`} />
    </div>
  )
})

export default MutedButton
