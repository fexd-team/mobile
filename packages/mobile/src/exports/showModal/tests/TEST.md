# showModal 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

验证命令：

`npx jest --coverage --testPathPattern='exports/showModal/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/showModal/index.ts'`

## 测试场景

1. **导出形态**：默认导出为可调用的 `showModal` 函数。
2. **控制器结构**：挂载 `ModalStation` 后调用 API，返回对象含 `close`、`update`、原生 Promise 形态的 `promise`；`close` 后等待 `.exd-modal` 从文档移除。
3. **打开与关闭**：调用后正文出现在文档；`close` 后根节点消失，`promise` 通过 `expect(…).resolves` 完成决议。
4. **update**：`update({ content })` 合并更新正文文案。
5. **content 函数形态**：`content` 为函数时可接收 controller，由内层触发 `close` 完成关窗与 `promise` 决议。

## 评分

- 交互覆盖：4/5（命令式 open / update / close，含函数 content）
- 分支覆盖：5/5（薄封装 index 全语句覆盖）
- 边界处理：4/5（`transitionSpeed: 'none'`、`mask: false` 加速 jsdom）
- 场景真实度：4/5（贴近 createModalAPI + ModalStation 真实用法）
- 综合评分：17/20

## 备注

- 首条控制器用例中，关窗断言采用 `waitFor` 等待 DOM 消失；其余用例对 `promise` 使用 `await expect(ctrl.promise).resolves.toBeUndefined()`，避免在 jest 环境下裸 `await ctrl.promise` 偶发挂起。
