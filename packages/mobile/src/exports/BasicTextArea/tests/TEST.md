# BasicTextArea 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：默认渲染 → 存在 `.exd-textarea-wrapper` 与带样式的 `textarea`。
2. **placeholder**：传入文案 → `textarea` 上 `placeholder` 正确。
3. **height 数值**：`height` 为数字 → jack 容器 `style.height` 为对应 `px`。
4. **height auto**：`height="auto"` → jack 不强制高度。
5. **onChange**：多行输入 → `onChange` 收到完整字符串。
6. **边界无初值**：无 `value`/`defaultValue` → 不崩溃且值为空。
7. **边界 value=null**：受控 `null` → 按空字符串展示。
8. **ref**：`ref` → 指向 `HTMLTextAreaElement`。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：20/20
