import React, { useState, useRef } from 'react'
import { MemoryRouter, Route, Redirect } from 'react-router-dom'

import DemoBlock from '@documents/components/DemoBlock'
import { TabBarLayout, AnimatedSwitch } from '@fexd/mobile-router5'
import { Button, ScrollView, Input, TextArea, MaterialInput, toast } from '@fexd/mobile'

import './style.module.less'

const BasicDemo = () => {
  const [value, setValue] = useState('124567')
  const inputRef = useRef<any>()

  Object.assign(window, {
    inputRef,
    setValue,
  })

  return (
    <>
      <DemoBlock title="基础">
        <Input />
      </DemoBlock>

      <DemoBlock title="normalize / format">
        <Input
          // type="number"
          ref={inputRef}
          value={value}
          format={(value) => Number(value).toLocaleString()}
          normalize={(value) => value.replace(/\D/g, '')}
          normalizeTrigger="onBlur"
          onChange={(value) => {
            console.log('onChange', value)
            setValue(value)
          }}
        />
      </DemoBlock>

      <DemoBlock title="TextArea">
        <TextArea />
      </DemoBlock>

      <DemoBlock title="TextArea 自动高度">
        <TextArea height="auto" />
      </DemoBlock>
    </>
  )
}

const MateriaDemo = () => {
  const [value, setValue] = React.useState<any>()

  return (
    <ScrollView shadow>
      <DemoBlock title="基础">
        <MaterialInput label="直接输入，不用客气" />
      </DemoBlock>

      <DemoBlock title="多行输入">
        <MaterialInput placeholder="按回车键换行" multipleLines />
      </DemoBlock>

      <DemoBlock title="错误状态">
        <MaterialInput label="聚焦试试" placeholder="聚焦时会暂时解除错误状态" error="XXX有点问题哦" />

        <MaterialInput hideErrorWhenFocusing={false} placeholder="聚焦时不解除错误状态" error="XXX有点问题哦" />
      </DemoBlock>

      <DemoBlock title="禁用状态">
        <MaterialInput disabled placeholder="禁用了，点也点不着" />
      </DemoBlock>

      <DemoBlock title="各部分示意">
        <MaterialInput
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
        />
        <MaterialInput
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
                    <BasicDemo />
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
            </TabBarLayout>,
          )}
        </AnimatedSwitch>
      </MemoryRouter>
    </div>
  )
}
