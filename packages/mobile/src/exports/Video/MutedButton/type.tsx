import AUTO_API from '../../../helpers/AUTO_API'
export interface MutedButtonProps {
  isMuted: boolean
  isShowTool: boolean
  autoPlay?: boolean
  onChangeMuted: (v: boolean) => void
}

export default AUTO_API<MutedButtonProps>()
