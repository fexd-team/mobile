# CascadePicker 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 96.55% |
| Branches   | 66.66% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **冒烟渲染**：传入 options 和子节点 → 触发区正确渲染
2. **函数式 children**：函数 children 接收 values → 展示格式化文本
3. **弹层打开**：点击触发区 → 弹层内渲染 CascadePickerView
4. **确认提交**：点击确认 → onChange 被调用并传入 values + selectedOptions
5. **取消关闭**：点击取消 → onCancel 被调用
6. **disabled**：disabled=true → 点击不打开弹层
7. **空 options 渲染**：options=[] → 触发区正常渲染
8. **空 options 弹层**：options=[] → 点击打开弹层不崩溃
9. **受控 value**：value 变化 → children 函数拿到新值
10. **onConfirm 拦截**：onConfirm 返回 false → 不关闭不提交

## 评分

- 交互覆盖：5/5（完整弹层生命周期：打开 → 操作 → 确认/取消）
- 分支覆盖：3/5（66.66%，findOptionPath 内部 break 路径受限于弹层内部操作粒度）
- 边界处理：4/5（空 options、disabled、onConfirm 拦截）
- 场景真实度：5/5（真实弹层选择器交互流程）
- 综合评分：17/20

## 未覆盖说明

- 行 13-15：findOptionPath 中 `values ?? []` 的 nullish 分支和 `!found` 中断分支，需要在弹层已打开状态下精确模拟不匹配值，受限于 PickerView 滚动交互精度
