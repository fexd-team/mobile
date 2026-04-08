# cloneFC 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/cloneFC/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/cloneFC/index.ts'`）

## 测试场景

1. 克隆引用与源组件不同。
2. 继承 `defaultProps`。
3. 克隆上单独改 `defaultProps` 不影响源组件。
4. `hoist-non-react-statics` 挂接自定义静态属性。
5. 临时改写 `creatorCache` 工厂与源 `defaultProps`，覆盖 `defaultProps || ... || {}` 全部分支。

## 评分

- 交互覆盖：2/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- **综合评分：17/20**

## 未覆盖说明（如有）

无。
