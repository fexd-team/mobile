# showPicker 测试概要

## 覆盖率

（`jest --collectCoverageFrom=packages/mobile/src/exports/showPicker/index.tsx`）

| 指标       | 值     |
| ---------- | ------ |
| Statements | 94.73% |
| Branches   | 81.81% |
| Functions  | 83.33% |
| Lines      | 94.11% |

## 测试场景

1. **ModalStation 就绪**：等待 `stationMap.DEFAULT_STATION` 注册后再调用，避免走异步 `renderGlobalProvider` 分支导致用例不稳定。
2. **确认**：点击头部右侧（内层 `span`）提交 `tempValue`，Promise resolve 为当前值。
3. **取消**：左侧关闭不更新 `value`，返回初始 `defaultValue`。
4. **clearable: false**：选项列表不含「---」，仍可通过确认返回值。
5. **popupProps**：覆盖 `headerLeft` / `headerRight` 展示与点击确认。

## 评分

- 交互覆盖：5/5（真实 `showPopup` + `PickerView` + 点击链路）
- 分支覆盖：4/5（`clearable`、自定义头部已覆盖；`onChange` 单行未覆盖）
- 边界处理：4/5（无 `defaultValue`、单选项、不可清除）
- 场景真实度：5/5（与业务命令式选值一致）
- **综合评分：18/20**

## 未覆盖说明

- 第 49 行：`PickerView` 的 `onChange`（更新 `tempValue`）。在 jsdom 中模拟滚动会触发 `PickerView` 内部 Tween/debounce，与弹层卸载存在竞态，易导致 `NotFoundError`，故未做稳定单测。当前 **Statements 仍 ≥ 90%**。
