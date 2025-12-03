---
group:
  title: 反馈
  path: /feedback

mobileDemoFixed: false
---

# modalStore 弹窗状态管理 <ImportCost name="modalStore" />

modalStore 是一个用于全局管理 Modal 弹窗状态的工具库，提供了弹窗的层级管理、批量操作和事件监听等功能。

---

## 功能概述

- **层级管理**：自动管理多个弹窗的 zIndex，支持 4 个优先级层级
- **批量操作**：提供关闭所有弹窗、销毁所有弹窗等批量操作方法
- **事件监听**：监听全局弹窗的打开和关闭事件
- **状态查询**：查询当前所有弹窗的状态信息

---

## 效果演示

### 事件监听基础

监听全局弹窗的打开和关闭事件，实时获取事件通知。

<code src="./demos/demo1/index.tsx" />

### 实时弹窗列表监控

实时监控当前所有活动弹窗的状态，可用于调试和问题排查。

<code src="./demos/demo2/index.tsx" />

### 批量操作与层级系统

演示批量关闭、销毁弹窗，以及不同优先级层级的 zIndex 管理。

<code src="./demos/demo3/index.tsx" />

---

## 实际应用场景

以下是一些典型的使用场景示例代码：

### 统计弹窗使用情况

```typescript
import { modalStore } from '@fexd/mobile'

// 记录弹窗打开次数
const modalOpenCount: Record<string, number> = {}

const handleModalOpen = (modalData) => {
  const { modalId, type } = modalData
  const key = type || String(modalId)

  modalOpenCount[key] = (modalOpenCount[key] || 0) + 1

  // 上报统计数据到服务器
  reportAnalytics('modal_open', {
    modalId,
    type,
    count: modalOpenCount[key],
  })
}

modalStore.eventBus.on('open', handleModalOpen)

// 如需取消监听：
// modalStore.eventBus.off('open', handleModalOpen)
```

### 页面跳转时自动关闭弹窗

```tsx | pure
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { modalStore } from '@fexd/mobile'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    // 路由变化时关闭所有弹窗
    modalStore.closeAll()
  }, [location.pathname])

  return <YourAppContent />
}
```

### 监控弹窗数量异常

```typescript
import { modalStore } from '@fexd/mobile'

const handleModalOpen = (modalData) => {
  const currentModals = modalStore.getAll()

  // 检测是否有过多弹窗叠加
  if (currentModals.length > 3) {
    console.warn(`当前有 ${currentModals.length} 个弹窗打开，可能影响用户体验`)
    // 注意：不要在事件监听器中使用 toast，会导致循环触发
  }

  // 特殊关注最高优先级弹窗
  if (modalData.level === 'highest') {
    // 记录或上报紧急弹窗出现
    console.log('[重要] 最高优先级弹窗:', modalData)
  }
}

modalStore.eventBus.on('open', handleModalOpen)

// 如需取消监听：
// modalStore.eventBus.off('open', handleModalOpen)
```

### 全局弹窗管理器组件

```tsx | pure
import React, { useState, useEffect } from 'react'
import { modalStore } from '@fexd/mobile'

export function GlobalModalManager() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      setCount(modalStore.getAll().length)
    }

    modalStore.eventBus.on('open', updateCount)
    modalStore.eventBus.on('close', updateCount)

    updateCount()

    return () => {
      modalStore.eventBus.off('open', updateCount)
      modalStore.eventBus.off('close', updateCount)
    }
  }, [])

  // 在开发环境显示调试信息
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999999 }}>
      <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 8px', borderRadius: 4 }}>
        弹窗: {count}
      </div>
    </div>
  )
}
```

---

## API

### eventBus

事件总线对象，用于监听弹窗事件。

#### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| :-- | :-- | :-- | :-- |
| `on(event, handler)` | 监听事件 | `event`: 事件名称（'open' \| 'close'）<br/>`handler`: 回调函数 | `EventBus` (this，用于链式调用) |
| `off(event, handler)` | 取消监听 | `event`: 事件名称<br/>`handler`: 回调函数 | `EventBus` (this，用于链式调用) |
| `emit(event, data)` | 触发事件（内部使用） | `event`: 事件名称<br/>`data`: 事件数据 | - |

#### 事件类型

##### open 事件

当弹窗被添加到 store 时触发。

**回调参数：**

```typescript
{
  modalId: string | number    // 弹窗唯一标识
  zIndex: number              // 计算后的 zIndex 值
  level: 'low' | 'normal' | 'high' | 'highest'  // 优先级层级
  type?: string               // 弹窗类型（可选）
  props?: any                 // 弹窗属性
  setVisible: (visible: boolean) => void  // 控制显示/隐藏
  setCreated: (created: boolean) => void  // 控制创建/销毁
  contentRef: React.RefObject<HTMLDivElement>  // 内容引用
}
```

##### close 事件

当弹窗从 store 中移除时触发。

**回调参数：** 同 `open` 事件

---

### 其他方法

| 方法名                         | 说明                          | 参数                   | 返回值                   |
| :----------------------------- | :---------------------------- | :--------------------- | :----------------------- |
| `getById(modalId)`             | 根据 ID 获取弹窗信息          | `modalId`: 弹窗 ID     | `ModalStoreData \| void` |
| `getAll()`                     | 获取所有弹窗信息              | -                      | `ModalStoreData[]`       |
| `closeAll()`                   | 关闭所有弹窗                  | -                      | `void`                   |
| `destroyAll()`                 | 销毁所有弹窗                  | -                      | `void`                   |
| `addModal(modalId, modalInfo)` | 添加弹窗（内部使用）          | `modalId`, `modalInfo` | `void`                   |
| `removeModal(modalId)`         | 从 store 移除弹窗（内部使用） | `modalId`              | `void`                   |

---

## 层级系统

modalStore 提供了 4 个优先级层级，每个层级有不同的基础 zIndex 权重：

| 层级      | 权重    | 说明                   |
| :-------- | :------ | :--------------------- |
| `low`     | 999     | 低优先级，用于一般提示 |
| `normal`  | 9,999   | 普通优先级，默认层级   |
| `high`    | 99,999  | 高优先级，重要提示     |
| `highest` | 999,999 | 最高优先级，紧急提示   |

同一层级的弹窗会自动递增 zIndex，确保后打开的弹窗在上层。

---

## 使用建议

1. **及时取消监听**：在组件卸载时务必调用返回的取消函数，避免内存泄漏
2. **合理使用层级**：根据业务重要性选择合适的层级，避免滥用 `highest` 层级
3. **避免频繁操作**：`closeAll()` 和 `destroyAll()` 会影响所有弹窗，使用时需谨慎
4. **调试开发**：开发环境可以监听事件来调试弹窗行为
5. **⚠️ 避免循环触发**：不要在事件监听器中调用 `toast`、`showDialog` 等会触发新弹窗的方法，会导致无限循环

---

## 类型定义

<API identifier="ModalStoreData" hideTitle src="./type.tsx" exports='["ModalStoreData"]'></API>
