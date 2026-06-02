# Layout 家族

@fexd/mobile 的布局组件覆盖列表、间距、网格、滚动等场景。

## 家族成员

| 组件           | 定位               | 子组件        | 典型场景                       |
| -------------- | ------------------ | ------------- | ------------------------------ |
| **Cell**       | 列表单元格         | Cell.Group    | 设置页/信息展示页              |
| **Collapse**   | 折叠面板           | Collapse.Item | FAQ/分组折叠                   |
| **Divider**    | 分割线             | —             | 内容分隔                       |
| **Grid**       | 宫格布局           | Grid.Item     | 功能入口/图标网格              |
| **ScrollView** | 滚动容器           | —             | 下拉刷新/无限滚动              |
| **Space**      | 间距容器           | —             | 组件间统一间距                 |
| **Watermark**  | 水印               | —             | 页面水印                       |
| **Flex**       | 栅格布局（实验性） | Flex.Item     | 12 栅格 + 响应式               |
| **View**       | 基础容器（实验性） | —             | 自带 display:flex + box-sizing |

## 选型决策

### 列表/设置页

```
设置页/信息展示 → Cell + Cell.Group
可折叠分组 → Collapse + Collapse.Item
```

### 间距与排列

```
组件间统一间距 → Space
栅格布局 → Flex + Flex.Item（实验性，API 可能变化）
图标/功能入口网格 → Grid + Grid.Item
```

### 滚动

```
简单滚动 → 原生 overflow
下拉刷新/无限滚动 → ScrollView
```

### 分隔

```
内容区块分隔 → Divider
列表项分隔 → Cell 自带（Cell.Group 内有分割线）
```

### 容器

```
需要 display:flex + box-sizing → View（实验性）
普通容器 → div
```

## 常见错误

| 错误                  | 正确                                           |
| --------------------- | ---------------------------------------------- |
| 手写 div 做列表单元格 | 用 Cell                                        |
| 手写 CSS Grid 做宫格  | 用 Grid + Grid.Item                            |
| 用 List 组件          | List 开发中，不可用，用 Cell.Group 或 map 渲染 |
