# Grid 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（命令：`npx jest --coverage --testPathPattern='exports/Grid/tests' --collectCoverageFrom='packages/mobile/src/exports/Grid/index.tsx'`）

## 测试场景

1. **冒烟**：`Grid` + `Grid.Item` 渲染与文案展示。
2. **columns**：`flexBasis` 为 `100/columns%`。
3. **gutter**：水平 `paddingLeft`；`border` 与 `gutter` 组合下的 `line-top` / `line` 类。
4. **flex gap**：`jest.mock` 替换 `detectFlexGapSupported`，分别验证 `rowGap` 设置与跳过。
5. **vertical / border / square**：修饰类与 Item 方格样式。
6. **restProps / className / ref**：透传与 ref 转发。
7. **边界**：无子项、单子项。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5（含 flex-gap 探测分支）
- 边界处理：5/5
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明（如有）

无（当前 `index.tsx` 全覆盖）。
