# BlockInput 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/BlockInput/index.tsx`（`npx jest --coverage --testPathPattern='exports/BlockInput/tests' --collectCoverageFrom='packages/mobile/src/exports/BlockInput/index.tsx'`）。

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **默认渲染**：挂载 `defaultValue=""` → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-block-input` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 展示区域出现 `.my-custom`。

## 评分

- 交互覆盖：2/5（仅 render，无输入/点击链）
- 分支覆盖：4/5（薄封装语句全覆盖，无独立业务分支）
- 边界处理：2/5（未测空值以外边界）
- 场景真实度：3/5（冒烟 + 样式契约，贴近「换肤输入」但偏薄）
- 综合评分：11/20
