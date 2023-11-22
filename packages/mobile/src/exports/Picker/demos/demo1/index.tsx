import React from 'react'
import { MemoryRouter, Route, useHistory, Redirect } from 'react-router-dom'
import DemoBlock from '@documents/components/DemoBlock'
import { TabBarLayout, AnimatedSwitch } from '@fexd/mobile-router5'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import { MaterialPicker, Picker, Button, PickerView, ScrollView, showPopup, toast } from '@fexd/mobile'

import './style.module.less'

const showPicker = async ({ options }: any) => {
  let value
  let tempValue: any

  const { close, promise } = showPopup({
    title: ' ',
    headerRight: (
      <CheckmarkOutline
        onClick={() => {
          value = tempValue
          close()
        }}
      />
    ),
    headerLeft: <CloseOutline onClick={() => close()} />,
    content: (
      <PickerView
        options={options}
        onChange={(selectedValue) => {
          tempValue = selectedValue
        }}
      />
    ),
  })

  await promise

  return value
}

const MateriaPickerlDemo = () => {
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

  return (
    <ScrollView shadow>
      <DemoBlock title="基础">
        <MaterialPicker options={options} placeholder="基础用法" value={value} onChange={(value) => setValue(value)} />
        <MaterialPicker
          options={options}
          placeholder="受控状态，上边那个也是受控的"
          value={value}
          onChange={(value) => setValue(value)}
        />
      </DemoBlock>

      <DemoBlock title="错误状态">
        <MaterialPicker options={options} placeholder="设置了 error 属性" error="有点问题哦" helper="辅助文本" />
      </DemoBlock>

      <DemoBlock title="不可清除">
        <MaterialPicker options={options} placeholder="不可清除的" clearable={false} />
      </DemoBlock>

      <DemoBlock title="各部分、多个排列">
        <MaterialPicker
          options={options}
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
          onChange={console.log}
        />
        <MaterialPicker
          options={options}
          label="label-2"
          placeholder="placeholder-2"
          prefix="prefix-2"
          helper="helper-2"
          suffix="suffix-2"
          error="error-2"
        />
      </DemoBlock>
    </ScrollView>
  )
}

const PickerViewDemo = () => {
  const data = Array.from(new Array(12)).map((item, index) => ({
    label: `${index + 1}月`,
    value: index + 1,
  }))
  const [value, setValue] = React.useState(3)

  return (
    <ScrollView shadow>
      <DemoBlock title={`受控模式，当前值为：${value}`}>
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

      <DemoBlock title="展示 5 行数">
        <PickerView options={data} rows={5} />
      </DemoBlock>
    </ScrollView>
  )
}

export default () => {
  return (
    <div className="demo">
      {/* @ts-ignore */}
      <MemoryRouter>
        <AnimatedSwitch animate="slide-cover">
          <Route exact path="/">
            <Redirect to="/Picker" />
          </Route>
          {AnimatedSwitch.renderLayout(
            <TabBarLayout>
              <Route
                exact
                path="/Picker"
                // @ts-ignore
                name="默认"
                render={() => (
                  <ScrollView>
                    <DemoBlock title="基础">
                      <Picker
                        options={'0123456789'.split('').map((item) => ({
                          label: `数字${item}`,
                          value: item,
                        }))}
                        onChange={console.log}
                      >
                        {(label) => <Button type="primary">点击我选择你的幸运数字: {label}</Button>}
                      </Picker>

                      <Button
                        onClick={async () => {
                          const value = await showPicker({
                            options: '0123456789'.split('').map((item) => ({
                              label: `数字${item}`,
                              value: item,
                            })),
                          })
                          toast.info(`你选择了：${value}`)
                        }}
                      >
                        命令式（临时实现，mobile 内未提供）
                      </Button>
                    </DemoBlock>
                  </ScrollView>
                )}
              />
              <Route
                exact
                path="/MaretialPicker"
                // @ts-ignore
                name="Maretial"
                render={() => <MateriaPickerlDemo />}
              />
              <Route
                exact
                path="/PickerView"
                // @ts-ignore
                name="滚动域"
                render={() => <PickerViewDemo />}
              />
            </TabBarLayout>,
          )}
        </AnimatedSwitch>
      </MemoryRouter>
    </div>
  )
}
