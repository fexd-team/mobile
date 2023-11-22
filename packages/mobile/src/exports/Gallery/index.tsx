import React from 'react'
import createFC from '../../helpers/createFC'
import { GalleryProps, GalleryRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-gallery'
const Gallery = createFC<GalleryProps, GalleryRef>(function Gallery(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Gallery
    </div>
  )
})

Gallery.defaultProps = {}

export default Gallery
