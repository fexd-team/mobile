import React, { useState } from 'react'
import { UnstyledIOInput, LineLabel, BlockLabel, CellLabel, DemoBlock, Button, Space } from '@fexd/mobile'

export default () => {
  const [value, setValue] = useState('')
  const [theme, setTheme] = useState<any>(LineLabel)
  const [themeName, setThemeName] = useState('LineLabel')

  const themes = [
    { name: 'LineLabel', component: LineLabel },
    { name: 'BlockLabel', component: BlockLabel },
    { name: 'CellLabel', component: CellLabel },
  ]

  const switchTheme = (name: string, component: any) => {
    setTheme(component)
    setThemeName(name)
  }

  return (
    <>
      <DemoBlock title="主题切换演示 - 同一个 Unstyled 组件动态切换主题">
        <div style={{ marginBottom: 12 }}>
          <Space>
            {themes.map(({ name, component }) => (
              <Button
                key={name}
                size="small"
                // @ts-ignore
                type={themeName === name ? 'primary' : 'default'}
                onClick={() => switchTheme(name, component)}
              >
                {name}
              </Button>
            ))}
          </Space>
        </div>

        <UnstyledIOInput
          theme={theme}
          label="用户名"
          placeholder="请输入用户名"
          value={value}
          onChange={setValue}
          helper={`当前主题: ${themeName}`}
          clearable
          classNamePrefix={`exd-${themeName.toLowerCase().replace('label', 'input')}`}
        />

        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: '#f5f5f5',
            borderRadius: 4,
            fontSize: 12,
            color: '#666',
          }}
        >
          💡 提示：点击上方按钮切换主题，输入框的视觉样式会实时改变，但功能逻辑保持不变
        </div>
      </DemoBlock>
    </>
  )
}
