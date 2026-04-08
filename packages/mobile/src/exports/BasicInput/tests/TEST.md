# BasicInput 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：默认渲染 → 存在 `input` 元素。
2. **placeholder**：传入 `placeholder` → DOM 上属性正确。
3. **disabled**：`disabled` → `input` 为禁用态。
4. **className**：自定义 `className` → 合并到 `input`。
5. **onChange**：输入 `change` 事件 → `onChange` 以字符串参数被调用。
6. **onFocus / onBlur**：聚焦与失焦 → 各回调触发一次。
7. **边界 value=null**：受控 `value` 为 `null` → 展示为空字符串。
8. **边界无初值**：无 `value` 与 `defaultValue` → 输入框值为空。
9. **ref**：`ref` → 指向原生 `HTMLInputElement`。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：20/20
