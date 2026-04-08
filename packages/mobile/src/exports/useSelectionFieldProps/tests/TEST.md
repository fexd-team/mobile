# useSelectionFieldProps 测试概要

## 覆盖率

（`jest --collectCoverageFrom=packages/mobile/src/exports/useSelectionFieldProps/index.ts`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **默认值**：`defaultValue` 与 `value` / `insideValue` / `selecting` 初始一致。
2. **selecting**：`setSelecting` 切换挑选态。
3. **同步**：非挑选态下受控 `value` 变化会同步 `insideValue`。
4. **隔离**：挑选态下外部 `value` 变化不覆盖用户正在编辑的 `insideValue`。

## 评分

- 交互覆盖：4/5（hook + 状态，无真实点击）
- 分支覆盖：5/5（`useEffect` 中 `selectingRef` 分支均覆盖）
- 边界处理：5/5（受控 + 挑选态组合）
- 场景真实度：5/5（贴合选择类字段编辑流程）
- **综合评分：19/20**

## 未覆盖说明

无。
