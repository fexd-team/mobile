import React from 'react'
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export interface ImageProps
  extends Overwrite<React.ImgHTMLAttributes<HTMLImageElement>, { placeholder?: React.ReactNode }> {
  lazy?: boolean // 是否懒加载
  src: string // 链接图片
  alt?: string // 图片描述
  width?: number | string
  height?: number | string
  fallback?: React.ReactNode // 加载失败时的占位
  placeholder?: React.ReactNode // 加载中的占位
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  style?: React.CSSProperties
  className?: string
  proportion?: string // 比例
}

export type ImageRef = React.RefObject<HTMLImageElement>
