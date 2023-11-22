import React from 'react'
import { Button } from '@fexd/mobile'
import { PlusOutlined, MinusOutlined } from '@fexd/icons-antd'
import { run } from '@fexd/tools'
import './style.module.less'

export interface ControlPanelProps {
  title?: any
  children?: any
  onMinus?: () => void
  onPlus?: () => void
}

export default function ControlPanel({
  title = '控制盘',
  children,
  onMinus = () => {},
  onPlus = () => {},
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="title">{title}</div>
      <div className="content">
        <Button icon={<MinusOutlined />} size="small" onClick={() => run(onMinus)} />
        <span>{run(children)}</span>
        <Button icon={<PlusOutlined />} size="small" onClick={() => run(onPlus)} />
      </div>
    </div>
  )
}
