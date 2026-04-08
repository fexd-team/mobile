# BlockLabel 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/BlockLabel/index.tsx`。

| 指标       | 值     |
| ---------- | ------ |
| Statements | 91.66% |
| Branches   | 85%    |
| Functions  | 66.66% |
| Lines      | 90.9%  |

## 测试场景

1. **默认渲染**：无额外 props → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-block-label` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 出现 `.my-custom`。

## 评分

- 交互覆盖：2/5（纯展示，无交互链）
- 分支覆盖：3/5（未达 90% 语句/函数目标）
- 边界处理：2/5（未测 label 文案、必填标记等分支）
- 场景真实度：3/5（封装冒烟为主）
- 综合评分：10/20
