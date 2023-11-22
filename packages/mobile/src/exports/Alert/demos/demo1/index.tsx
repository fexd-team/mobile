import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Alert, AlertProps, Iconfont, Button, showModal, TransitionSlideDown, modalConflict } from '@fexd/mobile'

import styles from './style.module.less'

interface ShowAlertConfig extends Omit<AlertProps, 'children' | 'type'> {
  content: AlertProps['children'] | string
  alertType?: AlertProps['type']
  duration?: number
}

// 你没看错，需要自己写这个方法，Mobile 暂时不给你提供
const showAlert = ({ content, alertType, duration = 1800, closable, ...restProps }: ShowAlertConfig) => {
  const controller = showModal({
    content: (
      <div className="alert-content">
        <Alert
          type={alertType}
          closable={closable}
          {...restProps}
          onClose={() => {
            controller.close()
          }}
        >
          {content}
        </Alert>
      </div>
    ),
    contentClassName: styles['modal-content'],
    mask: false,
    placement: 'top',
    transition: TransitionSlideDown,
    onConflict: modalConflict.handlers.offsetByPlacement,
  })

  if (!closable) {
    setTimeout(() => {
      controller.close()
    }, duration)
  }

  return controller
}

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Alert type="warning">This is a warning alert!</Alert>
      <Alert type="success">This is a success alert!</Alert>
      <Alert type="info">This is an info alert!</Alert>
      <Alert type="error">This is an error alert!</Alert>
    </DemoBlock>
    <DemoBlock title="配合弹窗" inline>
      <Button
        fill="outline"
        onClick={() => {
          showAlert({
            content: 'This is a info alert!',
          })
        }}
      >
        普通
      </Button>
      <Button
        fill="outline"
        onClick={() => {
          showAlert({
            title: '我来组成标题',
            content: 'This is a info alert!',
          })
        }}
      >
        带标题
      </Button>
      <Button
        fill="outline"
        onClick={() => {
          showAlert({ variant: 'outlined', title: '我来组成标题', content: 'This is a info alert!' })
        }}
      >
        描边
      </Button>
      <Button
        fill="outline"
        onClick={() => {
          showAlert({
            variant: 'outlined',
            title: '我来组成标题',
            content: 'This is a 不会自动关闭的 alert!',
            closable: true,
          })
        }}
      >
        不自动关闭
      </Button>
    </DemoBlock>
    <DemoBlock title="标题">
      <Alert type="warning" title="Warning">
        This is a warning alert!
      </Alert>
      <Alert type="success" title="Success">
        This is a success alert!
      </Alert>
      <Alert type="info" title="Info">
        This is an info alert!
      </Alert>
      <Alert type="error" title="Error">
        This is an error alert!
      </Alert>
    </DemoBlock>
    <DemoBlock title="删除按钮">
      <Alert type="warning" closable>
        This is a warning alert!
      </Alert>
      <Alert type="success" title="Success" closable>
        This is a success alert!
      </Alert>
    </DemoBlock>
    <DemoBlock title="自定义图标">
      <Alert icon={<Iconfont type="smail" />}>This is an custom icon alert!</Alert>
      <Alert closable closeText={<Iconfont type="close_circle" />}>
        This is an custom close icon alert!
      </Alert>
    </DemoBlock>
    <DemoBlock title="描边">
      <Alert type="warning" variant="outlined">
        This is an outlined alert!
      </Alert>
      <Alert type="success" variant="outlined">
        This is an outlined alert!
      </Alert>
      <Alert type="info" variant="outlined">
        This is an outlined alert!
      </Alert>
      <Alert type="error" variant="outlined">
        This is an outlined alert!
      </Alert>
    </DemoBlock>
    <DemoBlock title="填充">
      <Alert type="warning" variant="filled">
        This is an outlined alert!
      </Alert>
      <Alert type="success" variant="filled">
        This is an outlined alert!
      </Alert>
      <Alert type="info" variant="filled">
        This is an outlined alert!
      </Alert>
      <Alert type="error" variant="filled">
        This is an outlined alert!
      </Alert>
    </DemoBlock>
  </div>
)
