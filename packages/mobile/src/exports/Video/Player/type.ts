export interface PlayerProps {
  width?: number
  poster?: string
  videoUrl: string
  onChangePlaying: (v: boolean) => void
  onChangeToolShow: (v: boolean) => void
  onChangShowBtn: (v: boolean) => void
  isMuted: boolean
  autoPlay?: boolean
  hasClickRef: any
}

export type PlayerRef = {
  videoRef: React.RefObject<HTMLVideoElement>
  videoPause: () => void
  videoPlay: () => Promise<void> | undefined
  changeVideoCurrTime: (time: number) => void
  changeVideoPlaybackRate: (rate: number) => void
}
