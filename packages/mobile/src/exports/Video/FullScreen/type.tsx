import AUTO_API from '../../../helpers/AUTO_API'
export interface FullScreenProps {
  videoWrapRef?: any
  onChangIsFull?: (v: boolean) => void
}

export default AUTO_API<FullScreenProps>()
