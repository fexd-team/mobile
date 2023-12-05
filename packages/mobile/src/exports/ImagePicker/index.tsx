import React from 'react'
import createFC from '../createFC'
import { ImagePickerProps, ImagePickerRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-image-picker'
const ImagePicker = createFC<ImagePickerProps, ImagePickerRef>(function ImagePicker(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      ImagePicker
    </div>
  )
})

ImagePicker.defaultProps = {}

export default ImagePicker
