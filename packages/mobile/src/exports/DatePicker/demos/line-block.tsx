import React, { useState } from 'react'
import { LineDatePicker, BlockDatePicker, Button, Space, DemoBlock, Hook } from '@fexd/mobile'

export default () => {
  const [themeType, setThemeType] = useState<'Block' | 'Line'>('Block')

  const ThemedDatePicker = {
    Line: LineDatePicker,
    Block: BlockDatePicker,
  }[themeType] as typeof LineDatePicker

  return (
    <>
      <DemoBlock title="切换样式类型">
        <Space>
          <Button
            type="primary"
            fill={themeType === 'Block' ? 'solid' : 'outline'}
            onClick={() => setThemeType('Block')}
          >
            Block
          </Button>
          <Button type="primary" fill={themeType === 'Line' ? 'solid' : 'outline'} onClick={() => setThemeType('Line')}>
            Line
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title={`${themeType} 基础`}>
        <Hook>
          {() => {
            const [value, setValue] = useState()
            return (
              <>
                <ThemedDatePicker placeholder="基础用法" value={value} onChange={(value: any) => setValue(value)} />
                <ThemedDatePicker
                  placeholder="受控状态，与上方同步"
                  value={value}
                  onChange={(value: any) => setValue(value)}
                />
              </>
            )
          }}
        </Hook>
      </DemoBlock>

      <DemoBlock title={`${themeType} 状态一览`}>
        <ThemedDatePicker
          label="错误状态"
          placeholder="聚焦时会暂时去掉错误状态"
          error="这里有错误提示"
          helper="辅助文本"
        />
        <ThemedDatePicker hideErrorWhenFocusing={false} placeholder="聚焦时不解除错误状态" error="错误提示" />
        <ThemedDatePicker placeholder="警告状态" labelType="warn" helper="辅助文本" />
        <ThemedDatePicker placeholder="成功状态" labelType="success" helper="辅助文本" />
        <ThemedDatePicker disabled label="禁用状态" helper="禁用了，点不了" />
      </DemoBlock>

      <DemoBlock title={`${themeType} 各部分展示`}>
        <ThemedDatePicker label="标签" placeholder="占位文本" prefix="前缀" helper="辅助文本" suffix="后缀" />
      </DemoBlock>
    </>
  )
}
