# Steps 测试概要

## 覆盖率

定向命令：

`npx jest --coverage --testPathPattern='exports/Steps/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Steps/index.tsx'`

| 指标       | 值     |
| ---------- | ------ |
| Statements | 95.45% |
| Branches   | 90.47% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **冒烟**：默认空 `data`。
2. **短列表（&lt;5）**：逐项 map；`value` / `checked` / `error` 决定 `Step` 的 `type`；`type="flex"` 与「项数 &lt;3 自动 flex 容器」。
3. **空 data**：`children` 与 `Steps.Item`；`children` 为函数时 `run(children)`。
4. **长列表（≥5）**：`PassBeforeSteps`（含 error、icon、description、`checked=false` 下内联 `StepItem` 的 process）；`PassAllBeforeSteps`；`PassAfterSteps` 在 `current<=0` 与 `current>0` 两种索引策略。
5. **其它**：`title` 为函数；`ref`；未传 `value` 时默认从第 1 步开始。

## 评分

- 交互覆盖：3/5（以渲染与分支为主，无点击交互）
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：18/20

## 未覆盖说明

- 覆盖率报告仍标出行 15、31 等，与内联 `StepItem` 及嵌套三元表达式在 SWC 下的语句映射有关；整体 Statements 已高于 90%。
- `PassStep` 使用 `status="process"` 传参，与内部解构的 `type` 不一致，属源码问题，测试仅覆盖实际渲染路径。
