# ErrorBoundary 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **正常子树**：无错误时 → 直接渲染 `children`。
2. **函数 fallback + onError**：子组件抛错 → 展示自定义 fallback、`onError` 收到 `Error`。
3. **retry**：函数 fallback 中调用 `retry` 且子树恢复 → 重新渲染正常内容。
4. **默认 fallback**：无自定义 fallback → 展示默认错误文案与英文 Retry 按钮。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- 综合评分：18/20
