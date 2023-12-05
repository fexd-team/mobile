import AUTO_API from '../../helpers/AUTO_API'
export interface VideoProps {
  /** 视频链接 */
  src: string
  /** 视频宽度 */
  width?: number
  /** 封面图链接 */
  poster?: string
  /** 是否自动播放 */
  autoPlay?: boolean
  /** 是否展示进度条 */
  isShowProgress?: boolean
  /** 是否禁止进度条拖拽 */
  isDisableProgressDrag?: boolean
  /** 视频播放状态改变的回调 */
  onPlayingStateChange?: (v: boolean) => void
  /** 工具栏可见性改变回调 */
  onShowToolChange?: (v: boolean) => void
}

export type VideoRef = any

export const DEFAULT_WIDTH: string = '100%'

export const VIDEO_COMPONENT_WRAP = 'video-component'

export default AUTO_API<VideoProps>()
