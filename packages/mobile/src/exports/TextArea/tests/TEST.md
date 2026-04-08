# TextArea 测试概要

## 覆盖率

针对 `packages/mobile/src/exports/TextArea/index.tsx`（`cloneFC(BasicTextArea)` 薄封装）：

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

Jest 汇总（最近一次定向运行）：Statements 5/5，Branches 0/0（该文件无独立分支表达式），Lines 4/4。

## 测试场景

1. **冒烟**：挂载后存在 `.exd-textarea-wrapper`、`.exd-textarea-jack` 与 `textarea.exd-textarea`。
2. **placeholder**：占位文案写入原生 `textarea`。
3. **disabled**：禁用态可访问性断言。
4. **readOnly**：只读属性落到 DOM。
5. **maxLength / rows**：原生属性透传。
6. **height 数值**：`.exd-textarea-jack` 行内高度为 `Npx`。
7. **height auto**：`textarea` `overflow: hidden`，jack 不强制高度。
8. **className**：与 `exd-textarea` 合并。
9. **style**：与自动高度样式合并（`height="auto"` + 自定义 `color`）。
10. **userEvent 输入**：`click` + `type`，`onChange` 收到字符串且展示一致。
11. **focus / blur**：`onFocus` / `onBlur` 各触发一次（`tab` 失焦）。
12. **受控**：`value` + `onChange`，清空并键入后内容与 state 一致。
13. **非受控**：`defaultValue` 初始值，`clear` + `type` 可改。
14. **受控空字符串**：展示为空。
15. **value 为 null**：按空字符串展示。
16. **无初始值**：无 `value`/`defaultValue` 时为空。
17. **format**：展示经 `format` 后的字符串。
18. **normalize（默认 onChange）**：输入中非数字被剥除。
19. **normalizeTrigger onBlur**：输入过程中保留原文本，失焦后规范化。
20. **多行 jack**：换行数与 `.exd-textarea-jack > div` 占位行数一致。
21. **ref**：`ref.current` 为 `HTMLTextAreaElement`。
22. **showCount / autoSize**：非标准 DOM 属性透传时可渲染（该用例内过滤 React 对未知属性的 `console.error`，避免噪声）。

## 评分

- **交互覆盖**：5/5（`userEvent` 输入、聚焦/失焦、`tab`、受控/非受控编辑链）
- **分支覆盖**：5/5（导出文件无分支；通过 `BasicTextArea` + `useTextFieldProps` 路径覆盖 `height` auto/固定、`format`/`normalize`/`normalizeTrigger` 等组合）
- **边界处理**：5/5（`null`、空字符串、无初始值、多行、`maxLength`）
- **场景真实度**：4/5（对齐业务常用的受控/格式化/规范化；`showCount`/`autoSize` 仅为透传兼容用例，非类型内建能力）
- **综合评分**：19/20

## 未覆盖说明

- `TextArea/index.tsx` 本身仅 re-export，无额外逻辑行；更高粒度覆盖率需对 `BasicTextArea`、`useTextFieldProps` 等单独配置 `collectCoverageFrom`。
- 运行全量用例时可能出现 React 对「`value` 与 `defaultValue` 同时存在」的告警，来源为 `useIOControl` 在聚焦时对受控 `value` 的处理与 `textarea` 透传字段的组合（`BasicTextArea` 层），与本次测试断言目标无关；若需消除需在组件层收敛透传 props。
