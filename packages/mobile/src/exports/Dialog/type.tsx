import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps, PureModalProps } from '../Modal/type'
import { BasicButtonProps, PureBasicButtonProps } from '../BasicButton/type'

export interface PureDialogAction extends Omit<PureBasicButtonProps, 'children' | 'onClick'> {
  /** 按钮内容 */
  content: React.ReactNode | (() => React.ReactNode)
  /** 点击事件 */
  onClick?: () => void
}
export interface DialogAction extends Omit<BasicButtonProps, 'onClick'> {}
export interface DialogAction extends PureDialogAction {}

export type DialogTheme = 'normal' | 'iOS' | 'Android'

export interface PureDialogProps extends Omit<PureModalProps, 'placement' | 'transition' | 'type'> {
  /** 标题 */
  title?: string

  /**
   * @description 主题风格，有三种：'normal' | 'iOS' | 'Android'
   * @default 'normal'
   */
  theme?: DialogTheme

  /** 动作集 */
  actions?: DialogAction[]

  /** 前缀，显示在内容 box 的下方 */
  prefix?: React.ReactNode

  /** 后缀，显示在内容 box 的下方 */
  suffix?: React.ReactNode

  /**
   * @description 按钮的构造函数
   * @default BasicButton
   */
  buttonFactory?: React.FC<BasicButtonProps>

  /**
   * @description 按钮的类型
   * @default (theme, idx) => (idx === 0 ? 'primary' : 'plain')
   */
  buttonType?: BasicButtonProps['type'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['type'])
  /**
   * @description 按钮的大小
   * @default
   */
  buttonSize?: BasicButtonProps['size'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['size'])
  /**
   * @description 按钮的填充
   * @default (theme) => (theme === 'normal' ? 'solid' : 'none')
   */
  buttonFill?: BasicButtonProps['fill'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['fill'])
  /**
   * @description 按钮的形状
   * @default (theme) => (theme === 'normal' ? 'square' : 'unset')
   */
  buttonShape?: BasicButtonProps['shape'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['shape'])
}

export interface DialogProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {}
export interface DialogProps extends PureDialogProps {}

export default AUTO_API<PureDialogProps>()
export const DOC_PureDialogAction = AUTO_API<PureDialogAction>()

export interface DialogStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-dialog'
   */
  '@dialog-prefix'?: string
  /**
   * @description 对话框背景颜色
   * @default #fff
   */
  '@dialog-background'?: string
  /**
   * @description 对话框圆角大小
   * @default 6px
   */
  '@dialog-border-radius'?: string
  /**
   * @description 对话框最小宽度
   * @default 68%
   */
  '@dialog-min-width'?: string
  /**
   * @description 对话框最大宽度
   * @default 88%
   */
  '@dialog-max-width'?: string
  /**
   * @description 对话框最大高度
   * @default 90%
   */
  '@dialog-max-height'?: string
  /**
   * @description 对话框内边距
   * @default 24px
   */
  '@dialog-padding'?: string
  /**
   * @description 标题字体大小
   * @default 18px
   */
  '@dialog-title-font-size'?: string
  /**
   * @description 标题文字颜色
   * @default #333
   */
  '@dialog-title-color'?: string
  /**
   * @description 标题下边距
   * @default 16px
   */
  '@dialog-title-margin-bottom'?: string
  /**
   * @description 内容字体大小
   * @default 14px
   */
  '@dialog-content-font-size'?: string
  /**
   * @description 内容文字颜色
   * @default #666
   */
  '@dialog-content-color'?: string
  /**
   * @description 操作按钮区域最小高度
   * @default 50px
   */
  '@dialog-action-min-height'?: string
  /**
   * @description 操作按钮内容最大宽度
   * @default 160px
   */
  '@dialog-action-content-max-width'?: string
  /**
   * @description Normal 样式内容区底部内边距
   * @default 8px
   */
  '@dialog-normal-wrapper-padding-bottom'?: string
  /**
   * @description Normal 样式操作区左右内边距
   * @default 20px
   */
  '@dialog-normal-actions-padding-x'?: string
  /**
   * @description Normal 样式操作区顶部内边距
   * @default 16px
   */
  '@dialog-normal-actions-padding-y'?: string
  /**
   * @description Normal 样式操作区底部内边距
   * @default 20px
   */
  '@dialog-normal-actions-padding-bottom'?: string
  /**
   * @description Normal 样式按钮纵向间距
   * @default 8px
   */
  '@dialog-normal-actions-button-spacing'?: string
  /**
   * @description Normal 样式按钮横向间距
   * @default 12px
   */
  '@dialog-normal-actions-button-spacing-horizontal'?: string
  /**
   * @description Android 样式内容区底部内边距
   * @default 12px
   */
  '@dialog-android-wrapper-padding-bottom'?: string
  /**
   * @description Android 样式操作区左右内边距
   * @default 12px
   */
  '@dialog-android-actions-padding-x'?: string
  /**
   * @description Android 样式操作区顶部内边距
   * @default 12px
   */
  '@dialog-android-actions-padding-y'?: string
  /**
   * @description Android 样式操作区底部内边距
   * @default 16px
   */
  '@dialog-android-actions-padding-bottom'?: string
  /**
   * @description iOS 样式操作按钮边框宽度
   * @default 1px
   */
  '@dialog-ios-action-border-width'?: string
}

export const DOC_DialogStyleVars = AUTO_API<DialogStyleVars>()
