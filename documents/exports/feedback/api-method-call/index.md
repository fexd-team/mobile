---
group:
  title: 反馈
  order: 104

title: 命令式调用
order: 1
---

# 命令式调用（函数式）

根据过往开发经验，大部分反馈场景如弹窗、确认框等，对弹窗存在过程中、数据依赖的变化并不敏感，为一次性的、单向的交互流程

为了省略声明组件、声明 `visible` 状态变量、声明 `onClose` 关闭意图等过程、节约上下翻找代码的动作，mobile 的反馈类组件中，基本都预留了形如 `showXX` 的命令式调用

例如：

<!-- prettier-ignore -->
```jsx | pure
import { showDialog, showModal, showPopup, showActionSheet } from '@fexd/mobile'

showDialog({
  content: '命令式对话框' // 通过 content 属性来设置内容，其余参数与 Dialog API 一致
})

showModal({
  content: '命令式模态框' // 通过 content 属性来设置内容，其余参数与 Modal API 一致
})

showPopup({
  content: '命令式弹出层' // 通过 content 属性来设置内容，其余参数与 Popup API 一致
})

showActionSheet({
  actions: [{ content: '命令式动作面板' }]
})
```

上述反馈组件被设计为既有命令式也有常规的声明式调用，以下反馈组件则仅保留了命令式的调用方式

<!-- prettier-ignore -->
```jsx | pure
import { toast, notify, loading } from '@fexd/mobile'

toast.info('提示，较轻量')
notify.info('通知，稍重一些')
loading.show()
loading.hide()
```

## 手动控制

函数方法一律返回 `{ promise, update, close }` 的控制器结构，方便对命令式弹窗进行控制

### close

用于关闭命令式弹窗

```jsx | pure
const { close } = showDialog({
  content: 'test',
  actions: [
    {
      content: '关闭',
      onClick: close,
    },
  ],
})
```

### update

可用于更新命令式弹窗的参数

```jsx | pure
const { update } = showModal({ content: '111' })
update({ content: '222' })
```

### promise

可以用于异步场景对弹窗进行等待

```jsx | pure
<Button
  loading="auto"
  onClick={async () => {
    await showDialog({ content: 'test' }).promise
  }}
/>
```

### 上下文问题

使用 `<ModalStation />` 来声明函数式弹窗需要渲染在哪儿，以解决上下文问题

具体参考 https://www.zhihu.com/question/357548379/answer/912009203

```jsx | pure
import { ModalStation, showModal } from '@fexd/mobile'

<Provider>
  <ModalStation id="modal-station" />
</Provider>

showModal({
  stationId: 'modal-station',
  content: (
    <Consumer>
      {context => (
        <MyComponent {...context} />
      )}
    </Consumer>
  ),
}})

```

## 演示代码

<code src="./demo/index.tsx" />
