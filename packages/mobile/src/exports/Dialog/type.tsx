import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps } from '../Modal/type'
import { BasicButtonProps } from '../BasicButton/type'

export interface DialogAction extends BasicButtonProps {
  content: React.ReactNode | (() => React.ReactNode)
  onClick?: () => void
}

export type DialogTheme = 'normal' | 'iOS' | 'Android'

export interface DialogProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {
  /** 标题 */
  title?: string

  /** 风格，有三种：'normal' | 'iOS' | 'Android' */
  theme?: DialogTheme

  /** 动作集 */
  actions?: DialogAction[]

  /** 前缀，显示在内容 box 的下方 */
  prefix?: React.ReactNode

  /** 后缀，显示在内容 box 的下方 */
  suffix?: React.ReactNode

  /** 按钮的组件类型，默认是 mobile 的 Button */
  buttonFactory?: React.FC<BasicButtonProps>

  buttonType?: BasicButtonProps['type'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['type'])
  buttonSize?: BasicButtonProps['size'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['size'])
  buttonFill?: BasicButtonProps['fill'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['fill'])
  buttonShape?: BasicButtonProps['shape'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['shape'])
}

export default AUTO_API<DialogProps>()
