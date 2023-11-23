---
hide: true

group:
  title: 实验性
  path: /experimental
---

# Tips 提示 <ImportCost name="Tips" />

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Tips } from '@fexd/mobile'

<Tips />
```

---

## 使用说明

### 基础

<!-- prettier-ignore -->
```jsx | pure
import { Tips } from '@fexd/mobile'
import { Button } from '@fexd/mobile'

<Tips title="提示">
  <Button>按钮</Button>
</Tips>
```

### 进阶

<!-- prettier-ignore -->
```jsx | pure
import { Tips } from '@fexd/mobile'
import { Button } from '@fexd/mobile'

const onVisibleChange = visible => {
  console.log(visible)
}

<Tips
  title="提示"
  theme="white"
  placement="top"
  modal
  onVisibleChange={onVisibleChange}
>
  <Button>按钮</Button>
</Tips>
```

---

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| <span style="color: red;">\*</span> title | tips 的内容 | ReactNode \| () => ReactNode | - |
| visible | 受控显示\/隐藏 tips | boolean | false |
| placement | 受控显示\/隐藏 tips | string | topLeft ['topLeft', 'top', 'topRight', 'rightTop', 'right', 'rightBottom', 'leftTop', 'left', 'leftBottom', 'bottomLeft', 'bottom', 'bottomRight'] |
| <span style="color: red;">\*</span> children | 插槽 内容 | ReactNode | - |
| zIndex | 显示层级 | number | - |
| theme | 主题 | string | black ['black', 'white'] |
| modal | 是否显示遮罩层 | boolean | false |
| onVisibleChange | 显示\/隐藏回调函数 | (visible: boolean) => void | - |

---

## 样式变量

| 变量名       | 说明         | 默认值      |
| :----------- | :----------- | :---------- |
| @tips-prefix | 组件样式前缀 | `'exd-tips'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
