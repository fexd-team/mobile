# UnstyledIOInput 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/UnstyledIOInput/index.tsx`。

| 指标       | 值     |
| ---------- | ------ |
| Statements | 96.66% |
| Branches   | 83.87% |
| Functions  | 100%   |
| Lines      | 96.55% |

## 测试场景

1. **默认渲染**：挂载 `defaultValue=""` → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-unstyled-io-input` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 展示区域出现 `.my-custom`。
4. **可清除**：`defaultValue="x"` + `clearable` + `onChange`，定时推进后点击清除按钮 → 触发 `onChange`。
5. **多行分支**：`multipleLines` + `label`/`placeholder` → 出现 textarea 相关类名。
6. **suffix 插槽**：传入 `suffix={<span>尾缀</span>}` → 文案「尾缀」可见。

## 评分

- 交互覆盖：4/5（清除用 `fireEvent`，含防抖计时）
- 分支覆盖：3/5（语句/分支未全满，仍有未覆盖分支）
- 边界处理：3/5（多行、清除覆盖部分边界）
- 场景真实度：4/5（贴近表单输入与清除）
- 综合评分：14/20
