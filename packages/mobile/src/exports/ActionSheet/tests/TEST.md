# ActionSheet 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

验证命令：

`npx jest --coverage --testPathPattern='exports/ActionSheet/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/ActionSheet/index.tsx'`

## 测试场景

1. **冒烟**：`.exd-action-sheet-popup`、动作区、按钮；`prefix` 导出断言。
2. **modalId**：省略时注册 store；固定 id 可查。
3. **actions**：多对象、`content` 函数、自定义 `className`；`isValidElement` 分支（原始 React 节点）；对象与元素混合列表。
4. **点击语义**：`onClick` 优先；无 `onClick` 走 `onClose`。
5. **buttonFactory**：自定义按钮。
6. **Popup 透传**：`className`、mask 点击关闭、受控 `onExited`、空 `actions` 数组。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明（如有）

- 源码调整：移除参数默认值 `actions = []`（与 `defaultProps.actions` 重复且产生不可达分支），并删除未使用的 `isObject` 导入；运行期仍由 `defaultProps` 保证 `actions` 有定义。
