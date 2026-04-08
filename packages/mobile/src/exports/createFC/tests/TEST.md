# createFC 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 92.85% |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 100%   |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/createFC/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/createFC/index.tsx'`）

## 测试场景

1. **基础**：工厂返回可挂载组件、子节点渲染。
2. **forwardRef**：ref 指向内部 DOM。
3. **defaultProps**：挂载到产物组件后渲染生效。
4. **memo**：同 props 重渲染不重复调用 render。
5. **短参数列表**：`render.length < 2` 时修补 length（React 18 下 `defineProperty` 内 getter 可能未被二次读取，故 statements 未达 100%）。
6. **propsAreEqual**：自定义比较控制重渲染。
7. **displayName**：产物上可设置 `displayName` 便于调试。

## 评分

- 交互覆盖：2/5（工具工厂）
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- **综合评分：16/20**

## 未覆盖说明（如有）

- `Object.defineProperty(render, 'length', { get() { return 2 } })` 的 getter 在当前 React + jsdom 下可能不被执行，故剩余约 1 条 statement。
