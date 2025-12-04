import React, { createContext } from 'react'
import {
  Button,
  toast,
  notify,
  loading,
  showDialog,
  showModal,
  showPopup,
  showActionSheet,
  useShowModal,
  useShowDialog,
  DemoBlock,
} from '@fexd/mobile'
import { delay } from '@fexd/tools'

// 示例 Context
const ThemeContext = createContext({ theme: 'light' })

function HookDemo() {
  const [showModal, modalStation] = useShowModal()
  const [showDialog, dialogStation] = useShowDialog()

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {modalStation}
      {dialogStation}

      <DemoBlock inline title="Hook 方式（支持 Context）">
        <Button
          onClick={() => {
            showModal({
              content: (
                <ThemeContext.Consumer>{(context) => <div>当前主题: {context.theme}</div>}</ThemeContext.Consumer>
              ),
            })
          }}
        >
          useShowModal
        </Button>
        <Button
          onClick={() => {
            showDialog({
              content: <ThemeContext.Consumer>{(context) => <div>主题: {context.theme}</div>}</ThemeContext.Consumer>,
            })
          }}
        >
          useShowDialog
        </Button>
      </DemoBlock>
    </ThemeContext.Provider>
  )
}

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

    <HookDemo />
  </>
)
