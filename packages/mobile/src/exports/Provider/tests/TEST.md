# Provider 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 91.89% |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 94.28% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/Provider/tests' --collectCoverageFrom='packages/mobile/src/exports/Provider/index.tsx'`）

## 测试场景

1. 渲染 children，`ModalStation` 注册 `DEFAULT_STATION`。
2. `__global`：保留已有 `#GLOBAL_FEXD_PROVIDER` 容器。
3. 非 `__global`：卸载并移除遗留全局容器与 `globalThis` 标记。
4. `renderGlobalProvider`：`GLOBAL_FEXD_PROVIDER` 已存在时短路。
5. `renderGlobalProvider`：挂载全局 div 并 `waitFor` 驿站就绪。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- **综合评分：17/20**

## 未覆盖说明（如有）

- `renderGlobalProvider` 外层 `try/catch`（约 68–69 行）在常见路径下未触发；异步内部抛错由 `@fexd/tools/run` 处理，不经过该 catch。
