import AUTO_API from '../../helpers/AUTO_API'
export type GapType = number | 'small' | 'middle' | 'large'

export type SpaceGapType = Record<string, number>
export interface SpaceProps {
  children?: any
  align?: 'start' | 'end' | 'center' | 'baseline'
  direction?: 'vertical' | 'horizontal'
  gap?: GapType | [GapType, GapType]
  split?: React.ReactNode
  wrap?: boolean
  className?: string
}

export default AUTO_API<SpaceProps>()
