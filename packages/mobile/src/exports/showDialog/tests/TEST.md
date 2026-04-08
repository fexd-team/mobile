# showDialog 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

验证命令：

`npx jest --coverage --testPathPattern='exports/showDialog/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/showDialog/index.ts'`

## 测试场景

1. **导出形态**：默认导出为可调用的 `showDialog` 函数。
2. **控制器结构**：挂载 `ModalStation` 后调用 API，返回 `close` / `update` / `promise`；`close` 后等待 `.exd-dialog-modal` 从文档移除。
3. **打开与关闭**：标题与正文出现在文档；`close` 后弹层移除且 `promise` 决议。
4. **update**：`update` 同时更新 `title` 与 `content` 文案。

## 评分

- 交互覆盖：4/5（命令式全流程 + update）
- 分支覆盖：5/5（index 全语句覆盖）
- 边界处理：4/5（快速过渡与无遮罩配置）
- 场景真实度：4/5
- 综合评分：17/20

## 备注

- 与 `showModal` 相同：`promise` 断言优先使用 `expect(…).resolves` 或对 DOM 的 `waitFor`，避免裸 `await` 增强 Promise 在单测中的时序问题。
