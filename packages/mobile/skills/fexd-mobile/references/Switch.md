---
name: Switch
description: 在两态之间切换，常用于设置项。
---

# Switch 开关

在两态之间切换，常用于设置项。

```tsx
import { Switch } from '@fexd/mobile'
;<Switch />
```

## 基础用法

```tsx
import { useState } from 'react'
import { Switch } from '@fexd/mobile'

function ControlledSwitch() {
  const [checked, setChecked] = useState(true)
  return <Switch checked={checked} onChange={setChecked} />
}
```

示例见 `packages/mobile/src/exports/Switch/demos/demo1/index.tsx`。

## Props

`SwitchProps`（`packages/mobile/src/exports/Switch/type.tsx`）扩展 `Omit<HTMLJSXProps<HTMLLabelElement>, 'defaultValue' | 'onChange'>`。

| 属性     | 说明     | 类型                                                       |
| :------- | :------- | :--------------------------------------------------------- |
| checked  | 是否选中 | `boolean`                                                  |
| onChange | 状态变化 | `(checked: boolean) => void`                               |
| children | 子节点   | `React.ReactNode`                                          |
| ref      | 引用     | `React.Ref<SwitchRef>`（`SwitchRef` = `HTMLLabelElement`） |

另含 `label` 元素上除 `defaultValue`、`onChange` 外允许的原生 / React 属性。

## 样式变量

样式源码：`packages/mobile/src/exports/Switch/style.less`。`SwitchStyleVars`（`DOC_SwitchStyleVars`）：`@switch-prefix`、`@switch-size-scale`、`@switch-width`、`@switch-height`、`@switch-border-radius`、`@switch-background-color`、`@switch-active-color`、`@switch-thumb-size`、`@switch-thumb-color`、`@switch-thumb-offset`、`@switch-thumb-translate`、`@switch-transition-duration`。

<!--
Source:
- packages/mobile/src/exports/Switch/type.tsx
- packages/mobile/src/exports/Switch/index.zh.md
- packages/mobile/src/exports/Switch/index.tsx
- packages/mobile/src/exports/Switch/demos/
- packages/mobile/src/exports/Switch/style.less
-->
