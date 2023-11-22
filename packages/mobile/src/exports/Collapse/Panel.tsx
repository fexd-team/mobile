import React, { useState, useEffect } from 'react'
import { classnames } from '@fexd/tools'
import { Icon, ChevronForward } from '@fexd/icons'
import createFC from '../../helpers/createFC'
import { CollapsePanelProps } from './type'
import { prefix } from './index'
import PanelContent from './PanelContent'

const CollapsePanel = createFC<CollapsePanelProps>(function CollapsePanel(props, ref) {
  const {
    className,
    id,
    style,
    title,
    headerClass,
    children,
    isActive,
    disabled,
    expandIcon,
    iconRotate,
    panelKey = '',
    onItemClick,
    onClick,
  } = props

  const paneCls = classnames(
    {
      [`${prefix}-panel`]: true,
      // [`${prefix}-panel-active`]: isActive,
      [`${prefix}-panel-disabled`]: disabled,
    },
    className,
  )
  const headerCls = classnames(`${prefix}-panel-header`, {
    headerClass,
  })
  const titleCls = classnames(`${prefix}-panel-title`)
  const iconCls = classnames(`${prefix}-panel-icon`, {
    [`${prefix}-panel-icon-active`]: iconRotate && isActive,
  })

  let icon: any = <Icon type={ChevronForward} />
  if (typeof expandIcon === 'object') {
    icon = expandIcon
  }

  const handleItemClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (disabled) {
      return
    }

    if (typeof onItemClick === 'function') {
      onItemClick(panelKey)
    }
    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  /** header 节点属性 */
  const headerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: headerCls,
    // 'aria-expanded': isActive,
    onClick: handleItemClick,
  }

  return (
    <div className={paneCls} style={style} id={id}>
      <div {...headerProps}>
        <div className={titleCls}>{title}</div>
        <div className={iconCls}>{icon}</div>
      </div>
      <PanelContent isActive={isActive}>{children}</PanelContent>
    </div>
  )
})

CollapsePanel.defaultProps = {
  headerClass: '',
  disabled: false,
  panelKey: '',
  title: '',
}

export default CollapsePanel
