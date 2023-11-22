import React, { useState } from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Tabs, Iconfont } from '@fexd/mobile'
// import { ValueType } from '@fexd/mobile/es/exports/Tabs/type'

type ValueType = string | number

// 选项卡的数据
const tabsData = [
  {
    label: 'First option',
    value: 'first',
  },
  {
    label: 'Second option',
    value: 'second',
  },
]
const tabsData1 = Array.from(new Array(30)).map((item, index) => ({
  label: `option${index + 1}`,
  value: index + 1,
}))
const tabsData2 = [
  {
    label: 'option 1',
    value: 1,
  },
  {
    label: 'option 2222222',
    value: 2,
  },
  {
    label: 'option 33',
    value: 3,
  },
  {
    label: 'option 44444',
    value: 4,
  },
]
const tabsData3 = tabsData.map((item) => ({
  ...item,
  disabled: true,
}))
const tabsData4 = tabsData2.map((item) => ({
  ...item,
  icon: <Iconfont type="good" />,
}))
const tabsData5 = [
  {
    label: 'very very very very very very very long',
    value: 1,
  },
  {
    label: 'short',
    value: 2,
  },
]

export default function Test() {
  const [currentTab, setCurrentTab] = useState<ValueType>('first')
  const [currentTab1, setCurrentTab1] = useState<ValueType>(1)

  return (
    <>
      <DemoBlock plain title="示例：三个或以下，每个选项均分宽度； 三个以上，可横向滚动；">
        <Tabs data={tabsData} defaultValue="first" />
        <Tabs data={tabsData1} defaultValue={1} />
        <Tabs data={tabsData2} defaultValue={1} />
      </DemoBlock>

      <DemoBlock plain title={`示例：display="scroll"、display="flex"`}>
        <Tabs data={tabsData} defaultValue="first" display="scroll" />
        <Tabs data={tabsData2} defaultValue={1} display="flex" />
      </DemoBlock>

      <DemoBlock plain title="示例：受控模式">
        <Tabs data={tabsData} value={currentTab} onChange={setCurrentTab} />
        <Tabs data={tabsData} value={currentTab} onChange={setCurrentTab} />
      </DemoBlock>

      <DemoBlock plain title="示例：disabled 禁用">
        <Tabs data={tabsData3} defaultValue="first" />
      </DemoBlock>

      <DemoBlock plain title="示例：有图标">
        <Tabs data={tabsData4} defaultValue={1} />
      </DemoBlock>

      <DemoBlock plain title="示例：label 过长省略号显示">
        <Tabs ellipsis={true} data={tabsData5} value={currentTab1} onChange={setCurrentTab1} />
        <Tabs data={tabsData5} value={currentTab1} onChange={setCurrentTab1} />
      </DemoBlock>
    </>
  )
}
