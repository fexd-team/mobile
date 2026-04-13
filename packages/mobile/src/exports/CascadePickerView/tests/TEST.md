# CascadePickerView 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 98.24% |
| Branches   | 76.47% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **三列渲染**：传入三级数据 → 渲染 3 列 PickerView
2. **省份选项**：第一列展示所有顶级选项
3. **默认首项路径**：无 value/defaultValue → onChange 输出首条完整路径
4. **受控 value**：传入指定路径 → onChange 回传对应值
5. **defaultValue 初始化**：defaultValue 决定初始选中项
6. **切换省份联动**：滚动第一列 → 后续列联动更新
7. **disabled 项跳过**：首项 disabled → 自动选中第一个可用项
8. **ref/className 传递**：ref 指向根 DOM 节点，className 合并
9. **空数据**：options=[] → 不渲染任何列
10. **两层数据**：两级树 → 渲染 2 列
11. **全 disabled 回退**：所有项 disabled → 回退选第一项
12. **不匹配路径回退**：value 中有不存在的值 → 回退到默认首项
13. **保持合法 current**：current 值存在且非 disabled → 保持不变
14. **disabled current 跳转**：current 为 disabled → 跳到首个可用项
15. **受控值变化更新**：受控 value 变化 → onChange 回传新路径

## 评分

- 交互覆盖：4/5（包含滚动联动交互）
- 分支覆盖：4/5（76.47%，部分 resolveValue 内部分支受 jsdom 滚动限制）
- 边界处理：5/5（空数据、全 disabled、不匹配路径、两层数据）
- 场景真实度：5/5（省市区真实业务数据驱动）
- 综合评分：18/20

## 未覆盖说明

- 行 33, 41-54：resolveValue 内部分支覆盖受限于 jsdom 下 PickerView 滚动模拟精度，无法精确触发所有 getOptions 内的循环路径
