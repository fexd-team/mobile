# Dialog 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 94.11% |
| Functions  | 100%   |
| Lines      | 100%   |

验证命令：

`npx jest --coverage --testPathPattern='exports/Dialog/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Dialog/index.tsx'`

## 测试场景

1. **冒烟**：`.exd-dialog-modal`、`.exd-dialog-content`；visible false。
2. **title 有无**：有标题节点 / 无 `title` 时不渲染 `h3`。
3. **prefix / suffix**：区域文案。
4. **theme**：`iOS`、`Android` 主题类名。
5. **actions**：单按钮横向区；双按钮 `exd-dialog-actions-vertical`；默认 `onClose` vs 自定义 `onClick`；`content` 为函数；`className` 合并。
6. **buttonFactory**：自定义按钮组件。
7. **Modal 透传**：`maskClosable` 点遮罩、`className`、`modalId`、受控 `onExited`。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明（如有）

- 分支 94.11%：与 `actions?.length == 2`、主题相关回调等组合在 Istanbul 上的细分；主要路径均已覆盖。
