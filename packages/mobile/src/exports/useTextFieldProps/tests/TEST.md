# useTextFieldProps 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 93.75% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **`identity` / `defaultProps`** 导出断言。
2. **onChange**：字符串、`normalizeTrigger: 'onChange'`、`nativeEvent.text`。
3. **format**、空值展示 `''`。
4. **onFocus / onBlur**：`focused` 与透传；`normalizeTrigger: 'onBlur'`。
5. **`noFormat`**：内部 identity 与返回体附带原始 `format`/`normalize`。
6. **ref**：`useImperativeHandle` 与真实 `<input {...} />`（剥离 `focused` 避免非法 DOM 属性）。
7. **受控**：`value` + `onChange`；**truthy 非字符串 value** 走 `format(String(value ?? ''))`。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5（93.75%，满足 ≥85%）
- 边界处理：5/5
- 场景真实度：4/5
- 综合评分：18/20

## 未覆盖说明

- 余下约 **6.25%** 分支来自 `value: !value ? '' : format(String(value ?? ''))` 中与 `?? ''` 相关的仪器化细分，对业务行为无额外差异。
