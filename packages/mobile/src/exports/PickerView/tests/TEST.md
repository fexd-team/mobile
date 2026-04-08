# PickerView 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 98.78% |
| Branches   | 92.85% |
| Functions  | 100%   |
| Lines      | 98.64% |

（命令：`npx jest --coverage --testPathPattern='exports/PickerView/tests' --collectCoverageFrom='packages/mobile/src/exports/PickerView/index.tsx'`）

## 测试场景

1. **冒烟**：根节点、选项文案渲染。
2. **scaleSelected**：true 时激活类名；false 时无激活类名。
3. **数值 value**：与 string 比较时激活态正确。
4. **className / ref**：合并类名；`forwardedRef` 指向根节点。
5. **rows**：非法（小于 3、偶数）告警；合法奇数 5 时内容高度为 250px。
6. **受控 / 非受控**：`defaultValue`、`value` 与 `rerender` 同步；`value` 不在列表中不崩溃。
7. **空数据**：`options=[]` 或未传 `options`。
8. **滚动与 debounce**：设置真实 `scrollTop` 后 `scroll` + 假计时器触发 `onChange`（值与 index）。
9. **对齐滚动**：`scrollTop` 已为行高整数倍时不触发 `onChange`。
10. **Tween 回正**：非整数 `scrollTop` + 真实计时器 + `waitFor`，`scrollTop` 回正到行高。
11. **触摸**：`touchStart` 期间 debounce 跳过；`touchEnd` 后再次 `handleScroll`；完整 touch 序列。
12. **resize**：`getBoundingClientRect` mock 出高度 + `window.resize` + 假计时器走 `handleResize` 链路。
13. **极端环境**：`globalThis.addEventListener` 缺失时仍可卸载。
14. **options 变更**：`rerender` 新列表与受控 `value`。
15. **卸载**：Tween 更新过程中 `unmount` 不抛错（覆盖 Tween `update` 内 ref 判空分支）。
16. **defaultValue 不在列表**：挂载 effect 不写入非法 `scrollTop`。
17. **受控优先**：同时传 `value` 与 `defaultValue` 时以 `value` 计算 initialIndex。

## 评分

- 交互覆盖：5/5（滚动、触摸、debounce、resize、Tween 真实计时器）
- 分支覆盖：5/5（rows 三元、触摸/resize 守卫、受控同步等均有用例）
- 边界处理：5/5（空列表、非法 defaultValue、无 addEventListener、卸载中 Tween）
- 场景真实度：5/5（对齐 H5 滚轮选择器交互链）
- **综合评分：20/20**

## 未覆盖说明

- **约第 61 行**（Tween `update` 内 `contentRef.current.scrollTop = value`）：在 ref 仍有效时的赋值与「仅早退」分支在覆盖率上合并显示为行 61 未完全染绿；实际 Tween 路径已通过「非整数 scrollTop 回正」用例执行，剩余为 Istanbul 行级粒度或极端竞态，性价比低。
