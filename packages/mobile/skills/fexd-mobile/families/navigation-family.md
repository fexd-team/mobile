# Navigation 家族

@fexd/mobile 的导航组件覆盖顶部导航栏、底部标签栏和页内选项卡。

## 家族成员

| 组件       | 定位       | 子组件      | 典型场景               |
| ---------- | ---------- | ----------- | ---------------------- |
| **NavBar** | 顶部导航栏 | —           | 页面顶部标题+返回+操作 |
| **TabBar** | 底部标签栏 | TabBar.Item | 主导航底部标签切换     |
| **Tabs**   | 页内选项卡 | Tabs.Item   | 页内内容切换           |

## 选型决策

```
页面顶部标题栏 → NavBar
App 底部主导航 → TabBar + TabBar.Item
页内内容分区切换 → Tabs
```

## 使用方式

### NavBar

```tsx
import { NavBar } from '@fexd/mobile'
;<NavBar title="页面标题" onLeftClick={() => history.back()} />
```

### TabBar

```tsx
import { TabBar } from '@fexd/mobile'
;<TabBar>
  <TabBar.Item title="首页" icon={<Iconfont type="home" />} />
  <TabBar.Item title="发现" icon={<Iconfont type="discover" />} />
  <TabBar.Item title="我的" icon={<Iconfont type="user" />} />
</TabBar>
```

### Tabs（数据驱动）

```tsx
import { Tabs } from '@fexd/mobile'
;<Tabs
  data={[
    { label: '标签一', value: '1' },
    { label: '标签二', value: '2' },
  ]}
  value={active}
  onChange={setActive}
/>
```

## 常见错误

| 错误                           | 正确                                     |
| ------------------------------ | ---------------------------------------- |
| 用 Footer 做底部导航           | Footer 开发中，不可用，用 TabBar         |
| 用 SegmentedControl 做页内切换 | SegmentedControl 开发中，不可用，用 Tabs |
| Tabs 用 children 声明子项      | Tabs 是数据驱动的，传 data 数组          |
