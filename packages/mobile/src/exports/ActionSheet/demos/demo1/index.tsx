import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Button, showActionSheet, toast, Iconfont } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Button
        onClick={() => {
          const { close } = showActionSheet({
            actions: [
              {
                content: '动作一',
                // onClick: () => {
                //   toast.info('动作一')
                //   close()
                // },
              },
              {
                content: '动作二',
                onClick: () => {
                  toast.info('动作二')
                  close()
                },
              },
              {
                content: '动作三',
                onClick: () => {
                  toast.info('动作三')
                  close()
                },
              },
            ],
          })
        }}
      >
        基础
      </Button>
    </DemoBlock>
    <DemoBlock title="进阶" inline>
      <Button
        onClick={() => {
          const { close } = showActionSheet({
            actions: [
              {
                content: 'primary 按钮',
                type: 'primary',
                onClick: () => {
                  toast.info('primary 按钮')
                  close()
                },
              },
              {
                content: '延时关闭按钮',
                loading: 'auto',
                onClick: async () => {
                  await toast.info('延时关闭，等我关了一起关').promise
                  close()
                },
              },
              {
                content: '',
                loading: true,
                onClick: () => {
                  toast.info('loading 按钮')
                  close()
                },
              },
              {
                content: '禁用按钮',
                disabled: true,
                onClick: () => {
                  toast.info('禁用按钮')
                  close()
                },
              },
              {
                content: '填充按钮',
                fill: 'solid',
                type: 'success',
              },
            ],
          })
        }}
      >
        自定义按钮
      </Button>
      <Button
        onClick={() => {
          const { close } = showActionSheet({
            title: '标题描述说明',
            actions: [
              {
                content: '带了标题',
              },
              {
                content: '总感觉就有点',
                type: 'warning',
              },
              {
                content: '丑了',
                icon: <Iconfont type="anger" />,
                type: 'danger',
              },
            ],
          })
        }}
      >
        带标题
      </Button>
    </DemoBlock>
  </div>
)
