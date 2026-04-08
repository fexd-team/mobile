# Cascader 测试概要

> 注意：当前 Cascader 为 stub 占位组件（渲染 `<div>Cascader</div>`），尚未实现完整级联选择功能。

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **默认渲染**：无 props 渲染 → 不崩溃，DOM 存在
2. **文本内容**：渲染后 → 包含 "Cascader" 文本
3. **prefix 导出**：prefix === 'exd-cascader'
4. **className 透传**：传入自定义 className → DOM 可查询到
5. **ref 转发**：传入 ref → 指向 HTMLDivElement

## 评分

- 交互覆盖：1/5（stub 组件无交互逻辑）
- 分支覆盖：5/5（无分支，已全覆盖）
- 边界处理：2/5（stub 组件边界有限）
- 场景真实度：1/5（stub 组件无真实业务场景）
- 综合评分：9/20

## 未覆盖说明

- 该组件为占位实现，待完整开发后需重写测试
