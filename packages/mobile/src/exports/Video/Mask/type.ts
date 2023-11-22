export interface MaskProps {
  videoWrapRef: any
  showPlayBtn: boolean
  onChangeLoading: (v: boolean) => void
  onChangeMuted: (v: boolean) => void
  onChangShowBtn: (v: boolean) => void
  onChangeIsShowTool: any
  isShowTool: boolean
}

export const MASK_DOM_ID = 'video-mask'
export const MASK_PLAY_BUTTON = 'video-mask-play-button'
export const MASK_PAUSE_BUTTON = 'video-mask-pause-button'
