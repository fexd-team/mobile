# showPopup 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

验证命令：

`npx jest --coverage --testPathPattern='exports/showPopup/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/showPopup/index.ts'`

## 测试场景

1. **导出形态**：默认导出为可调用的 `showPopup` 函数。
2. **控制器结构**：返回 `close` / `update` / `promise`；`close` 后 `.exd-popup` 从文档移除。
3. **打开与关闭**：标题与正文渲染；`close` 后 DOM 移除且 `promise` 决议。
4. **update**：`update` 同时更新标题与正文。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：17/20

## 备注

- `promise` 断言方式同其它命令式导出测试说明。
