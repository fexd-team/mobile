# TabBar 测试概要

## 覆盖率

定向命令：

`npx jest --coverage --testPathPattern='exports/TabBar/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/TabBar/index.tsx'`

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：`TabBar` + `TabBar.Item` 渲染。
2. **子项**：多 name；icon 为 React 节点或 **字符串**（走 `Iconfont`）。
3. **样式**：根 `className`；Item `active`；透传 `data-testid` 等 div 属性。
4. **交互**：`userEvent` 点击 `onClick`；父组件状态切换模拟底部栏选中。
5. **受控**：仅由外部 `active` props 切换。
6. **边界**：无子项；`Item` 单独渲染。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5（根 `index.tsx` 极薄，Item 逻辑在 `Item/index.tsx`）
- 边界处理：4/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明

- 覆盖率仅收集 `TabBar/index.tsx`；`TabBar.Item` 的完整分支见 `Item/index.tsx`（未纳入本报告）。
