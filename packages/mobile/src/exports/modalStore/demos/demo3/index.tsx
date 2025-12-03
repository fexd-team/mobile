import React, { useState, useEffect } from 'react'
import { Button, showDialog, toast, DemoBlock, modalStore } from '@fexd/mobile'

export default () => {
  const [modalCount, setModalCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      setModalCount(modalStore.getAll().length)
    }

    modalStore.eventBus.on('open', updateCount)
    modalStore.eventBus.on('close', updateCount)

    updateCount()

    return () => {
      modalStore.eventBus.off('open', updateCount)
      modalStore.eventBus.off('close', updateCount)
    }
  }, [])

  return (
    <>
      <DemoBlock title="批量操作演示" inline>
        <Button
          onClick={() => {
            showDialog({
              title: '弹窗 1',
              content: '第一个弹窗',
              maskClosable: false,
            })
          }}
        >
          打开弹窗 1
        </Button>
        <Button
          onClick={() => {
            showDialog({
              title: '弹窗 2',
              content: '第二个弹窗',
              maskClosable: false,
            })
          }}
        >
          打开弹窗 2
        </Button>
        <Button
          onClick={() => {
            showDialog({
              title: '弹窗 3',
              content: '第三个弹窗',
              maskClosable: false,
            })
          }}
        >
          打开弹窗 3
        </Button>
      </DemoBlock>

      <DemoBlock title="批量控制" inline>
        <Button
          type="warning"
          onClick={() => {
            const count = modalStore.getAll().length
            modalStore.closeAll()
            toast.info(`已关闭 ${count} 个弹窗`)
          }}
        >
          关闭所有弹窗 ({modalCount})
        </Button>
        <Button
          type="danger"
          onClick={() => {
            const count = modalStore.getAll().length
            modalStore.destroyAll()
            toast.info(`已销毁 ${count} 个弹窗`)
          }}
        >
          销毁所有弹窗 ({modalCount})
        </Button>
      </DemoBlock>

      <DemoBlock title="层级系统演示">
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 8,
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>层级权重说明：</div>
            <div>• low (低): 999</div>
            <div>• normal (普通): 9,999</div>
            <div>• high (高): 99,999</div>
            <div>• highest (最高): 999,999</div>
            <div style={{ marginTop: 8, color: '#666' }}>同层级的弹窗会自动递增 zIndex，后打开的在上层</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button
            onClick={() => {
              const lowCount = modalStore.getAll().filter((m) => m.level === 'low').length
              toast.info(`打开 Low 层级弹窗 (zIndex: ${999 + lowCount + 1})`)
              showDialog({
                title: 'Low 层级',
                content: `低优先级弹窗\nzIndex: ${999 + lowCount + 1}`,
                level: 'low',
              })
            }}
          >
            Low 层级
          </Button>
          <Button
            onClick={() => {
              const normalCount = modalStore.getAll().filter((m) => m.level === 'normal').length
              toast.info(`打开 Normal 层级弹窗 (zIndex: ${9999 + normalCount + 1})`)
              showDialog({
                title: 'Normal 层级',
                content: `普通优先级弹窗\nzIndex: ${9999 + normalCount + 1}`,
                level: 'normal',
              })
            }}
          >
            Normal 层级
          </Button>
          <Button
            onClick={() => {
              const highCount = modalStore.getAll().filter((m) => m.level === 'high').length
              toast.info(`打开 High 层级弹窗 (zIndex: ${99999 + highCount + 1})`)
              showDialog({
                title: 'High 层级',
                content: `高优先级弹窗\nzIndex: ${99999 + highCount + 1}`,
                level: 'high',
              })
            }}
          >
            High 层级
          </Button>
          <Button
            onClick={() => {
              const highestCount = modalStore.getAll().filter((m) => m.level === 'highest').length
              toast.info(`打开 Highest 层级弹窗 (zIndex: ${999999 + highestCount + 1})`)
              showDialog({
                title: 'Highest 层级',
                content: `最高优先级弹窗\nzIndex: ${999999 + highestCount + 1}`,
                level: 'highest',
              })
            }}
          >
            Highest 层级
          </Button>
        </div>
      </DemoBlock>

      <DemoBlock title="测试：同时打开多个不同层级">
        <Button
          type="primary"
          onClick={() => {
            toast.info('将依次打开 4 个不同层级的弹窗')

            // 依次打开不同层级的弹窗
            setTimeout(() => {
              showDialog({
                title: 'Low 层级',
                content: '这是 Low 层级，应该在最下面',
                level: 'low',
              })
            }, 100)

            setTimeout(() => {
              showDialog({
                title: 'Normal 层级',
                content: '这是 Normal 层级，应该在 Low 上面',
                level: 'normal',
              })
            }, 300)

            setTimeout(() => {
              showDialog({
                title: 'High 层级',
                content: '这是 High 层级，应该在 Normal 上面',
                level: 'high',
              })
            }, 500)

            setTimeout(() => {
              showDialog({
                title: 'Highest 层级',
                content: '这是 Highest 层级，应该在最上面',
                level: 'highest',
              })
            }, 700)
          }}
        >
          同时打开 4 个不同层级
        </Button>
      </DemoBlock>
    </>
  )
}
