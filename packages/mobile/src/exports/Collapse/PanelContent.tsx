import React, { useState, useEffect, useRef } from 'react'
import { classnames, delay } from '@fexd/tools'
import { CollapsePanelProps } from './type'
import { prefix } from './index'
import createFC from '../../helpers/createFC'

const CollapsePanelContent = createFC<CollapsePanelProps>(function CollapsePanelContent(props, ref) {
  const { children, isActive } = props
  const panelContentRef = useRef<HTMLDivElement>(null)
  const clearTime = useRef<any>()

  useEffect(() => {
    const flag = isActive || false

    const expandSection = (element: any) => {
      const sectionHeight = element.scrollHeight
      element.style.height = sectionHeight + 'px'
      clearTimeout(clearTime.current)
      clearTime.current = setTimeout(() => {
        element.style.height = 'auto'
      }, 400)
    }

    const collapseSection = (element: any) => {
      clearTimeout(clearTime.current)
      if (element.offsetHeight === 0) {
        // 初始化时,实际高度为0，无需执行动画
        return false
      }

      const sectionHeight = element.scrollHeight
      element.style.height = sectionHeight + 'px'

      delay(16).then(() => {
        element.style.height = 0 + 'px'
      })
    }

    const element = panelContentRef.current
    if (flag) {
      expandSection(element)
    } else {
      collapseSection(element)
    }
  }, [isActive])

  const contentCls = classnames(`${prefix}-panel-content`, {})

  return (
    <div className={contentCls} ref={panelContentRef}>
      <div className={`${prefix}-panel-content-box`}>{children}</div>
    </div>
  )
})

CollapsePanelContent.defaultProps = {
  isActive: false,
}

export default CollapsePanelContent
