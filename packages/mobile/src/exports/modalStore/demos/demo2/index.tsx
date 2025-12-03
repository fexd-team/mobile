import React, { useState, useEffect } from 'react'
import { Button, showDialog, toast, DemoBlock, modalStore } from '@fexd/mobile'

export default () => {
  const [modals, setModals] = useState<any[]>([])

  useEffect(() => {
    // 实时更新弹窗列表
    const updateModals = () => {
      setModals(modalStore.getAll())
    }

    // 监听弹窗变化
    modalStore.eventBus.on('open', updateModals)
    modalStore.eventBus.on('close', updateModals)

    // 初始化
    updateModals()

    return () => {
      modalStore.eventBus.off('open', updateModals)
      modalStore.eventBus.off('close', updateModals)
    }
  }, [])

  return (
    <>
      <DemoBlock title="实时弹窗列表监控" inline>
        <Button
          onClick={() => {
            showDialog({
              title: '弹窗 A',
              content: '这是弹窗 A',
              level: 'normal',
            })
          }}
        >
          打开弹窗 A
        </Button>
        <Button
          onClick={() => {
            showDialog({
              title: '弹窗 B',
              content: '这是弹窗 B',
              level: 'normal',
            })
          }}
        >
          打开弹窗 B
        </Button>
        <Button
          onClick={() => {
            showDialog({
              title: '弹窗 C',
              content: '这是弹窗 C',
              level: 'high',
            })
          }}
        >
          打开弹窗 C (高优先级)
        </Button>
      </DemoBlock>

      <DemoBlock title={`当前活动弹窗列表（共 ${modals.length} 个）`}>
        <div
          style={{
            padding: 12,
            background: '#f5f5f5',
            borderRadius: 8,
            minHeight: 100,
          }}
        >
          {modals.length === 0 ? (
            <div style={{ color: '#999', fontSize: 12 }}>暂无活动弹窗</div>
          ) : (
            <div style={{ fontSize: 12 }}>
              {modals.map((modal, index) => (
                <div
                  key={modal.modalId}
                  style={{
                    padding: '8px 12px',
                    marginBottom: 8,
                    background: 'white',
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div>
                    <strong>#{index + 1}</strong> | ID: {String(modal.modalId).slice(0, 20)}
                    {String(modal.modalId).length > 20 && '...'}
                  </div>
                  <div style={{ marginTop: 4, color: '#666' }}>
                    优先级: <span style={{ color: '#1890ff' }}>{modal.level}</span> | zIndex:{' '}
                    <span style={{ color: '#52c41a' }}>{modal.zIndex}</span>
                  </div>
                  {modal.type && <div style={{ marginTop: 4, color: '#999' }}>类型: {modal.type}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </DemoBlock>
    </>
  )
}
