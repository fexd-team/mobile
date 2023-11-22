import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Button, toast, notify, loading, showDialog, showModal, showPopup, showActionSheet } from '@fexd/mobile'
import { delay } from '@fexd/tools'

export default () => (
  <>
    <DemoBlock inline title="基础">
      <Button
        onClick={() => {
          toast.info('提示')
        }}
      >
        toast
      </Button>
      <Button
        onClick={() => {
          notify.info('通知')
        }}
      >
        notify
      </Button>
      <Button
        onClick={async () => {
          loading.show()
          await delay(1000)
          loading.hide()
        }}
      >
        loading
      </Button>
      <Button
        onClick={() => {
          showDialog({
            content: '命令式对话框',
          })
        }}
      >
        showDialog
      </Button>
      <Button
        onClick={() => {
          showModal({
            content: '命令式模态框',
          })
        }}
      >
        showModal
      </Button>
      <Button
        onClick={() => {
          showPopup({
            title: '标题',
            style: { minHeight: '35%' },
            content: '命令式弹出层',
          })
        }}
      >
        showPopup
      </Button>
      <Button
        onClick={() => {
          showActionSheet({
            actions: [{ content: '动作一' }, { content: '动作二' }, { content: '动作三' }],
          })
        }}
      >
        showActionSheet
      </Button>
    </DemoBlock>
  </>
)
