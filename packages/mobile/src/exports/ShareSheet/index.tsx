import React from 'react'
import createFC from '../../helpers/createFC'
import { ShareSheetProps, ShareSheetRef, ShareSheetType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-share-sheet'
const ShareSheet = createFC<ShareSheetProps, ShareSheetRef>(function ShareSheet(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      ShareSheet
    </div>
  )
}) as ShareSheetType

ShareSheet.defaultProps = {}

export default ShareSheet
