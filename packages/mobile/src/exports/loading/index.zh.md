---
group:
  title: 反馈
  path: /feedback

mobileDemoFixed: false
---

# loading 加载中 <ImportCost name="loading" />

<!-- prettier-ignore -->
```jsx | pure
import { loading } from '@fexd/mobile'

loading.show(config?: LoadingMethodConfig)
loading.hide(forceClose?: boolean)
```

**注意：show 调用为计数制，一个 show 一定需要有一个与之对应的 hide 方法**

也就是说，show 多少次，就需要 hide 多少次

此设计的目的是各个需要 loading 的场景只关心自己的状态，最终 loading 是否显示或消失，取决于计数是否清零

通过 `loading.hide(true)` 来强制清零关闭

---

## 效果演示

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />

---

## LoadingMethodConfig

<API identifier="LoadingMethodConfig" hideTitle src="./type.tsx" exports='["DOC_PureLoadingMethodConfig"]'></API>

---
