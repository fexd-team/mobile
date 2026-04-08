# UnstyledIOTimePicker 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/UnstyledIOTimePicker/index.tsx`。

| 指标       | 值     |
| ---------- | ------ |
| Statements | 92.85% |
| Branches   | 100%   |
| Functions  | 80%    |
| Lines      | 92.59% |

## 测试场景

1. **默认渲染**：无额外 props → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-unstyled-io-time-picker` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 出现 `.my-custom`。
4. **格式化展示**：`defaultValue` + `format="HH:mm"` + `label`/`placeholder` → 文案匹配 `14:30` 形式。
5. **自定义 suffix**：传入 `data-testid="sfx"` 的 `suffix` → 节点可见。
6. **打开弹层**：点击 label，`popupProps` 关闭过渡 → `onEnter` 被调用。

## 评分

- 交互覆盖：4/5
- 分支覆盖：4/5（分支满，函数覆盖率偏低）
- 边界处理：3/5（未覆盖无效时间等）
- 场景真实度：4/5
- 综合评分：15/20
