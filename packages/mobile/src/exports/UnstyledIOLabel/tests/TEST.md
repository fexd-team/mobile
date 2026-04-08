# UnstyledIOLabel 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/UnstyledIOLabel/index.tsx`。

| 指标       | 值     |
| ---------- | ------ |
| Statements | 95.45% |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **默认渲染**：无额外 props → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-io-label` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 出现 `.my-custom`。
4. **聚焦隐藏错误**：`focused` + `hideErrorWhenFocusing` + `error`/`helper` → 根结构挂载（聚焦时不展示错误文案路径）。
5. **字符串 error**：`error="校验失败"` → 文案出现在容器内。
6. **节点 error**：`error={<span>节点错误</span>}` → 「节点错误」可见。
7. **禁用样式**：`disabled` → 存在 `.exd-io-label__label--disabled`。
8. **函数式 prefix/children**：`prefix={() => '前缀'}`、`children={() => '内容'}` → 「前缀」「内容」均可见。

## 评分

- 交互覆盖：3/5（无点击链，覆盖状态组合）
- 分支覆盖：4/5（分支满，语句差 1 条）
- 边界处理：4/5（error 形态、禁用、聚焦策略）
- 场景真实度：4/5（贴近表单标签与校验展示）
- 综合评分：15/20
