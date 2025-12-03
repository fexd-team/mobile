import React, { useState, useEffect } from 'react'
import { Button, showDialog, toast, DemoBlock, modalStore } from '@fexd/mobile'

export default () => {
  const [eventLog, setEventLog] = useState<string[]>([])

  useEffect(() => {
    // 监听弹窗打开事件
    const handleOpen = (modalData) => {
      const message = `✅ 弹窗已打开 - ID: ${modalData.modalId}, Level: ${modalData.level}`
      setEventLog((prev) => [...prev.slice(-4), message])
    }

    // 监听弹窗关闭事件
    const handleClose = (modalData) => {
      const message = `❌ 弹窗已关闭 - ID: ${modalData.modalId}`
      setEventLog((prev) => [...prev.slice(-4), message])
    }

    modalStore.eventBus.on('open', handleOpen)
    modalStore.eventBus.on('close', handleClose)

    // 组件卸载时取消监听
    return () => {
      modalStore.eventBus.off('open', handleOpen)
      modalStore.eventBus.off('close', handleClose)
    }
  }, [])

  return (
    <>
      <DemoBlock title="事件监听" inline>
        <Button
          onClick={() => {
            toast.info('即将打开普通弹窗')
            showDialog({
              title: '普通弹窗',
              content: '这是一个普通优先级的弹窗',
              level: 'normal',
            })
          }}
        >
          打开普通弹窗
        </Button>
        <Button
          onClick={() => {
            toast.info('即将打开高优先级弹窗')
            showDialog({
              title: '高优先级弹窗',
              content: '这是一个高优先级的弹窗',
              level: 'high',
            })
          }}
        >
          打开高优先级弹窗
        </Button>
        <Button
          onClick={() => {
            toast.info('即将打开最高优先级弹窗')
            showDialog({
              title: '最高优先级弹窗',
              content: '这是一个最高优先级的弹窗',
              level: 'highest',
            })
          }}
        >
          打开最高优先级弹窗
        </Button>
      </DemoBlock>

      <DemoBlock title="事件日志（最近5条）">
        <div
          style={{
            padding: 12,
            background: '#f5f5f5',
            borderRadius: 8,
            minHeight: 80,
            fontSize: 12,
            lineHeight: '20px',
          }}
        >
          {eventLog.length === 0 ? (
            <div style={{ color: '#999' }}>暂无事件记录，点击上方按钮触发弹窗</div>
          ) : (
            eventLog.map((log, index) => <div key={index}>{log}</div>)
          )}
        </div>
      </DemoBlock>
    </>
  )
}
