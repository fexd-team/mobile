import React, { useState } from 'react'
import { MemoryRouter, Route, Redirect } from 'react-router-dom'
import dayjs from 'dayjs'
import DemoBlock from '@documents/components/DemoBlock'
import { TabBarLayout, AnimatedSwitch } from '@fexd/mobile-router5'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import { MaterialTimePicker, TimePicker, Button, TimePickerView, ScrollView, showPopup, toast } from '@fexd/mobile'

import './style.module.less'

const showTimePicker = async () => {
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
      <TimePickerView
        onChange={(selectedValue) => {
          tempValue = selectedValue
        }}
      />
    ),
  })

  await promise

  return value
}

const MateriaDemo = () => {
  const [value, setValue] = React.useState<any>()

  return (
    <ScrollView shadow>
      <DemoBlock title="基础">
        <MaterialTimePicker placeholder="基础用法" value={value} onChange={setValue} />
        <MaterialTimePicker placeholder="受控状态，上边那个也是受控的" value={value} onChange={setValue} />
      </DemoBlock>

      <DemoBlock title="错误状态">
        <MaterialTimePicker placeholder="设置了 error 属性" error="有点问题哦" helper="辅助文本" />
      </DemoBlock>

      <DemoBlock title="各部分、多个排列">
        <MaterialTimePicker
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
        />
        <MaterialTimePicker
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

const ViewDemo = () => {
  const [date1, setDate1] = useState<any>(null)
  const [date2, setDate2] = useState<any>(undefined)
  const [formatdate2, setFormatDate2] = useState<any>(undefined)
  const [date3, setDate3] = useState<any>(undefined)
  const [formatdate3, setFormatDate3] = useState<any>(undefined)
  const [date4, setDate4] = useState<any>(undefined)
  const [date5, setDate5] = useState<any>(undefined)

  return (
    <ScrollView>
      <DemoBlock title="受控模式">
        {String(date1)}
        <TimePickerView value={date1} onChange={setDate1} />
        <TimePickerView value={date1} onChange={setDate1} />
      </DemoBlock>

      <DemoBlock title="格式化选中的值：">
        {String(formatdate2)}
        <TimePickerView
          value={date2}
          format="HH时mm分ss秒"
          onChange={(value, formatValue) => {
            setDate2(value)
            setFormatDate2(formatValue)
          }}
        />
        {String(formatdate3)}
        <TimePickerView
          value={date3}
          format="HH:mm:ss"
          onChange={(value, formatValue) => {
            setDate3(value)
            setFormatDate3(formatValue)
          }}
        />
      </DemoBlock>

      <DemoBlock title="修改 Label">
        {String(date4)}
        <TimePickerView value={date4} hourLabel="HH时" minuteLabel="mm分" secondLabel="ss秒" onChange={setDate4} />
      </DemoBlock>

      <DemoBlock title="展示行数">
        {String(date5)}
        <TimePickerView value={date5} rows={5} onChange={setDate5} />
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
                      <TimePicker>
                        {(value) => <Button>点击选择时间: {value ? dayjs(value).format('HH:mm:ss') : '--'}</Button>}
                      </TimePicker>

                      <Button
                        onClick={async () => {
                          const value = await showTimePicker()
                          toast.info(`你选择了：${value ? dayjs(value).format('HH:mm:ss') : '--'}`)
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
                render={() => <MateriaDemo />}
              />
              <Route
                exact
                path="/PickerView"
                // @ts-ignore
                name="滚动域"
                render={() => <ViewDemo />}
              />
            </TabBarLayout>,
          )}
        </AnimatedSwitch>
      </MemoryRouter>
    </div>
  )
}
