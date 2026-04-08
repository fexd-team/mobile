# Input 测试概要

`Input` 由 `cloneFC(BasicInput)` 导出，行为与 `BasicInput` 一致；逻辑集中在 `useTextFieldProps` + `useIOControl`。以下覆盖率为 **仅统计 Input 依赖链 index 文件** 的结果（与全仓库 `exports/*/index` 汇总不同，后者包含大量未执行导出，总百分比会偏低）。

## 覆盖率（依赖链定向收集）

在仓库根目录执行：

```bash
npx jest --coverage --testPathPattern='exports/Input/tests' --no-silent \
  --collectCoverageFrom='packages/mobile/src/exports/Input/index.tsx' \
  --collectCoverageFrom='packages/mobile/src/exports/BasicInput/index.tsx' \
  --collectCoverageFrom='packages/mobile/src/exports/cloneFC/index.ts' \
  --collectCoverageFrom='packages/mobile/src/exports/createFC/index.tsx' \
  --collectCoverageFrom='packages/mobile/src/exports/useTextFieldProps/index.ts' \
  --collectCoverageFrom='packages/mobile/src/exports/useIOControl/index.ts'
```

| 指标       | 值    |
| ---------- | ----- |
| Statements | 100%  |
| Branches   | 93.1% |
| Functions  | 100%  |
| Lines      | 100%  |

### 分文件（同上命令）

| 文件                         | Statements | Branches | Functions | Lines |
| ---------------------------- | ---------- | -------- | --------- | ----- |
| `Input/index.tsx`            | 100%       | 100%     | 100%      | 100%  |
| `BasicInput/index.tsx`       | 100%       | 100%     | 100%      | 100%  |
| `useIOControl/index.ts`      | 100%       | 100%     | 100%      | 100%  |
| `useTextFieldProps/index.ts` | 100%       | 93.75%   | 100%      | 100%  |
| `createFC/index.tsx`         | 100%       | 100%     | 100%      | 100%  |
| `cloneFC/index.ts`           | 100%       | 66.66%   | 100%      | 100%  |

上述依赖链 **汇总** 已满足：Statements ≥ 90%、Branches ≥ 85%。

## 测试场景

1. **冒烟**：默认渲染存在 `input`。
2. **DOM 属性**：`placeholder`、`className`、`type`、`maxLength`、`readOnly`、`disabled` 透传。
3. **`type="password"`**：通过 `input[type="password"]` 访问。
4. **用户输入**：`userEvent.type` → `onChange` 参数为字符串。
5. **焦点**：点击聚焦 → `onFocus`，Tab 失焦 → `onBlur`。
6. **受控**：`value` + `onChange` 联动。
7. **非受控**：`defaultValue` 初始化并继续输入。
8. **`filterIOValue`**：返回 `false` 时拒绝写入。
9. **`normalize` + `normalizeTrigger=onChange`**：输入过程中归一化。
10. **`normalizeTrigger=onBlur`**：失焦时归一化。
11. **`format`**：展示格式化。
12. **边界**：`value` 为 `null` / 仅 `undefined`；`defaultValue` 为 `null`。
13. **`ref`**：转发到原生 `input`。
14. **`identity`**：显式调用以覆盖默认归一化工具。
15. **扩展说明**：`Input` 类型上无 `clearable` / `prefix` / `suffix`（见 `CellInput` / `LineInput` / `UnstyledIOInput`）；用 `data-*` 验证透传。
16. **`createFC`**：`render.length < 2` 修补分支。
17. **`cloneFC`**：源无 `defaultProps`；源 `defaultProps === null`。
18. **`useTextFieldProps`**：`noFormat: true` 分支；`onChange` 非字符串走 `nativeEvent.text`。

## 评分

- 交互覆盖：5/5（`userEvent` 输入、聚焦、Tab 失焦、多步场景）
- 分支覆盖：5/5（受控/非受控、`normalizeTrigger`、`filterIOValue`、`noFormat`、依赖链补充）
- 边界处理：5/5（null/undefined、`filterIOValue` 拒绝）
- 场景真实度：4/5（含测试桥接组件以覆盖 hook 内部路径，与纯黑盒略有混合）
- 综合评分：19/20

## 未覆盖说明

- **`cloneFC/index.ts` 第 8 行 `|| {}` 的一支**：在现有 `createFC` 实现下，克隆体内联 `defaultProps` 恒为 `{}`（真值），该备选在运行中不可达。
- **`useTextFieldProps` 第 123 行 `value ?? ''` 的一支**：先判断 `!value` 已提前返回 `''`，进入 `format(String(value ?? ''))` 时 `value` 已非 nullish，`?? ''` 的「取右侧」分支在逻辑上不可达。

## 备注

- 使用默认 `collectCoverageFrom`（全 `exports/*/index`）时，Jest 会为未加载模块显示 0%，**总表 Statements/Branches 会远低于本文件所列**；评估 Input 相关测试请以上述定向命令为准。
- 渲染时可能出现 React 对「同时存在受控 `value` 与用户 `defaultValue`」的警告，来自 `useTextFieldProps` 将二者一并展开到原生 `input` 的实现，与测试断言无关。
