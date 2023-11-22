---
group:
  title: 输入
  path: /data
---

# Switch 开关 <ImportCost name="Switch" />

开关用于两个状态之间的切换。

<!-- prettier-ignore -->
```jsx | pure
import { Switch } from '@fexd/mobile'

<Switch/>
```

## API

| 属性     | 说明                         | 类型                         | 默认值  |
| :------- | :--------------------------- | :--------------------------- | :------ |
| checked  | 是否选中                     | `boolean`                    | `false` |
| onChange | 当值发生改变时触发的回调函数 | `(checked: boolean) => void` | -       |

## 演示代码

<!-- ### 预览 -->
<code src="./demos/demo1/index.tsx" />
