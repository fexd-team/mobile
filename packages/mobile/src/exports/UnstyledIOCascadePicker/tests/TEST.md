# UnstyledIOCascadePicker 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 91.42% |
| Branches   | 87.5%  |
| Functions  | 87.5%  |
| Lines      | 93.54% |

## 测试场景

1. **冒烟渲染**：默认渲染不崩溃
2. **classNamePrefix**：默认前缀为 exd-unstyled-io-cascade-picker
3. **separator**：自定义 separator → 显示文本按分隔符拼接
4. **placeholder**：无值时展示 placeholder 文本
5. **disabled**：disabled 属性 → 添加 disabled class
6. **className 透传**：自定义 className 正确合并

## 评分

- 交互覆盖：4/5（包含完整弹层交互链：打开 → 确认 → 展示值）
- 分支覆盖：4/5（87.5% 分支覆盖）
- 边界处理：4/5（空值 placeholder、disabled 状态）
- 场景真实度：4/5（真实表单选择器场景）
- 综合评分：16/20

## 未覆盖说明

- 行 67-68：`onExited` 回调内的 `setFocused(false)` + `run(restProps.onExited)`，需触发弹层退出动画完成事件，jsdom 下难以模拟 CSS transition 结束
