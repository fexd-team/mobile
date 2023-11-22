import React, { useState } from 'react'
import { MemoryRouter, Route, Redirect } from 'react-router-dom'
import dayjs from 'dayjs'
import DemoBlock from '@documents/components/DemoBlock'
import { TabBarLayout, AnimatedSwitch } from '@fexd/mobile-router5'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import { MaterialDatePicker, DatePicker, Button, DatePickerView, ScrollView, showPopup, toast } from '@fexd/mobile'

import './style.module.less'

const showDatePicker = async () => {
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
      <DatePickerView
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
        <MaterialDatePicker placeholder="基础用法" value={value} onChange={(value) => setValue(value)} />
        <MaterialDatePicker
          placeholder="受控状态，上边那个也是受控的"
          value={value}
          onChange={(value) => setValue(value)}
        />
      </DemoBlock>

      <DemoBlock title="错误状态">
        <MaterialDatePicker placeholder="设置了 error 属性" error="有点问题哦" helper="辅助文本" />
      </DemoBlock>

      <DemoBlock title="各部分、多个排列">
        <MaterialDatePicker
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
        />
        <MaterialDatePicker
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
  const [date1, setDate1] = useState<any>(new Date('2021/08/09'))
  const [date2, setDate2] = useState<any>(undefined)
  const [formatDate2, setFormatDate2] = useState<any>('')
  const [date3, setDate3] = useState<any>(undefined)
  const [formatDate3, setFormatDate3] = useState<any>('')
  const [date4, setDate4] = useState<any>(undefined)
  const [date5, setDate5] = useState<any>(undefined)
  const [date6, setDate6] = useState<any>(undefined)
  const [date7, setDate7] = useState<any>(undefined)
  const [date8, setDate8] = useState<any>(undefined)

  return (
    <ScrollView>
      <DemoBlock title="受控模式">
        {String(date1)}
        <DatePickerView value={date1} onChange={setDate1} />
        <DatePickerView value={date1} onChange={setDate1} />
      </DemoBlock>

      <DemoBlock title="格式化选中的值：">
        {String(formatDate2)}
        <DatePickerView
          value={date2}
          format="YYYY年MM月DD日"
          onChange={(value, formatValue) => {
            setDate2(value)
            setFormatDate2(formatValue)
          }}
        />
        {String(formatDate3)}
        <DatePickerView
          value={date3}
          format="YYYY/MM/DD"
          onChange={(value, formatValue) => {
            setDate3(value)
            setFormatDate3(formatValue)
          }}
        />
      </DemoBlock>

      <DemoBlock title="最小日期">
        {String(date4)}
        <DatePickerView value={date4} min={new Date()} onChange={setDate4} />
      </DemoBlock>

      <DemoBlock title="最大日期">
        {String(date5)}
        <DatePickerView value={date5} max={new Date()} onChange={setDate5} />
      </DemoBlock>

      <DemoBlock title="修改 Label">
        {String(date6)}
        <DatePickerView value={date6} yearLabel="YYYY年" monthLabel="MM月" dayLabel="DD日" onChange={setDate6} />
      </DemoBlock>

      <DemoBlock title="展示行数">
        {String(date7)}
        <DatePickerView value={date7} rows={5} onChange={setDate7} />
      </DemoBlock>

      <DemoBlock title="通过样式更换顺序">
        {String(date8)}
        <DatePickerView
          value={date8}
          format="DD/MM/YYYY"
          onChange={setDate8}
          style={{ flexDirection: 'row-reverse' }}
        />
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
            <Redirect to="/picker" />
          </Route>
          {AnimatedSwitch.renderLayout(
            <TabBarLayout>
              <Route
                exact
                path="/picker"
                // @ts-ignore
                name="默认"
                render={() => (
                  <ScrollView>
                    <DemoBlock title="基础">
                      <DatePicker>
                        {(value) => (
                          <Button>点击选择日期: {value ? dayjs(value).format('YYYY年MM月DD日') : '--'}</Button>
                        )}
                      </DatePicker>

                      <Button
                        onClick={async () => {
                          const value = await showDatePicker()
                          toast.info(`你选择了：${value ? dayjs(value).format('YYYY年MM月DD日') : '--'}`)
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
                path="/maretial"
                // @ts-ignore
                name="Maretial"
                render={() => <MateriaDemo />}
              />
              <Route
                exact
                path="/view"
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
