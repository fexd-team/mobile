---
hide: true

group:
  title: 开发中
  path: /developing
---

# Card 卡片 <ImportCost name="Card" />

通用卡片容器。

## 属性说明

| 属性        | 说明                       | 类型          | 默认值 | 提供的值 |
| :---------- | :------------------------- | :------------ | :----- | :------- |
| title       | 卡片的主标题               | string \| JSX | -      | -        |
| titleExtra  | 卡片右上角的操作区域       | string \| JSX | -      | -        |
| footer      | 卡片的底部                 | string \| JSX | -      | -        |
| footerExtra | 卡片右下角的操作区域       | string \| JSX | -      | -        |
| after       | 卡片之外下半部分衔接的区域 | string \| JSX | -      | -        |

---

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式：

| 变量名                      | 说明               | 默认值                   |
| :-------------------------- | :----------------- | :----------------------- |
| `@card-prefix`              | 组件样式前缀       | `'exd-card'`             |
| `@card-margin-y`            | 垂直外边距         | `12px`                   |
| `@card-padding-x`           | 水平内边距         | `16px`                   |
| `@card-border-radius`       | 圆角               | `4px`                    |
| `@card-border-color`        | 边框颜色           | `rgba(235, 235, 235, 1)` |
| `@card-background`          | 背景色             | `#fff`                   |
| `@card-main-padding-top`    | 主体区域顶部内边距 | `20px`                   |
| `@card-main-padding-x`      | 主体区域水平内边距 | `12px`                   |
| `@card-main-padding-bottom` | 主体区域底部内边距 | `10px`                   |
| `@card-title-font-size`     | 标题字体大小       | `13px`                   |
| `@card-title-color`         | 标题颜色           | `#333`                   |
| `@card-extra-margin-left`   | 额外区域左外边距   | `10px`                   |
| `@card-footer-border-color` | 底部边框颜色       | `#f4f4f4`                |
| `@card-footer-padding-y`    | 底部垂直内边距     | `10px`                   |
| `@card-content-padding-y`   | 内容垂直内边距     | `10px`                   |
| `@card-content-font-size`   | 内容字体大小       | `11px`                   |
| `@size-scale`               | 全局尺寸缩放比例   | `1`                      |

## 代码演示

<code src="./demos/demo1/index.tsx" />
