# modalConflict 测试概要

## 覆盖率

（`jest --collectCoverageFrom=packages/mobile/src/exports/modalConflict/index.ts`）

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 73.07% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **create**：无冲突 / 有冲突、`conflictProps` 对象与函数形式、`levels` 返回 `undefined` 时不过滤层级。
2. **types**：字符串相等、正则 `test`、非字符串非正则的 `typeMatcher` 默认分支。
3. **filter**：自定义 `filter` 全排除时不产生互斥结果。
4. **merge / extend**：多 handler 合并返回值；`extend` 浅合并配置。
5. **handlers.mask / hidden**：预置策略的 `contentMask`、`contentVisible`。
6. **handlers.offsetByPlacement**：无冲突返回 `{}`；`center` 冲突时隐藏 content；非 `center` 时 `delay` 后按 `contentRef` 高度计算 `top`/`bottom` 偏移。

## 评分

- 交互覆盖：3/5（纯函数 + 异步 `delay`，无 DOM）
- 分支覆盖：4/5（语句全覆盖；部分三元分支在 `offsetByPlacement` 的 `delay().then` 内对当前调用链不可达）
- 边界处理：5/5（空 store、`types` 异常类型、`filter`）
- 场景真实度：5/5（对齐 Modal 互斥与 placement 堆叠逻辑）
- **综合评分：17/20**

## 未覆盖说明

- `index.ts` 报告中的部分 Branch 未命中（约 130–134 行附近）：`conflictProps` 仅在 `conflict === true` 时调用，传入的 `conflictInfo.conflict` 恒为 `true`，故 `!conflictInfo?.conflict` 为真的分支在现有 API 下不可执行，属逻辑上的死分支。
