# UnstyledIODatePicker 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/UnstyledIODatePicker/index.tsx`。

| 指标       | 值     |
| ---------- | ------ |
| Statements | 91.17% |
| Branches   | 100%   |
| Functions  | 83.33% |
| Lines      | 90.9%  |

## 测试场景

1. **默认渲染**：无额外 props → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-unstyled-io-date-picker` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 出现 `.my-custom`。
4. **格式化展示**：`defaultValue` + `format="YYYY"` + `label`/`placeholder` → 文案含年份（如 `2024`）。
5. **无效日期过滤**：`filterInvalidDate` + `defaultValue={new Date('invalid')}` → 根结构仍挂载且不崩溃。
6. **自定义 suffix**：传入 `suffix` → 自定义节点替代默认箭头（`data-testid="sfx"` 可见）。
7. **打开弹层**：点击 label，`popupProps` 关闭过渡 → `onEnter` 被调用且文档中出现日期选择视图。

## 评分

- 交互覆盖：4/5（打开弹层 + `waitFor`）
- 分支覆盖：4/5（分支 100%，函数/语句未全满）
- 边界处理：4/5（无效日期、自定义 suffix）
- 场景真实度：4/5（贴近选日表单）
- 综合评分：16/20
