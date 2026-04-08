# Divider 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/Divider/tests' --collectCoverageFrom='packages/mobile/src/exports/Divider/index.tsx'`）

## 测试场景

1. **冒烟**：水平分割线、带文案。
2. **方向**：`vertical` 为 `span`、水平为 `div`、垂直忽略 children。
3. **run(children)**：children 为函数时的渲染。
4. **透传**：水平/垂直 `className`、`data-*`、`role`。
5. **边界**：无 children、`null`、`false` 不渲染文本区。
6. **ref**：水平 `div`、垂直 `span`。

## 评分

- 交互覆盖：2/5（纯展示）
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- **综合评分：16/20**

## 未覆盖说明（如有）

无。
