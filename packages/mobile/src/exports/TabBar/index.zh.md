---
group:
  title: 导航
  path: /navigation
---

# TabBar 标签栏 <ImportCost name="TabBar" />

用于 TabBar 布局导航

## 代码演示

<code src="./demos/demo1/index.tsx">
```

## TabBar 属性说明

| 属性     | 说明            | 类型          | 默认值 |
| :------- | :-------------- | :------------ | :----- |
| children | TabBar 子项集合 | TabBar.Item[] | -      |

## TabBar.Item 属性说明

| 属性    | 说明                                              | 类型                | 默认值 |
| :------ | :------------------------------------------------ | :------------------ | :----- |
| name    | 子项名称                                          | string              | -      |
| icon    | 子项图标，当值为 string 时，作用于 Icon.type 相同 | string \| ReactNode | -      |
| active  | 是否处于激活状态                                  | boolean             | false  |
| onClick | 点击事件句柄                                      | function            | -      |
