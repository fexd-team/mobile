import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { BasicButtonProps, PureBasicButtonProps } from '../BasicButton/type'

export interface PureButtonProps extends PureBasicButtonProps {
  /** 图标名称或节点 */
  icon?: React.ReactNode

  /**
   * @description 图标位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right'

  /**
   * @description 是否加载中，当设置为 'auto' 时，onClick 如果是返回了 Promise，点击按钮会自动设置为 true，直到 onClick 执行完毕
   * @default 'auto'
   */
  loading?: boolean | 'auto'
}

export interface ButtonProps extends BasicButtonProps {}
export interface ButtonProps extends PureButtonProps {}

export default AUTO_API<ButtonProps>()
