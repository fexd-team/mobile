import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export interface OverlayProps {}
export type OverlayRef = any
export interface OverlayType extends FC<OverlayProps> {}

/**
 * Overlay 样式变量
 */
export interface OverlayStyleVars {
  /**
   * @description 组件样式前缀
   * @default ~'exd-overlay'
   */
  '@overlay-prefix'?: string
  /**
   * @description 遮罩背景色
   * @default rgba(0, 0, 0, 0.5)
   */
  '@overlay-background'?: string
}

export const DOC_OverlayStyleVars = AUTO_API<OverlayStyleVars>()

export default AUTO_API<OverlayProps>()
