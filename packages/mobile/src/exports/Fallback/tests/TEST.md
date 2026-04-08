# Fallback 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/Fallback/tests' --collectCoverageFrom='packages/mobile/src/exports/Fallback/index.tsx'`）

## 测试场景

1. 默认结构、子节点、默认图标。
2. `OFFLINE` / `navigator.onLine === false` → `isOfflineError`。
3. `TypeError` / `SyntaxError` stack → `isSystemError`。
4. `icon` / `children` / `footer` 函数注入 `errorInfo`。
5. `icon` 为 React 节点。
6. `console` 入口：`@fexd/tools` 的 `source.js` mock 后点击加载 eruda 流程。
7. `ref` 转发根节点。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- **综合评分：18/20**

## 未覆盖说明（如有）

无。
