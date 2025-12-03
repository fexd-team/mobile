import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps, PureModalProps } from '../Modal/type'

export interface PureLoadingProps extends Omit<PureModalProps, 'transition' | 'type'> {}
export interface LoadingProps extends Omit<ModalProps, 'transition' | 'type'> {}
export interface LoadingProps extends PureLoadingProps {}

export interface PureLoadingMethodConfig extends Omit<PureLoadingProps, 'visible' | 'children'> {
  content?: React.ReactNode
}
export interface LoadingMethodConfig extends PureLoadingMethodConfig {}
export interface LoadingMethodConfig extends Omit<LoadingProps, 'visible' | 'children'> {
  content?: React.ReactNode
}

export default AUTO_API<PureLoadingProps>()
export const DOC_PureLoadingMethodConfig = AUTO_API<PureLoadingMethodConfig>()

export interface LoadingStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-loading'
   */
  '@loading-prefix'?: string
  /**
   * @description Loading 内容区域内边距
   * @default 18px
   */
  '@loading-content-padding'?: string
  /**
   * @description Loading 内容区域背景色
   * @default rgba(0, 0, 0, 0.8)
   */
  '@loading-content-background'?: string
  /**
   * @description Loading 内容区域圆角大小
   * @default 4px
   */
  '@loading-content-border-radius'?: string
  /**
   * @description Loading 内容区域文字颜色
   * @default #fff
   */
  '@loading-content-color'?: string
  /**
   * @description Loading Spinner 尺寸
   * @default 40px
   */
  '@loading-spinner-size'?: string
  /**
   * @description Loading 文字上边距
   * @default 8px
   */
  '@loading-text-margin-top'?: string
}

export const DOC_LoadingStyleVars = AUTO_API<LoadingStyleVars>()
