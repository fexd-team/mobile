import React, { useState, useEffect } from 'react'
import { isFunction, sample, random } from '@fexd/tools'
import { Button, notify, TransitionFade } from '@fexd/mobile'
import DemoBlock from '@documents/components/DemoBlock'

import './style.module.less'

const notifyMethodNames = Object.entries(notify)
  .filter(([key, value]) => isFunction(value))
  .map(([key]) => key)

const Demo = () => {
  return (
    <>
      <DemoBlock inline title="基础用法">
        <Button
          type="primary"
          fill="outline"
          onClick={() => {
            notify.info('Hello, Mobile')
          }}
        >
          提示（默认）
        </Button>
        <Button
          type="success"
          fill="outline"
          onClick={() => {
            notify.success('Hello, Mobile')
          }}
        >
          成功
        </Button>
        <Button
          type="warning"
          fill="outline"
          onClick={() => {
            notify.warning('Hello, Mobile')
          }}
        >
          警告
        </Button>
        <Button
          type="danger"
          fill="outline"
          onClick={() => {
            notify.error('Hello, Mobile')
          }}
        >
          错误
        </Button>
      </DemoBlock>

      <DemoBlock inline title="动画相关">
        <Button
          onClick={() => {
            notify.info('Hello, Mobile', { transition: TransitionFade })
          }}
        >
          动画类型（固定为 TransitionFade）
        </Button>
        <Button
          onClick={() => {
            notify.info('Hello, Mobile', { transitionSpeed: 'slow' })
          }}
        >
          动画速度（慢）
        </Button>
        <Button
          onClick={() => {
            notify.info('Hello, Mobile', { transitionSpeed: 1500 })
          }}
        >
          动画速度（自定义 1500ms）
        </Button>
      </DemoBlock>

      <DemoBlock inline title="很长的内容">
        <Button
          type="primary"
          fill="outline"
          onClick={() => {
            notify.info(
              '很长的消息内容很长的消息内容 很长的消息内容很长的消息内容很长的消息内容 很长的消息内容 很长的消息内容很长的消息内容很长的消息内容',
            )
          }}
        >
          提示（默认）
        </Button>
        <Button
          type="success"
          fill="outline"
          onClick={() => {
            notify.success(
              '很长的消息内容很长的消息内容 很长的消息内容很长的消息内容很长的消息内容 很长的消息内容 很长的消息内容很长的消息内容很长的消息内容',
            )
          }}
        >
          成功
        </Button>
        <Button
          type="warning"
          fill="outline"
          onClick={() => {
            notify.warning(
              '很长的消息内容很长的消息内容 很长的消息内容很长的消息内容很长的消息内容 很长的消息内容 很长的消息内容很长的消息内容很长的消息内容',
            )
          }}
        >
          警告
        </Button>
        <Button
          type="danger"
          fill="outline"
          onClick={() => {
            notify.error(
              '很长的消息内容很长的消息内容 很长的消息内容很长的消息内容很长的消息内容 很长的消息内容 很长的消息内容很长的消息内容很长的消息内容',
            )
          }}
        >
          错误
        </Button>
      </DemoBlock>

      <DemoBlock inline title="交互阻断">
        <Button
          onClick={async () => {
            await notify.info('notify 存在期间将阻断交互', { touchable: true }).promise
          }}
        >
          notify 存在期间将阻断交互
        </Button>
      </DemoBlock>

      <DemoBlock inline title="互斥控制">
        <Button
          onClick={() => {
            // @ts-ignore
            notify[sample(notifyMethodNames)](Array(random(1, 10, true)).fill('隐藏上一个（默认互斥行为）').join(''))
          }}
        >
          隐藏（默认）
        </Button>
        <Button
          onClick={() => {
            // @ts-ignore
            notify[sample(notifyMethodNames)](Array(random(1, 10, true)).fill('无互斥行为，notify 将会叠加').join(''), {
              onConflict: null,
            })
          }}
        >
          无互斥行为
        </Button>
      </DemoBlock>
    </>
  )
}

export default () => <Demo />
