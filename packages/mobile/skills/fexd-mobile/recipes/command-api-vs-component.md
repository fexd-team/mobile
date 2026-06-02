# 命令式 API vs 声明式组件 vs Hook

@fexd/mobile 的弹层和反馈组件提供三种调用方式。本 recipe 解决"该用哪种方式"。

## 三种方式对比

|          | 命令式 `showXxx()`            | 声明式 `<Xxx visible>`        | Hook `useShowXxx()`              |
| -------- | ----------------------------- | ----------------------------- | -------------------------------- |
| 调用方式 | 函数调用，随时随地            | JSX 渲染，依赖 React 生命周期 | Hook 调用，绑定组件作用域        |
| 状态管理 | 无需管理 visible              | 需要 useState 管理 visible    | 无需管理 visible                 |
| 挂载容器 | 全局 Provider 的 ModalStation | 组件所在 DOM 位置             | 返回 stationNode，渲染到指定位置 |
| 更新内容 | `controller.update()`         | 修改 props                    | `controller.update()`            |
| 适用场景 | 一次性交互                    | 持久弹层                      | 需要指定容器                     |

## 默认选命令式

大多数场景选命令式：

```tsx
showDialog({ title: '确认', content: '确定？', actions: [...] })
showPopup({ title: '筛选', content: <FilterPanel /> })
showActionSheet({ actions: [...] })
showModal({ content: <CustomContent /> })
toast.success('操作成功')
notify.warning('注意')
loading.show()
```

优点：

- 不需要 useState 管理 visible
- 可以在事件处理、Promise 回调等任何地方调用
- 代码更简洁

## 选声明式的场景

以下情况用声明式 `<Xxx visible={...}>`：

1. **弹层需要持久存在**，跟随组件生命周期频繁开关
2. **弹层内容依赖组件状态**，频繁变化
3. **需要精细控制动画生命周期**（onEnter/onExit 等）

```tsx
const [visible, setVisible] = useState(false)
;<Dialog
  visible={visible}
  onClose={() => setVisible(false)}
  onEnter={() => console.log('进入动画开始')}
  onExited={() => console.log('退出动画结束')}
>
  内容
</Dialog>
```

## 选 Hook 的场景

以下情况用 `useShowXxx()`：

1. **需要绑定到特定 ModalStation**（如局部容器而非全局）
2. **弹层需要在特定 DOM 节点下渲染**（如 iframe 内、特定容器内）

```tsx
const [showDialog, stationNode] = useShowDialog()

return (
  <div ref={containerRef}>
    <Button onClick={() => showDialog({ content: '在局部容器内弹窗' })}>弹窗</Button>
    {stationNode}
  </div>
)
```

**注意**：`stationNode` 必须渲染到 JSX 中，否则弹层无处挂载。

## 命令式 API 的 controller

所有 `showXxx` 返回统一的控制器：

```tsx
const controller = showDialog({ ... })

controller.close()           // 关闭弹层
controller.update({ ... })   // 更新弹层 props
controller.promise           // Promise<void>，弹层销毁后 resolve
```

### 异步等待弹层关闭

```tsx
await showDialog({ content: '提示' }).promise
// 弹层关闭后继续执行
```

### 动态更新弹层内容

```tsx
const controller = showDialog({
  content: '处理中...',
  actions: [],
})

const result = await doSomething()
controller.update({
  content: '处理完成',
  actions: [{ content: '确定', onClick: () => controller.close() }],
})
```

## 命令式 API 的底层工厂

| 工厂                                | 用途                       |
| ----------------------------------- | -------------------------- |
| `createModalAPI(Component, config)` | 将声明式组件转为命令式 API |
| `createUseModalAPI(showXxx)`        | 将命令式 API 转为 Hook     |

构建自定义弹层组件时可以使用这些工厂。

## 反馈类 API 只有命令式

`toast`、`notify`、`loading` 没有声明式和 Hook 版本，只能命令式调用：

```tsx
toast.info('提示')
toast.success('成功')
toast.warn('警告')
toast.fail('失败')

notify.info('通知')
notify.success('成功')
notify.warning('警告')
notify.error('错误')

loading.show()
loading.hide()
```

## 常见错误

| 错误                                   | 正确                               |
| -------------------------------------- | ---------------------------------- |
| 一次性弹层用声明式 + useState          | 用命令式 `showXxx()`               |
| 需要局部容器但用全局 `showXxx()`       | 用 `useShowXxx()` + stationNode    |
| `toast` 用声明式                       | toast 只有命令式 API               |
| 忘记渲染 `stationNode`                 | Hook 的 stationNode 必须渲染到 JSX |
| `loading.show()` 后不 `loading.hide()` | 必须成对调用                       |
