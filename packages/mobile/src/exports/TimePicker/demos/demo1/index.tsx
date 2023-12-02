import React, { useState } from 'react'
import { MemoryRouter, Route, Redirect } from 'react-router-dom'
import dayjs from 'dayjs'
import DemoBlock from '@documents/components/DemoBlock'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import {
  LineTimePicker,
  TimePicker,
  Button,
  TimePickerView,
  showPopup,
  toast,
  Space,
  LineLabel,
  BlockLabel,
  BlockTimePicker,
  ScrollView,
} from '@fexd/mobile'

// import './style.module.less'

const showTimePicker = async () => {
  let value
  let tempValue: any

  const { close, promise } = showPopup({
    title: ' ',
    headerRight: (
      <Button
        type="primary"
        fill="none"
        onClick={() => {
          value = tempValue
          close()
        }}
        icon={<CheckmarkOutline />}
      />
    ),
    headerLeft: <Button type="primary" fill="none" onClick={() => close()} icon={<CloseOutline />} />,
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

const LineDemo = () => {
  const [value, setValue] = React.useState<any>()

  const [themeType, setThemeType] = useState('Block')
  const theme = {
    Line: LineLabel,
    Block: BlockLabel,
  }[themeType]

  const ThemedTimePicker = {
    Line: LineTimePicker,
    Block: BlockTimePicker,
  }[themeType] as typeof LineTimePicker

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

const ViewDemo = () => {
  const [date1, setDate1] = useState<any>(null)
  const [date2, setDate2] = useState<any>(undefined)
  const [formatdate2, setFormatDate2] = useState<any>(undefined)
  const [date3, setDate3] = useState<any>(undefined)
  const [formatdate3, setFormatDate3] = useState<any>(undefined)
  const [date4, setDate4] = useState<any>(undefined)
  const [date5, setDate5] = useState<any>(undefined)

  return (
    <div className="gap-4 bg-[#f5f5f5]">
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
    </div>
  )
}

export default () => {
  return (
    <ScrollView className="gap-4">
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
          命令式（临时实现，kula 内未提供）
        </Button>
      </DemoBlock>

      <LineDemo />

      <DemoBlock title="TimePickerView 示例">
        <Button
          onClick={() => {
            showPopup({
              title: 'TimePickerView 示例',
              content: <ViewDemo />,
            })
          }}
        >
          性能原因，请点击查看
        </Button>
      </DemoBlock>
    </ScrollView>
  )
}
