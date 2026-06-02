# Modal 系统

@fexd/mobile 的弹层体系是一个完整的子系统，涉及组件继承、命令式 API、互斥控制、全局状态管理。

**遇到弹层相关需求时，先读本文件，再读具体 reference。**

## 系统架构

```
Portal（DOM 传送门）
  └─ Overlay（遮罩层）
     └─ BasicModal（基础弹层：Portal+Overlay+动画+Store 注册）
        └─ Modal（完整弹层：互斥控制+shareMask+contentVisible）
           ├─ Dialog（居中对话框：标题+actions 按钮）
           ├─ Popup（底部面板：标题栏+圆角）
           └─ ActionSheet（动作列表）
```

## 三种调用方式

| 方式   | API                   | 适用场景                     | 返回值                       |
| ------ | --------------------- | ---------------------------- | ---------------------------- |
| 命令式 | `showXxx()`           | 一次性交互，不需要持久状态   | `{ close, update, promise }` |
| 声明式 | `<Xxx visible={...}>` | 持久存在，需精细控制生命周期 | —                            |
| Hook   | `useShowXxx()`        | 需要绑定到特定 ModalStation  | `[show, stationNode]`        |

### 命令式调用

```tsx
const controller = showDialog({
  title: '确认',
  content: '确定删除？',
  actions: [
    {
      content: '确认',
      onClick: () => {
        controller.close()
      },
    },
  ],
})
```

### 声明式调用

```tsx
const [visible, setVisible] = useState(false)
<Dialog visible={visible} onClose={() => setVisible(false)}>
  内容
</Dialog>
```

### Hook 调用

```tsx
const [show, stationNode] = useShowDialog()
// show() 返回 { close, update, promise }
// stationNode 需渲染到 JSX 中以挂载 ModalStation
```

## 四种弹层类型选择

| 类型            | 视觉                            | 典型场景       | 命令式          |
| --------------- | ------------------------------- | -------------- | --------------- |
| **Dialog**      | 居中，标题+内容+按钮            | 确认/取消决策  | showDialog      |
| **Popup**       | 底部弹出，标题栏+内容           | 复杂内容面板   | showPopup       |
| **ActionSheet** | 底部弹出，动作列表              | 多选项操作     | showActionSheet |
| **Modal**       | 可配置位置（center/top/bottom） | 完全自定义内容 | showModal       |

## 互斥控制

多弹层同时存在时，通过 `modalConflict` 处理视觉冲突：

```tsx
import { Modal, modalConflict, TransitionSlideUp } from '@fexd/mobile'

<Modal shareMask onConflict={modalConflict.handlers.mask}>
  第一层（被遮盖时加蒙层）
</Modal>
<Modal shareMask onConflict={modalConflict.handlers.hidden}>
  第二层（被遮盖时隐藏内容）
</Modal>
```

| 处理器                                     | 效果                   |
| ------------------------------------------ | ---------------------- |
| `modalConflict.handlers.mask`              | 给较低层弹层内容加蒙层 |
| `modalConflict.handlers.hidden`            | 隐藏较低层弹层内容     |
| `modalConflict.handlers.offsetByPlacement` | 较低层弹层偏移         |

`showModal` 默认配置：`shareMask: true` + `onConflict: modalConflict.handlers.hidden`。

## 全局状态管理（modalStore）

`modalStore` 管理所有弹层实例的可见性和 z-index：

- 弹层打开/关闭时自动注册/注销
- 互斥逻辑依赖 store 中的数据
- 可通过 `modalStore` 监听全局弹层事件

**禁止**在 `modalStore` 事件监听器中调用 `toast`/`showDialog` 等命令式 API（会导致无限循环）。

## ModalStation 与 Provider

- `Provider` 组件默认包含 `ModalStation`，推荐在应用根组件使用
- `ModalStation` 是命令式弹层的渲染容器
- 未使用 `Provider` 时，命令式 API 会自动挂载全局 Provider

## 命令式 API 工厂

`createModalAPI` 将声明式组件转为命令式 API：

```tsx
import { createModalAPI, MyComponent } from '@fexd/mobile'

const showMyComponent = createModalAPI(MyComponent, {
  shareMask: true,
  onConflict: modalConflict.handlers.hidden,
})
```

`createUseModalAPI` 将命令式 API 转为 Hook：

```tsx
import { createUseModalAPI } from '@fexd/mobile'
const useShowMyComponent = createUseModalAPI(showMyComponent)
```

## 独立命令式反馈

| API     | 定位     | 阻断 | 自动消失    | 默认时长 |
| ------- | -------- | ---- | ----------- | -------- |
| toast   | 轻提示   | 否   | 是          | 1800ms   |
| notify  | 通知条   | 否   | 是          | 2600ms   |
| loading | 加载遮罩 | 是   | 需手动 hide | —        |

## 完整交互流程示例

```tsx
import { showDialog, toast, loading } from '@fexd/mobile'

async function handleDelete(id: string) {
  const controller = showDialog({
    title: '确认删除',
    content: '此操作不可撤销',
    actions: [
      {
        content: '删除',
        type: 'danger',
        onClick: () => {
          controller.close()
          performDelete(id)
        },
      },
    ],
  })
}

async function performDelete(id: string) {
  loading.show()
  try {
    await api.delete(id)
    toast.success('删除成功')
  } catch {
    toast.fail('删除失败')
  } finally {
    loading.hide()
  }
}
```

## 相关 reference

- [references/Modal.md](references/Modal.md) — Modal 组件完整 Props
- [references/Modal-advanced.md](references/Modal-advanced.md) — Modal 高级用法
- [references/Modal-design.md](references/Modal-design.md) — Modal 设计与 DOM 结构
- [references/Dialog.md](references/Dialog.md) — Dialog 组件
- [references/Popup.md](references/Popup.md) — Popup 组件
- [references/ActionSheet.md](references/ActionSheet.md) — ActionSheet 组件
- [references/showModal.md](references/showModal.md) — showModal 命令式 API
- [references/showDialog.md](references/showDialog.md) — showDialog 命令式 API
- [references/showPopup.md](references/showPopup.md) — showPopup 命令式 API
- [references/showActionSheet.md](references/showActionSheet.md) — showActionSheet 命令式 API
- [references/toast.md](references/toast.md) — toast 命令式 API
- [references/notify.md](references/notify.md) — notify 命令式 API
- [references/loading.md](references/loading.md) — loading 命令式 API
- [references/modalConflict.md](references/modalConflict.md) — 互斥控制器
- [references/modalStore.md](references/modalStore.md) — 全局弹层状态
- [references/ModalStation.md](references/ModalStation.md) — 命令式弹层渲染容器
- [references/createModalAPI.md](references/createModalAPI.md) — 命令式 API 工厂
- [references/createUseModalAPI.md](references/createUseModalAPI.md) — Hook 工厂
