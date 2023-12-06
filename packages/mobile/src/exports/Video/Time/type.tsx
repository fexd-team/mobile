import AUTO_API from '../../../helpers/AUTO_API'
export interface TimeProps {
  videoWrapRef: any
}

export enum ChangType {
  Curr = 1,
  Total = 2,
}

export default AUTO_API<TimeProps>()
