export interface PlaybackRateProps {
  videoWrapRef: any
  currentIndexRate: number
  setCurrentIndexRate: any
  timer: any
  controlTool: () => void
}

export const ALL_PLAYBACK_RATE: number[] = [1, 1.5, 2]
export const ALL_PLAYBACK_RATE_TEXT: string[] = ['1.0x', '1.5x', '2.0x']
