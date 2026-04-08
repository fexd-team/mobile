# Tabs 测试概要

## 覆盖率

定向命令：

`npx jest --coverage --testPathPattern='exports/Tabs/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Tabs/index.tsx'`

| 指标       | 值     |
| ---------- | ------ |
| Statements | 98.46% |
| Branches   | 87.5%  |
| Functions  | 100%   |
| Lines      | 98.41% |

## 测试场景

1. **冒烟**：三列 options + defaultValue 渲染根与文案。
2. **布局**：`display` flex/scroll；选项多于 3 且未指定 `display` 时默认 scroll；`data` 与 `options` 等价。
3. **展示**：`className`、`ellipsis`、icon 为节点或函数。
4. **交互**：`userEvent` 点击切换；`onChange`；禁用项不触发且带 disabled 样式。
5. **受控/非受控**：`defaultValue`、受控 `value` + `onChange`。
6. **边界**：无匹配 `value` 时无 active 且指示条隐藏类。
7. **指示器与定时**：假计时器配合首次 `delay(300)` 路径。
8. **滚动区**：对 `.exd-tabs--scroll__overflow` 注入 `scrollTo` 与尺寸，覆盖 `scrollLeft` 各分支。

## 评分

- 交互覆盖：5/5（点击 + 假计时 + 滚动分支）
- 分支覆盖：4/5（`onTabItemClick` 中与 `currentIndex` 比较的去重分支因闭包未更新，源码 55 行实际不可达）
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明

- 行 55：`index === currentIndex` 早退；`useCallback` 依赖为空导致 `currentIndex` 恒为初始闭包值，该分支在运行时难以触发。
