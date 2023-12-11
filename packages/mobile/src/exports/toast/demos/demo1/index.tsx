import React, { useState, useEffect } from 'react'
import { sample } from '@fexd/tools'
import { MdFlame } from '@fexd/icons'
import { Button, toast, TransitionFade, DemoBlock } from '@fexd/mobile'

import './style.module.less'
import modalConflict from '../../../modalConflict'

const Demo = () => {
  return (
    <>
      <DemoBlock inline title="基础用法">
        <Button
          onClick={() => {
            toast.info('Hello, Mobile')
          }}
        >
          内容居中（默认）
        </Button>
        <Button
          onClick={() => {
            toast.info('Hello, Mobile', { placement: 'top' })
          }}
        >
          顶部
        </Button>
        <Button
          onClick={() => {
            toast.info('Hello, Mobile', { placement: 'bottom' })
          }}
        >
          底部
        </Button>
      </DemoBlock>

      <DemoBlock inline title="弹窗类型（图标类型）">
        <Button
          type="success"
          fill="outline"
          onClick={() => {
            toast.success('Hello, Mobile')
          }}
        >
          成功
        </Button>
        <Button
          type="warning"
          fill="outline"
          onClick={() => {
            toast.warn('Hello, Mobile')
          }}
        >
          警告
        </Button>
        <Button
          type="danger"
          fill="outline"
          onClick={() => {
            toast.fail('Hello, Mobile')
          }}
        >
          失败
        </Button>
        <Button
          type="primary"
          fill="outline"
          onClick={() => {
            toast.info('Hello, Mobile', {
              icon: <MdFlame />,
            })
          }}
        >
          自定义
        </Button>
        <Button
          type="success"
          fill="outline"
          onClick={() => {
            toast.success('Hello, Mobile', { placement: 'top' })
          }}
        >
          顶部
        </Button>
        <Button
          type="warning"
          fill="outline"
          onClick={() => {
            toast.warn('Hello, Mobile', { placement: 'top' })
          }}
        >
          顶部
        </Button>
        <Button
          type="danger"
          fill="outline"
          onClick={() => {
            toast.fail('Hello, Mobile', { placement: 'top' })
          }}
        >
          顶部
        </Button>
        <Button
          type="primary"
          fill="outline"
          onClick={() => {
            toast.info('Hello, Mobile', {
              icon: <MdFlame />,
              placement: 'top',
            })
          }}
        >
          顶部
        </Button>
        <Button
          type="success"
          fill="outline"
          onClick={() => {
            toast.success('Hello, Mobile', { placement: 'bottom' })
          }}
        >
          底部
        </Button>
        <Button
          type="warning"
          fill="outline"
          onClick={() => {
            toast.warn('Hello, Mobile', { placement: 'bottom' })
          }}
        >
          底部
        </Button>
        <Button
          type="danger"
          fill="outline"
          onClick={() => {
            toast.fail('Hello, Mobile', { placement: 'bottom' })
          }}
        >
          底部
        </Button>
        <Button
          type="primary"
          fill="outline"
          onClick={() => {
            toast.info('Hello, Mobile', {
              icon: <MdFlame />,
              placement: 'bottom',
            })
          }}
        >
          底部
        </Button>
      </DemoBlock>

      <DemoBlock inline title="动画相关">
        <Button
          onClick={() => {
            toast.info('Hello, Mobile', { placement: sample(['top', 'bottom']), transition: TransitionFade })
          }}
        >
          动画类型（固定为 TransitionFade）
        </Button>
        <Button
          onClick={() => {
            toast.info('Hello, Mobile', { placement: sample(['top', 'bottom']), transitionSpeed: 'slow' })
          }}
        >
          动画速度（慢）
        </Button>
        <Button
          onClick={() => {
            toast.info('Hello, Mobile', { placement: sample(['top', 'bottom']), transitionSpeed: 1500 })
          }}
        >
          动画速度（自定义 1500ms）
        </Button>
      </DemoBlock>

      <DemoBlock inline title="很长的内容">
        <Button
          onClick={() => {
            toast.info(
              'Hello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, Mobile',
            )
          }}
        >
          内容居中（默认）
        </Button>
        <Button
          onClick={() => {
            toast.info(
              'Hello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, Mobile',
              { placement: 'top' },
            )
          }}
        >
          顶部
        </Button>
        <Button
          onClick={() => {
            toast.info(
              'Hello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, Mobile',
              { placement: 'bottom' },
            )
          }}
        >
          底部
        </Button>
        <Button
          onClick={() => {
            toast.warn(
              'Hello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, Mobile',
            )
          }}
        >
          居中带图标
        </Button>
        <Button
          onClick={() => {
            toast.warn(
              'Hello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, Mobile',
              { placement: 'top' },
            )
          }}
        >
          顶部带图标
        </Button>
        <Button
          onClick={() => {
            toast.warn(
              'Hello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, MobileHello, Mobile Hello, Mobile Hello, MobileHello, MobileHello, Mobile  Hello, Mobile Hello, Mobile',
              { placement: 'bottom' },
            )
          }}
        >
          底部带图标
        </Button>
      </DemoBlock>

      <DemoBlock inline title="交互阻断">
        <Button
          onClick={async () => {
            await toast.info('toast 存在期间将阻断交互', { touchable: true }).promise
          }}
        >
          toast 存在期间将阻断交互
        </Button>
      </DemoBlock>

      <DemoBlock inline title="互斥控制">
        <Button
          onClick={() => {
            toast.info('隐藏上一个（默认互斥行为）', { placement: sample(['center', 'top', 'bottom']) })
          }}
        >
          隐藏（默认）
        </Button>
        <Button
          onClick={() => {
            toast.info('无互斥行为，toast 将会叠加', {
              placement: sample(['center', 'top', 'bottom']),
              onConflict: null,
            })
          }}
        >
          无互斥行为
        </Button>

        <Button
          onClick={() => {
            toast.info('偏移互斥（top）', {
              placement: 'top',
              onConflict: modalConflict.handlers.offsetByPlacement,
            })
          }}
        >
          偏移互斥（top）
        </Button>
        <Button
          onClick={() => {
            toast.info('偏移互斥（bottom）', {
              placement: 'bottom',
              onConflict: modalConflict.handlers.offsetByPlacement,
            })
          }}
        >
          偏移互斥（bottom）
        </Button>
      </DemoBlock>
    </>
  )
}

export default () => {
  return <Demo />
}
