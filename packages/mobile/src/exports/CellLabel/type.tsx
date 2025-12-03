import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { UnstyledLabelProps } from '../UnstyledLabel/type'

export interface CellLabelProps extends UnstyledLabelProps {}

export default AUTO_API<CellLabelProps>()

/**
 * CellLabel 样式变量
 */
export interface CellLabelStyleVars {
  /**
   * @description 包裹容器上下内边距
   * @default 12px
   */
  '@cell-label-wrapper-padding-y'?: string
  /**
   * @description 包裹容器边框颜色
   * @default @ant-color-gray-4
   */
  '@cell-label-wrapper-border-color'?: string
  /**
   * @description 标签栏左右内边距
   * @default 12px
   */
  '@cell-label-bar-padding-x'?: string
  /**
   * @description 内容高度
   * @default 24px
   */
  '@cell-label-content-height'?: string
  /**
   * @description 内容文字大小
   * @default 14px
   */
  '@cell-label-content-font-size'?: string
  /**
   * @description 内容文字颜色
   * @default @ant-color-gray-10
   */
  '@cell-label-content-color'?: string
  /**
   * @description 内容左内边距
   * @default 4px
   */
  '@cell-label-content-padding-left'?: string
  /**
   * @description 内容右内边距
   * @default 8px
   */
  '@cell-label-content-padding-right'?: string
  /**
   * @description 标签高度
   * @default 24px
   */
  '@cell-label-label-height'?: string
  /**
   * @description 标签文字大小
   * @default 14px
   */
  '@cell-label-label-font-size'?: string
  /**
   * @description 占位符文字颜色
   * @default @ant-color-gray-6
   */
  '@cell-label-placeholder-color'?: string
  /**
   * @description 辅助文字大小
   * @default 12px
   */
  '@cell-label-helper-font-size'?: string
  /**
   * @description 辅助文字最小高度
   * @default 18px
   */
  '@cell-label-helper-min-height'?: string
  /**
   * @description 辅助文字顶部内边距
   * @default 2px
   */
  '@cell-label-helper-padding-top'?: string
  /**
   * @description 辅助文字左右内边距
   * @default 12px
   */
  '@cell-label-helper-padding-x'?: string
  /**
   * @description 前缀元素右内边距
   * @default 4px
   */
  '@cell-label-prefix-padding-right'?: string
  /**
   * @description 光标颜色
   * @default @color-primary
   */
  '@cell-label-caret-color'?: string
  /**
   * @description 信息态边框颜色
   * @default @ant-color-gray-4
   */
  '@cell-label-info-border-color'?: string
  /**
   * @description 信息态辅助文字颜色
   * @default @ant-color-gray-7
   */
  '@cell-label-info-helper-color'?: string
  /**
   * @description 成功态边框颜色
   * @default @color-green
   */
  '@cell-label-success-border-color'?: string
  /**
   * @description 成功态辅助文字颜色
   * @default @color-green
   */
  '@cell-label-success-helper-color'?: string
  /**
   * @description 警告态边框颜色
   * @default @color-orange
   */
  '@cell-label-warn-border-color'?: string
  /**
   * @description 警告态辅助文字颜色
   * @default @color-orange
   */
  '@cell-label-warn-helper-color'?: string
  /**
   * @description 错误态边框颜色
   * @default @color-red
   */
  '@cell-label-error-border-color'?: string
  /**
   * @description 错误态辅助文字颜色
   * @default @color-red
   */
  '@cell-label-error-helper-color'?: string
  /**
   * @description 禁用态文字颜色
   * @default @ant-color-gray-5
   */
  '@cell-label-disabled-color'?: string
}

export const DOC_CellLabelStyleVars = AUTO_API<CellLabelStyleVars>()
