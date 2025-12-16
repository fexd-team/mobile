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

/**
 * Space 样式变量
 */
export interface SpaceStyleVars {
  /**
   * @description 全局尺寸缩放比例
   * @default 1
   */
  '@size-scale'?: string | number
}

export const DOC_SpaceStyleVars = AUTO_API<SpaceStyleVars>()
