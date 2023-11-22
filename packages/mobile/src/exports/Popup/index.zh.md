---
group:
  title: 反馈
  path: /feedback
---

# Popup 弹出层 <ImportCost name="Popup" />

<!-- prettier-ignore -->
```jsx | pure
import { Popup, showPopup } from '@fexd/mobile'

<Popup visible>声明式</Popup>

showPopup({
  content: '命令式' // 通过 content 属性来设置内容，其余参数与 Popup API 一致
})
```

## API

<!-- | 属性 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- | -->

```tsx | pure
import { ModalProps } from '@fexd/mobile/es/esports/Modal/type'

export interface PopupProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {
  title?: string
  header?: React.ReactNode | (() => React.ReactNode)
  headerRight?: React.ReactNode | (() => React.ReactNode)
  headerLeft?: React.ReactNode | (() => React.ReactNode)
  round?: boolean
}
```

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
