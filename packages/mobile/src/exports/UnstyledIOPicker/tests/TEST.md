# UnstyledIOPicker 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/UnstyledIOPicker/index.tsx`。

| 指标       | 值     |
| ---------- | ------ |
| Statements | 90.62% |
| Branches   | 93.33% |
| Functions  | 75%    |
| Lines      | 90%    |

## 测试场景

1. **默认渲染**：无额外 props → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-unstyled-io-picker` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 出现 `.my-custom`。
4. **选项展示**：`options` + `defaultValue` + `label` → 容器文案包含当前选中项 `label`。
5. **自定义 suffix**：传入带 `data-testid="sfx"` 的 `suffix` → 自定义节点可见。
6. **打开弹层**：点击 label，`popupProps` 关闭过渡 → `onEnter` 被调用。

## 评分

- 交互覆盖：4/5（打开弹层异步断言）
- 分支覆盖：3/5（语句/函数未达 90%+ 目标）
- 边界处理：3/5（未系统覆盖禁用、空选项等）
- 场景真实度：4/5（选项展示 + 弹层入口）
- 综合评分：14/20
