import React, { useState } from 'react'
import { LineTimePicker, BlockTimePicker, CellTimePicker, Button, Space, DemoBlock } from '@fexd/mobile'

type ThemeType = 'Block' | 'Line' | 'Cell'

export default () => {
  const [value, setValue] = React.useState<any>()

  const [themeType, setThemeType] = useState<ThemeType>('Block')

  const themeMap: Record<ThemeType, typeof LineTimePicker> = {
    Line: LineTimePicker,
    Block: BlockTimePicker,
    Cell: CellTimePicker,
  }

  const ThemedTimePicker = themeMap[themeType]

  return (
    <div className="gap-4">
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
          <Button type="primary" fill={themeType === 'Cell' ? 'solid' : 'outline'} onClick={() => setThemeType('Cell')}>
            Cell
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title={`${themeType} 基础`}>
        <ThemedTimePicker placeholder="基础用法" value={value} onChange={setValue} />
        <ThemedTimePicker placeholder="受控状态，上边那个也是受控的" value={value} onChange={setValue} />
      </DemoBlock>

      <DemoBlock title={`${themeType} 状态一览`}>
        <ThemedTimePicker
          label="错误状态，聚焦试试"
          placeholder="聚焦时会暂时去掉错误状态"
          error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
          helper="辅助文本"
        />
        <ThemedTimePicker hideErrorWhenFocusing={false} placeholder="聚焦时不解除错误状态" error="XXX有点问题哦" />
        <ThemedTimePicker placeholder={'警告状态'} labelType="warn" helper="辅助文本" />
        <ThemedTimePicker placeholder={'成功状态'} labelType="success" helper="辅助文本" />
        <ThemedTimePicker disabled label={'禁用状态'} helper="禁用了，点也点不着" />
      </DemoBlock>

      <DemoBlock title={`${themeType} 各部分、多个排列`}>
        <ThemedTimePicker
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
        />
        <ThemedTimePicker
          label="label-2"
          placeholder="placeholder-2"
          prefix="prefix-2"
          helper="helper-2"
          suffix="suffix-2"
          error="error-2"
        />
      </DemoBlock>
    </div>
  )
}
