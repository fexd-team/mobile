---
hide: true

group:
  title: 实验性
  path: /experimental
---

# Image 图片 <ImportCost name="Image" />

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Image } from '@fexd/mobile'

<Image />
```

---

## 使用说明

### 基础

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Image } from '@fexd/mobile'

<Image />
```

### 进阶

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Image } from '@fexd/mobile'

<Image />
```

---

## API

| 属性                                    | 说明             | 类型               | 默认值 |
| :-------------------------------------- | :--------------- | :----------------- | :----- |
| <span style="color: red;">\*</span> src | 图片地址         | string             | --     |
| height                                  | 图片高度         | `number \| string` | 100%   |
| width                                   | 图片宽度         | `number \| string` | --     |
| lazy                                    | 是否懒加载       | boolean            | false  |
| alt                                     | 图片描述         | string             | --     |
| proportion                              | 图片尺寸比例     | string（8:2 16:9） | --     |
| onLoad                                  | 加载成功回调事件 | (e) => void        | --     |
| onError                                 | 加载失败回调事件 | (e) => void        | --     |
| onClick                                 | 点击事件         | (e) => void        | --     |

---

## 样式变量

| 变量名        | 说明         | 默认值        |
| :------------ | :----------- | :------------ |
| @image-prefix | 组件样式前缀 | `'exd-image'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
