import React, { useState } from 'react'
import { UnstyledIOLabel, LineLabel, BlockLabel, CellLabel, DemoBlock, Button, Space } from '@fexd/mobile'

const IOLabelDemo = ({ theme, themeName }: any) => {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  const active = focused || hasValue

  return (
    <div style={{ marginBottom: 20 }}>
      <UnstyledIOLabel
        theme={theme}
        label="用户名"
        placeholder="请输入用户名"
        active={active}
        focused={focused}
        disabled={disabled}
        error={error}
        helper="这是帮助文本"
        hideErrorWhenFocusing={true}
        prefix={<span style={{ color: '#999' }}>👤</span>}
        suffix={<span style={{ color: '#999' }}>→</span>}
      >
        <div style={{ padding: '8px 0', color: hasValue ? '#333' : '#999' }}>{hasValue ? '已输入内容' : ''}</div>
      </UnstyledIOLabel>

      <Space style={{ marginTop: 10 }}>
        <Button size="small" type={focused ? 'primary' : 'default'} onClick={() => setFocused(!focused)}>
          {focused ? '聚焦中' : '未聚焦'}
        </Button>
        <Button size="small" type={hasValue ? 'primary' : 'default'} onClick={() => setHasValue(!hasValue)}>
          {hasValue ? '有值' : '无值'}
        </Button>
        <Button size="small" type={disabled ? 'warn' : 'default'} onClick={() => setDisabled(!disabled)}>
          {disabled ? '已禁用' : '未禁用'}
        </Button>
        <Button size="small" type={error ? 'danger' : 'default'} onClick={() => setError(error ? '' : '格式错误')}>
          {error ? '有错误' : '无错误'}
        </Button>
      </Space>
    </div>
  )
}

export default () => (
  <>
    <DemoBlock title="第 2 层：IOLabel 层 - 状态管理">
      <IOLabelDemo theme={LineLabel} themeName="Line" />
      <IOLabelDemo theme={BlockLabel} themeName="Block" />
      <IOLabelDemo theme={CellLabel} themeName="Cell" />
    </DemoBlock>
  </>
)
