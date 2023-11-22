import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Button, loading } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock inline title="使用方式">
      <Button
        type="primary"
        fill="outline"
        onClick={() => {
          loading.show({
            mask: false,
          })
        }}
      >
        展示 1 次
      </Button>
      <Button
        type="warning"
        fill="outline"
        onClick={() => {
          loading.hide()
        }}
      >
        关闭 1 次
      </Button>
      <Button
        type="danger"
        fill="outline"
        onClick={() => {
          loading.hide(true)
        }}
      >
        强制关闭
      </Button>
    </DemoBlock>
  </>
)
