import React, { useState } from 'react'
import { MemoryRouter, Route, useHistory, Redirect } from 'react-router-dom'

import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import {
  LinePicker,
  BlockPicker,
  Picker,
  Button,
  PickerView,
  BlockLabel,
  LineLabel,
  ScrollView,
  showPopup,
  toast,
  showPicker,
  Hook,
  Space,
  DemoBlock,
} from '@fexd/mobile'

import './style.module.less'

export default () => {
  const data = Array.from(new Array(12)).map((item, index) => ({
    label: `${index + 1}月`,
    value: index + 1,
  }))
  const [value, setValue] = React.useState(3)

  return (
    <ScrollView className="gap-4">
      <DemoBlock title="基础">
        <Picker
          defaultValue={'6'}
          options={Array(1000)
            .fill('')
            .map((item, idx) => ({
              label: `数字${idx}`,
              value: String(idx),
            }))}
          onChange={console.log}
        >
          {(label) => <Button type="primary">点击我选择你的幸运数字: {label}</Button>}
        </Picker>

        <Button
          onClick={async () => {
            const value = await showPicker({
              defaultValue: '6',
              options: '0123456789'.split('').map((item) => ({
                label: `数字${item}`,
                value: item,
              })),
            })
            toast.info(`你选择了：${value}`)
          }}
        >
          命令式 showPicker
        </Button>
      </DemoBlock>

      <Hook>
        {() => {
          const [value, setValue] = React.useState<any>()

          const options = [
            {
              label:
                '数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1',
              value: 1,
              disabled: false,
            },
            {
              label: '数据2',
              value: 2,
              disabled: false,
            },
            {
              label: '数据3',
              value: 3,
            },
          ]

          const [themeType, setThemeType] = useState('Block')

          const ThemedPicker = {
            Line: LinePicker,
            Block: BlockPicker,
          }[themeType] as typeof LinePicker

          return (
            <div className="gap-4">
              <DemoBlock title={`切换样式类型`}>
                <Space>
                  <Button
                    type="primary"
                    fill={themeType === 'Block' ? 'solid' : 'outline'}
                    onClick={() => setThemeType('Block')}
                  >
                    Block
                  </Button>
                  <Button
                    type="primary"
                    fill={themeType === 'Line' ? 'solid' : 'outline'}
                    onClick={() => setThemeType('Line')}
                  >
                    Line
                  </Button>
                </Space>
              </DemoBlock>

              <DemoBlock title={`${themeType} 基础`}>
                <ThemedPicker
                  options={options}
                  placeholder="基础用法"
                  value={value}
                  onChange={(value) => setValue(value)}
                />
                <ThemedPicker
                  options={options}
                  placeholder="受控状态，上边那个也是受控的"
                  value={value}
                  onChange={(value) => setValue(value)}
                />
              </DemoBlock>

              <DemoBlock title={`${themeType} 状态一览`}>
                <ThemedPicker
                  options={options}
                  label="错误状态，聚焦试试"
                  placeholder="聚焦时会暂时去掉错误状态"
                  error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
                  helper="辅助文本"
                />
                <ThemedPicker
                  options={options}
                  hideErrorWhenFocusing={false}
                  placeholder="聚焦时不解除错误状态"
                  error="XXX有点问题哦"
                />
                <ThemedPicker options={options} placeholder={'警告状态'} labelType="warn" helper="辅助文本" />
                <ThemedPicker options={options} placeholder={'成功状态'} labelType="success" helper="辅助文本" />
                <ThemedPicker disabled label={'禁用状态'} helper="禁用了，点也点不着" />
              </DemoBlock>

              <DemoBlock title={`${themeType} 不可清除`}>
                <ThemedPicker options={options} placeholder="不可清除的" clearable={false} />
              </DemoBlock>

              <DemoBlock title={`${themeType} 各部分、多个排列`}>
                <ThemedPicker
                  options={options}
                  label="label-1"
                  placeholder="placeholder-1"
                  prefix="prefix-1"
                  helper="helper-1"
                  suffix="suffix-1"
                  error="error-1"
                  onChange={console.log}
                />
                <ThemedPicker
                  options={options}
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
        }}
      </Hook>

      <DemoBlock title={`PickerView - 受控模式，当前值为：${value}`}>
        <PickerView
          options={data}
          value={value}
          onChange={(value) => {
            setValue(value as number)
          }}
          rows={3}
        />
        <PickerView
          options={data}
          value={value}
          onChange={(value) => {
            setValue(value as number)
          }}
          rows={3}
        />
      </DemoBlock>

      <DemoBlock title="PickerView - 展示 5 行数">
        <PickerView options={data} rows={5} />
      </DemoBlock>
    </ScrollView>
  )
}
