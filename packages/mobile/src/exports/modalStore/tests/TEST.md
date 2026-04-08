# modalStore 测试概要

## 覆盖率

（`jest --collectCoverageFrom=packages/mobile/src/exports/modalStore/index.ts --collectCoverageFrom=packages/mobile/src/exports/modalStore/store.ts`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **addModal**：写入 `map`、计算 `zIndex`、触发 `eventBus` 的 `open`。
2. **同级 zIndex**：连续添加同级弹层时 `zIndex` 递增。
3. **getAll**：返回当前全部条目的快照数组。
4. **removeModal**：删除条目并触发 `close`；`id` 不存在时不抛错。
5. **closeAll / destroyAll**：分别调用各条目的 `setVisible(false)`、`setCreated(false)`。

## 评分

- 交互覆盖：4/5（事件总线订阅/断言，无 UI）
- 分支覆盖：5/5（`removeModal` 空路径、`zIndex` 分支均已覆盖）
- 边界处理：4/5（缺 id、多实例同层）
- 场景真实度：4/5（贴近 modal 栈与事件通知）
- **综合评分：17/20**

## 未覆盖说明

无。
