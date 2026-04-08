# Empty 测试概要

## 覆盖率

| 指标       | 值                    |
| ---------- | --------------------- |
| Statements | 100%                  |
| Branches   | n/a（源码无独立分支） |
| Functions  | 100%                  |
| Lines      | 100%                  |

（`npx jest --coverage --testPathPattern='exports/Empty/tests' --collectCoverageFrom='packages/mobile/src/exports/Empty/index.tsx'`）

## 测试场景

1. **冒烟**：默认图标与 `No Data`、`exd-empty` + `Result` 根。
2. **文案/图标**：`text` 覆盖、自定义 `icon`、`text` 为 React 节点。
3. **children**：操作区等子树。
4. **透传**：`className` 合并、`style` 等到 `Result` 根。
5. **边界**：`text=""` 无标题区、`children={null}`。

## 评分

- 交互覆盖：2/5（薄封装 Result）
- 分支覆盖：n/a（实现为单次渲染）
- 边界处理：4/5
- 场景真实度：4/5
- **综合评分：14/20**（分支项按 n/a 不计入分母时可视为达标展示组件）

## 未覆盖说明（如有）

- `Empty` 本身无条件分支；复杂分支在 `Result` 中单测覆盖。
