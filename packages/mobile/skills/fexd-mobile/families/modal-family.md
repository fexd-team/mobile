# Modal 家族

@fexd/mobile 的弹层体系是组件库中最复杂的家族，包含 4 层继承、3 种调用方式、互斥控制、全局状态管理。

## 家族成员一览

| 组件/API               | 层级       | 定位                              | 典型场景                        |
| ---------------------- | ---------- | --------------------------------- | ------------------------------- |
| **Portal**             | 基础层     | DOM 传送门                        | 一般不直接使用                  |
| **Overlay**            | 遮罩层     | 背景蒙层+点击关闭                 | 一般不直接使用                  |
| **BasicModal**         | 弹层基础层 | Portal+Overlay+动画+Store 注册    | 一般不直接使用                  |
| **Modal**              | 弹层完整层 | 互斥控制+shareMask+contentVisible | 自定义富内容弹层                |
| **Dialog**             | 业务弹层   | 居中对话框，标题+按钮             | 确认/取消决策                   |
| **Popup**              | 业务弹层   | 底部弹出面板，标题栏+圆角         | 底部复杂内容                    |
| **ActionSheet**        | 业务弹层   | 底部动作列表                      | 多选项操作                      |
| **showModal**          | 命令式 API | Modal 的命令式封装                | 一次性自定义弹层                |
| **showDialog**         | 命令式 API | Dialog 的命令式封装               | 一次性确认对话                  |
| **showPopup**          | 命令式 API | Popup 的命令式封装                | 一次性底部面板                  |
| **showActionSheet**    | 命令式 API | ActionSheet 的命令式封装          | 一次性操作菜单                  |
| **useShowModal**       | Hook       | showModal 的 Hook 版              | 绑定到特定 ModalStation         |
| **useShowDialog**      | Hook       | showDialog 的 Hook 版             | 绑定到特定 ModalStation         |
| **useShowPopup**       | Hook       | showPopup 的 Hook 版              | 绑定到特定 ModalStation         |
| **useShowActionSheet** | Hook       | showActionSheet 的 Hook 版        | 绑定到特定 ModalStation         |
| **toast**              | 命令式 API | 轻提示                            | 操作反馈，1-2 秒消失            |
| **notify**             | 命令式 API | 通知条                            | 带类型图标的提示                |
| **loading**            | 命令式 API | 加载遮罩                          | 异步操作阻断                    |
| **ModalStation**       | 容器       | 命令式弹层渲染容器                | Provider 已包含，一般不直接使用 |
| **modalConflict**      | 工具       | 互斥处理器                        | 多弹层同时存在                  |
| **modalStore**         | 工具       | 全局弹层状态管理                  | 监听弹层开/关                   |

## 继承关系

```
Portal
  └─ Overlay
     └─ BasicModal（Portal + Overlay + 动画 + modalStore 注册）
        └─ Modal（互斥控制 + shareMask + contentVisible）
           ├─ Dialog（居中 + 标题 + actions 按钮）
           │  └─ showDialog / useShowDialog
           ├─ Popup（底部 + 标题栏 + 圆角）
           │  └─ showPopup / useShowPopup
           └─ ActionSheet（底部 + 动作列表）
              └─ showActionSheet / useShowActionSheet
Modal 直接：
  └─ showModal / useShowModal
独立命令式：
  toast / notify / loading
```

## 选型决策

### 按交互形态选

```
用户需要确认或取消？ → Dialog / showDialog
底部弹出内容面板？ → Popup / showPopup
从列表中选择一个操作？ → ActionSheet / showActionSheet
需要完全自定义内容？ → Modal / showModal
只需轻提示？ → toast
需要带类型图标的通知？ → notify
需要阻断式加载？ → loading
```

### 按调用方式选

```
一次性交互（不需要持久状态）→ showXxx() 命令式
持久存在于页面结构 → <Xxx visible={...}> 声明式
需要绑定到特定容器 → useShowXxx() Hook
```

## 命令式 API 通用模式

所有 `showXxx` 返回统一的控制器：

```tsx
const controller = showXxx({ /* props */ })
controller.close()           // 关闭弹层
controller.update({ ... })   // 更新 props
controller.promise           // Promise<void>，弹层销毁后 resolve
```

### 典型模式：确认 → 操作 → 反馈

```tsx
const controller = showDialog({
  title: '确认删除',
  content: '此操作不可撤销',
  actions: [
    {
      content: '确认',
      onClick: () => {
        controller.close()
        loading.show()
        deleteItem()
          .then(() => toast.success('删除成功'))
          .catch(() => toast.fail('删除失败'))
          .finally(() => loading.hide())
      },
    },
  ],
})
```

## 互斥控制

多个弹层同时打开时，通过 `modalConflict` 处理冲突：

| 处理器                                     | 效果                 |
| ------------------------------------------ | -------------------- |
| `modalConflict.handlers.mask`              | 较低层弹层加内容蒙层 |
| `modalConflict.handlers.hidden`            | 较低层弹层隐藏内容   |
| `modalConflict.handlers.offsetByPlacement` | 较低层弹层偏移       |

`showModal` 默认使用 `hidden` 处理器。

## z-index 层级

通过 `level` 属性控制：

| level   | z-index 基础值 |
| ------- | -------------- |
| low     | 999            |
| normal  | 9,999          |
| high    | 99,999         |
| highest | 999,999        |

## 注意事项

- `loading.show()` 和 `loading.hide()` 必须成对调用（内部引用计数）
- `onClose` 仅表达关闭意图，不会自动改 `visible`
- `modalStore` 事件监听中不要调用 `toast`/`showDialog` 等命令式 API，会导致无限循环
- `Provider` 已包含默认 `ModalStation`，一般无需手动使用 `ModalStation`
- 未使用 `Provider` 时，命令式 API 会自动挂载全局 Provider
