import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { UnstyledLabelProps } from '../UnstyledLabel/type'

export interface LineLabelProps extends UnstyledLabelProps {}

export default AUTO_API<LineLabelProps>()

/**
 * LineLabel 样式变量
 */
export interface LineLabelStyleVars {
  /**
   * @description 包裹容器上下内边距
   * @default 6px
   */
  '@line-label-wrapper-padding-y'?: string
  /**
   * @description 标签栏顶部内边距
   * @default 24px
   */
  '@line-label-bar-padding-top'?: string
  /**
   * @description 标签栏底部内边距
   * @default 8px
   */
  '@line-label-bar-padding-bottom'?: string
  /**
   * @description 标签栏下边距
   * @default 4px
   */
  '@line-label-bar-margin-bottom'?: string
  /**
   * @description 标签栏边框颜色
   * @default ant-color-gray-5
   */
  '@line-label-bar-border-color'?: string
  /**
   * @description 内容高度
   * @default 24px
   */
  '@line-label-content-height'?: string
  /**
   * @description 内容文字大小
   * @default 14px
   */
  '@line-label-content-font-size'?: string
  /**
   * @description 内容文字颜色
   * @default ant-color-gray-10
   */
  '@line-label-content-color'?: string
  /**
   * @description 标签高度
   * @default 24px
   */
  '@line-label-label-height'?: string
  /**
   * @description 标签文字大小
   * @default 14px
   */
  '@line-label-label-font-size'?: string
  /**
   * @description 激活态标签文字大小
   * @default 12px
   */
  '@line-label-label-font-size-active'?: string
  /**
   * @description 标签文字颜色
   * @default ant-color-gray-8
   */
  '@line-label-label-color'?: string
  /**
   * @description 标签底部偏移
   * @default 8px
   */
  '@line-label-label-bottom'?: string
  /**
   * @description 占位符文字颜色
   * @default ant-color-gray-6
   */
  '@line-label-placeholder-color'?: string
  /**
   * @description 辅助文字大小
   * @default 12px
   */
  '@line-label-helper-font-size'?: string
  /**
   * @description 辅助文字最小高度
   * @default 18px
   */
  '@line-label-helper-min-height'?: string
  /**
   * @description 前缀元素右内边距
   * @default 6px
   */
  '@line-label-prefix-padding-right'?: string
  /**
   * @description 后缀元素高度
   * @default 24px
   */
  '@line-label-suffix-height'?: string
  /**
   * @description 光标颜色
   * @default color-primary
   */
  '@line-label-caret-color'?: string
  /**
   * @description 信息态边框颜色
   * @default ant-color-gray-4
   */
  '@line-label-info-border-color'?: string
  /**
   * @description 信息态辅助文字颜色
   * @default ant-color-gray-7
   */
  '@line-label-info-helper-color'?: string
  /**
   * @description 成功态边框颜色
   * @default color-green
   */
  '@line-label-success-border-color'?: string
  /**
   * @description 成功态辅助文字颜色
   * @default color-green
   */
  '@line-label-success-helper-color'?: string
  /**
   * @description 警告态边框颜色
   * @default color-orange
   */
  '@line-label-warn-border-color'?: string
  /**
   * @description 警告态辅助文字颜色
   * @default color-orange
   */
  '@line-label-warn-helper-color'?: string
  /**
   * @description 错误态边框颜色
   * @default color-red
   */
  '@line-label-error-border-color'?: string
  /**
   * @description 错误态辅助文字颜色
   * @default color-red
   */
  '@line-label-error-helper-color'?: string
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-5
   */
  '@line-label-disabled-color'?: string
}

export const DOC_LineLabelStyleVars = AUTO_API<LineLabelStyleVars>()
