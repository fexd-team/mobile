# ScrollView 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 96.55% |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 100%   |

（命令：`npx jest --coverage --testPathPattern='exports/ScrollView/tests' --collectCoverageFrom='packages/mobile/src/exports/ScrollView/index.tsx'`）

## 测试场景

1. **冒烟**：内容在 `.exd-scroll-view__content` 内。
2. **className / wrapperClassName**：内外层类名分工。
3. **空 children**：内容区仍存在。
4. **ref**：指向内容区滚动容器。
5. **shadow**：`false`、`true`、二元组分别控制上下阴影类；通过 mock 的 `ScrollListener` 配置触发 `onGoingIn` / `onGoingOut`。
6. **动态 distance**：调用 `distance()` 覆盖 `get(scrollHeight/offsetHeight)` 计算分支。
7. **onEndReached / distanceToReachEnd**：传入 `ScrollListener` 并执行回调链。
8. **函数式 children**：接收 `canScrollUp` / `canScrollDown`。
9. **distanceEvents 合并**：自定义项进入配置数组。
10. **外层 props 透传**：`data-*`、`id` 等。

## 评分

- 交互覆盖：4/5（含滚动阴影状态链路与函数子节点）
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明（如有）

- 语句 96.55%（28/29）：剩余 1 条可能为 `useEffect` 内与真实 `ScrollListener` 生命周期相关的语句；本测试通过 `jest.mock('@fexd/tools')` 替换 `ScrollListener`，未在 jsdom 中跑真实滚动监听实现。
