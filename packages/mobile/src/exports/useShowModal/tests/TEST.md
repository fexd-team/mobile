# useShowModal 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/useShowModal/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/useShowModal/index.{ts,tsx}'`）

## 测试场景

1. **元组结构**：在带 ModalStation 的 Wrapper 内 `renderHook`，通过 Context 读取与 `useShowModal()` 相同的 `[show, station]`，断言长度为 2、`show` 为函数、`station` 为合法 React 元素。
2. **show → DOM → close**：`show({ content, title })` 后等待 `.exd-modal` 出现；调用控制器 `close()` 后等待该节点从文档移除。

## 评分

- 交互覆盖：4/5（命令式打开/关闭 + 真实弹层挂载）
- 分支覆盖：5/5（薄封装，源码无分支）
- 边界处理：3/5（未测无 station 等异常路径，由 createUseModalAPI / showModal 覆盖）
- 场景真实度：4/5（与业务中「Hook + station 同树」用法一致）
- **综合评分：16/20**

## 未覆盖说明（如有）

无（`index.tsx` 仅 `createUseModalAPI(showModal)` 导出）。
