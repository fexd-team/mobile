import React, { useState, useRef, useEffect, useLayoutEffect, useImperativeHandle } from 'react'
import createFC from '../createFC'
import { ImageProps, ImageRef } from './type'
import { mergeProps, findScrollParent } from './utils'
import { classnames, throttle } from '@fexd/tools'

export const prefix = 'exd-image'

// 默认props
const defaultProps = {
  lazy: false,
  alt: null,
  style: null,
  className: null,
  width: '100%',
}

const Image = createFC<ImageProps, ImageRef>(function Image(props, ref) {
  const mergedProps = mergeProps(props, defaultProps)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const setImageSrc = (src: string) => {
    if (!imgRef.current) return
    imgRef.current.src = src
  }

  const lazyLoad = () => {
    let inited = false
    return () => {
      if (inited) return
      const { top } = (imgRef.current as HTMLImageElement).getBoundingClientRect()
      const viewHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (top < viewHeight) {
        setImageSrc(mergedProps.src)
        inited = true
      }
    }
  }
  useLayoutEffect(() => {
    if (!imgRef.current || !mergedProps.src) return

    // 正常image
    if (!mergedProps.lazy) {
      setImageSrc(mergedProps.src)
    }

    // 懒加载image
    if (mergedProps.lazy) {
      const lazyLoadFn = lazyLoad()
      const handleScroll = throttle(() => lazyLoadFn(), 60)
      const scrollParent = findScrollParent(imgRef.current)
      scrollParent.addEventListener('scroll', handleScroll)
      return () => {
        scrollParent.removeEventListener('scroll', handleScroll)
      }
    }
  }, [imgRef.current, mergedProps.src, mergedProps.lazy])

  // 按比例计算图片尺寸大小
  useEffect(() => {
    const { proportion } = mergedProps
    if (loaded && imgRef.current && proportion && /^\d+\:\d+$/.test(proportion)) {
      const clientWidth = imgRef.current.clientWidth
      if (/^\d+\:\d+$/.test(proportion)) {
        const [w, h] = proportion.split(':')
        const heightPercentage = parseFloat(h) / parseFloat(w)
        imgRef.current.style.height = `${clientWidth * heightPercentage}px`
      }
    }
  }, [loaded, imgRef.current && mergedProps.width, mergedProps.proportion])

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [mergedProps.src])

  useImperativeHandle(ref, () => imgRef)

  // 缺省图，需要加载icon和失败icon
  const fallback = mergedProps.fallback || <div>加载失败</div>
  const placeholder = mergedProps.placeholder || <div>加载中</div>

  if (failed) {
    return <>{fallback}</>
  }

  const style = {
    ...mergedProps.style,
    width: mergedProps.width,
    height: mergedProps.height,
    display: loaded ? 'block' : 'none',
  }

  return (
    <>
      {!loaded && mergedProps.lazy ? placeholder : null}
      <img
        style={style}
        ref={imgRef}
        alt={mergedProps.alt}
        className={classnames(prefix, mergedProps.className)}
        onClick={props.onClick}
        onLoad={(e) => {
          setLoaded(true)
          mergedProps.onLoad?.(e)
        }}
        onError={(e) => {
          setFailed(true)
          mergedProps.onError?.(e)
        }}
      />
    </>
  )
})

export default Image
