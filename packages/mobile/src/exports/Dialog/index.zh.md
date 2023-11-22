---
group:
  title: 反馈
  path: /feedback
---

# Dialog 对话框 <ImportCost name="Dialog" />

<!-- prettier-ignore -->
```jsx | pure
import { Dialog, showDialog } from '@fexd/mobile'

<Dialog visible>声明式</Dialog>

showDialog({
  content: '命令式' // 通过 content 属性来设置内容，其余参数与 Dialog API 一致
})
```

## API

<!-- | 属性 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :----- | -->

```tsx | pure
import React from 'react'
import { ModalProps } from '@fexd/mobile/es/exports/Modal/type'
import { BasicButtonProps } from '@fexd/mobile/es/exports/BasicButton/type'

export interface DialogAction extends BasicButtonProps {
  content: React.ReactNode | (() => React.ReactNode)
  onClick?: () => void
}

export type DialogTheme = 'normal' | 'iOS' | 'Android'

export interface DialogProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {
  title?: string // 标题
  theme?: DialogTheme // 风格，有三种：'normal' | 'iOS' | 'Android'
  actions?: DialogAction[] // 动作集
  prefix?: React.ReactNode // 前缀，显示在内容 box 的下方
  suffix?: React.ReactNode // 后缀，显示在内容 box 的下方
  buttonFactory?: React.FC<BasicButtonProps> // 按钮的组件类型，默认是 mobile 的 Button
  buttonType?: BasicButtonProps['type'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['type'])
  buttonSize?: BasicButtonProps['size'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['size'])
  buttonFill?: BasicButtonProps['fill'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['fill'])
  buttonShape?: BasicButtonProps['shape'] | ((theme: DialogTheme, idx: number) => BasicButtonProps['shape'])
}
```

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
