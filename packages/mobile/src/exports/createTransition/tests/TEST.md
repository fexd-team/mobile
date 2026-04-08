# createTransition 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 85.71% |
| Functions  | 100%   |
| Lines      | 100%   |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/createTransition/tests' --collectCoverageFrom='packages/mobile/src/exports/createTransition/index.tsx'`）

## 测试场景

1. 工厂组件可挂载子节点。
2. 未传 `speed` 时使用形参默认值 `300`。
3. 字符串档位 `speed`：`classNames` 含 `exd-speed-*`。
4. `speed="none"` 时 `timeout` 为 `0`。
5. 数字 `speed`：合并 `transitionDuration` / `animationDuration`。
6. `SPEED_MAP` 预设值断言。
7. 第二参数覆盖 `Transition.defaultProps`。

## 评分

- 交互覆盖：3/5
- 分支覆盖：4/5
- 边界处理：5/5
- 场景真实度：5/5
- **综合评分：17/20**

## 未覆盖说明（如有）

- 内联箭头函数上仍有 1 处分支（Istanbul 报于约第 22 行），对达标 85% 分支无影响。
