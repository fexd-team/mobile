import React, { useState, useRef } from 'react'
import BigNumber from 'bignumber.js'

import DemoBlock from '@documents/components/DemoBlock'
import {
  BasicInput,
  Button,
  Input,
  LineInput,
  toast,
  TextArea,
  BlockLabel,
  LineLabel,
  Space,
  BlockInput,
  ScrollView,
} from '@fexd/mobile'

// import './style.module.less'

const BasicDemo = () => {
  const [value, setValue] = useState<any>('124567')
  const inputRef = useRef<any>()

  // Object.assign(window, {
  //   inputRef,
  //   setValue,
  // })

  const [themeType, setThemeType] = useState('Block')

  const ThemedInput = {
    Line: LineInput,
    Block: BlockInput,
  }[themeType] as typeof LineInput

  return (
    <ScrollView className="gap-4">
      <DemoBlock title="基础">
        <Input />
      </DemoBlock>

      <DemoBlock title="normalize / format">
        <Input
          ref={inputRef}
          value={value}
          format={(value) => BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
          normalize={(value) => value.replace(/\D/g, '')}
          // normalizeTrigger="onBlur"
          onChange={(value) => {
            console.log('onChange', value)
            setValue(value)
          }}
        />
      </DemoBlock>

      <DemoBlock title="TextArea">
        <TextArea
          format={(value) => BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
          normalize={(value) => value.replace(/\D/g, '')}
        />
      </DemoBlock>

      <DemoBlock title="TextArea 自动高度">
        <TextArea height="auto" />
      </DemoBlock>

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
        <ThemedInput
          // format={(value) => BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
          // normalize={(value) => value.replace(/\D/g, '')}
          label="随便写点什么"
        />
      </DemoBlock>

      <DemoBlock title={`${themeType} 多行输入`}>
        <ThemedInput placeholder="按回车键换行" multipleLines />
      </DemoBlock>

      <DemoBlock title={`${themeType} 状态一览`}>
        <ThemedInput
          label="错误状态，聚焦试试"
          placeholder="聚焦时会暂时去掉错误状态"
          error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
          helper="辅助文本"
        />
        <ThemedInput hideErrorWhenFocusing={false} placeholder="聚焦时不解除错误状态" error="XXX有点问题哦" />
        <ThemedInput placeholder={'警告状态'} labelType="warn" helper="辅助文本" />
        <ThemedInput placeholder={'成功状态'} labelType="success" helper="辅助文本" />
        <ThemedInput disabled label={'禁用状态'} helper="禁用了，点也点不着" />
      </DemoBlock>

      <DemoBlock title={`${themeType} 各部分示意`}>
        <ThemedInput
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
        />
        <ThemedInput
          label="发送验证码"
          placeholder="请输入电话号码"
          prefix="+86"
          helper="纯纯的辅助文本"
          suffix={
            <Button
              type="primary"
              size="mini"
              onClick={() => {
                toast.success('假装发送成功', {
                  placement: 'bottom',
                })
              }}
            >
              发送
            </Button>
          }
          error="其实不会做任何事情"
        />
      </DemoBlock>
    </ScrollView>
  )
}

export default () => {
  return <BasicDemo />
}
