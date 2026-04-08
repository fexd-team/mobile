# useForcedUpdate 测试概要

## 覆盖率

| 指标       | 值                      |
| ---------- | ----------------------- |
| Statements | 100%                    |
| Branches   | n/a（仪器化分支数为 0） |
| Functions  | 100%                    |
| Lines      | 100%                    |

## 测试场景

1. 首次渲染：返回 `[forcedUpdate, renderKey]` 类型正确。
2. 调用 `forcedUpdate` 后 `renderKey` 变化。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5（无分支可统计）
- 边界处理：3/5
- 场景真实度：3/5
- 综合评分：14/20

## 未覆盖说明

无。
