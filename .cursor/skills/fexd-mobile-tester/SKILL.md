---
name: fexd-mobile-tester
description: >-
  @fexd/mobile 组件库的测试管理工具。覆盖率驱动 + 场景驱动测试编写、运行定向测试、 生成修复建议与 TEST.md 评分报告。目标：每个导出 statements >= 90%。 触发词：测试、写测试、补测试、跑测试、检查测试、测试覆盖、test。
---

# fexd-mobile 测试管理 Skill

为 `@fexd/mobile` 组件库编写、运行和维护测试用例。采用**覆盖率驱动 + 场景驱动**方法论。

## 关键路径

| 用途           | 路径                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| 组件源码       | `packages/mobile/src/exports/{NAME}/`                                   |
| 类型定义       | `packages/mobile/src/exports/{NAME}/type.tsx`                           |
| 测试输出       | `packages/mobile/src/exports/{NAME}/tests/index.test.tsx`               |
| 测试报告       | `packages/mobile/src/exports/{NAME}/tests/TEST.md`                      |
| Jest 配置      | `jest.config.js`（含 coverage 配置）                                    |
| SWC 配置       | `.swcrc`                                                                |
| 变更检测脚本   | `.cursor/skills/fexd-mobile-tester/scripts/detect-test-scope.js`        |
| 测试脚手架脚本 | `.cursor/skills/fexd-mobile-tester/scripts/scaffold-test.js`            |
| 测试模式参考   | `.cursor/skills/fexd-mobile-tester/references/test-patterns.md`         |
| 组件策略参考   | `.cursor/skills/fexd-mobile-tester/references/component-strategies.md`  |
| Prop 约束参考  | `.cursor/skills/fexd-mobile-tester/references/prop-constraint-guide.md` |

## 技术栈

- **Jest 28** + **@swc/jest**（已从 ts-jest 迁移，全量测试 645s → 46s）
- **@testing-library/react** + **@testing-library/jest-dom**
- **@testing-library/user-event**（高仿真用户交互，优先于 fireEvent）
- jest.config.js 已配置 `collectCoverage: true`，覆盖 `exports/*/index.{ts,tsx}`
- 测试文件使用**直接组件导入**（`from '..'`），避免 barrel import `@fexd/mobile` 带来的全量模块解析

## 覆盖率目标

| 指标       | 目标   |
| ---------- | ------ |
| Statements | >= 90% |
| Branches   | >= 85% |
| Functions  | >= 90% |
| Lines      | >= 90% |

IO 分层变体（cloneFC 产物）可放宽至 statements >= 80%（源码极短，覆盖率波动大）。

## 工作流程

### 流程 A：单组件测试编写（覆盖率驱动 + 场景驱动）

用户说「给 {NAME} 写测试」或「补测试」时：

#### 步骤 1：分析组件

- 读 `type.tsx` 提取全部 prop 定义（名称、类型、可选性）
- 读 `index.tsx` 理解组件实现逻辑、DOM 结构、内部状态
- 如有 `Panel/` 或 `Group/` 子目录，一并读取（复合组件）
- 检查是否使用 `useIOControl`（= 支持受控/非受控模式）
- 检查 `defaultProps` 了解默认值
- 读 `demos/` 目录理解设计者意图的典型使用场景和常见组合
- 分析组件依赖链（如 BlockInput → UnstyledIOInput → BasicInput → Input）
- 检查 `index.zh.md` 中记录的 edge case 和注意事项

#### 步骤 2：场景分析（核心新增）

基于源码分析列出「**场景清单**」，每个场景包含：

- **场景名称**：一句话描述
- **操作序列**：用户的操作步骤（点击、输入、滑动、拖拽等）
- **预期状态变化**：操作后的 DOM/数据变化

场景来源优先级：

1. **源码分支路径**：逐个 if/switch/三元运算符，确保每条分支至少有一个场景覆盖
2. **demos/ 中的使用模式**：官方示例代表了最典型的业务用法
3. **交互组件的操作链**：不是单次 click，而是完整操作流程
4. **边界与异常**：空值、极端值、快速连续操作

**每个导出至少 3 个场景**，交互组件至少 5 个。

场景类型映射（按组件类型自动识别）：

- 表单输入 → 输入 →blur→ 校验、disabled 阻断、受控/非受控切换
- 选择器 → 滚动选择 → 确认、联动列变更、min/max 约束
- 弹窗 → 打开 → 交互 → 关闭 → 回调顺序、遮罩点击、命令式 API
- 拖拽/滑动 → touchStart→touchMove(多步)→touchEnd 完整序列
- Hooks → 调用 → 状态变更 → 清理副作用

#### 步骤 3：编写测试

规则：

- **先写场景测试（操作链）**，再补 prop 逐项测试
- **优先 userEvent**：`userEvent.click()` / `userEvent.type()` 替代 `fireEvent.click()` / `fireEvent.change()`
- **touch 组件必须包含** `fireEvent.touchStart → touchMove(多步) → touchEnd` 序列
- **拖拽组件必须包含** `fireEvent.mouseDown → mouseMove(多步) → mouseUp` 序列
- 参照 [test-patterns.md](references/test-patterns.md) 的代码模板
- 参照 [component-strategies.md](references/component-strategies.md) 确定组件类型侧重点
- 遵循下方「测试约定」

#### 步骤 4：覆盖率验证循环（核心新增）

```bash
npx jest --coverage --testPathPattern='exports/{NAME}/tests' --no-silent
```

解读覆盖率输出：

1. 查看 `Stmts` / `Branch` / `Funcs` / `Lines` 四项指标
2. 查看 `Uncovered Line #s` 列，定位未覆盖的代码行
3. 回到源码，分析未覆盖行对应的业务场景
4. 补充测试用例覆盖这些分支
5. **重复 3→4 直到达标**：statements >= 90% 且 branches >= 85%

如某些行因 jsdom 限制无法覆盖（如 Canvas API、真实 CSS 动画），在 TEST.md 中注明原因。

#### 步骤 5：生成 TEST.md

在 `{NAME}/tests/TEST.md` 中生成测试报告，格式见下方「TEST.md 规范」。

#### 步骤 6：修复循环

若测试失败，按「失败分类指南」处理：

- **测试问题** → 修复测试代码 → 重新运行
- **组件 Bug** → 记录到 FIXME.md，标记 `test.skip` + 注释

### 流程 B：批量测试生成

用户说「批量生成测试」或「给多个组件补测试」时：

1. 对每个组件执行流程 A 的完整步骤 1-6
2. 如需并行处理多组件，可为每个组件派发子 agent
3. 每个组件独立验证覆盖率，不依赖全局跑通

### 流程 C：变更驱动测试

用户说「跑测试」或在代码变更后触发：

1. 运行变更检测
   ```bash
   node .cursor/skills/fexd-mobile-tester/scripts/detect-test-scope.js
   ```
2. 解读输出 JSON
3. 执行定向测试
   ```bash
   npx jest --coverage --testPathPattern='<jestPattern>' --no-silent
   ```
4. 若 `runFullSuite: true`（公共模块变更），执行全量测试

### 流程 D：测试修复循环

测试运行后出现失败时：

1. 按「失败分类指南」逐个诊断
2. **测试问题** → 修复测试代码 → 重新运行 → 回到步骤 1
3. **组件 Bug** → 记录到 FIXME.md，标记 `test.skip` + 注释说明
4. 循环直到：全部 PASS 或全部 Bug 已标记

### 流程 E：测试审查

用户说「检查测试覆盖」或「审查测试」时：

1. 读取目标组件的测试文件和 type.tsx
2. 运行覆盖率：`npx jest --coverage --testPathPattern='exports/{NAME}/tests'`
3. 按八层策略逐层对照，标记缺失层级
4. 检查是否有真实交互场景（非纯静态断言）
5. 输出覆盖度报告 + 改进建议

## 八层测试策略

| 层级 | 名称          | 描述                                       | 适用场景                                  |
| ---- | ------------- | ------------------------------------------ | ----------------------------------------- |
| L1   | 冒烟测试      | 无 prop 渲染不崩溃 + 基础内容显示          | 所有组件                                  |
| L2   | Prop 逐项     | 枚举/布尔/数值 prop 的各取值渲染正确       | 有可视化 prop 的组件                      |
| L3   | 事件回调      | `onX` 回调被正确触发、参数正确             | 有交互的组件                              |
| L4   | Prop 约束     | 关联 prop 间的约束（如 min/max 夹逼）      | 有范围/依赖关系 prop 的组件               |
| L5   | 受控/非受控   | value+onChange 受控 vs defaultValue 非受控 | 使用 `useIOControl` 的组件                |
| L6   | 边界异常      | undefined/null/空数组、类型错误、极端值    | 所有组件                                  |
| L7   | 异步与定时    | debounce、setTimeout、动画结束回调         | 有 `useDebounceEffect`、transition 的组件 |
| L8   | 复合与 Portal | 父子组件联动、命令式 API、Portal 渲染位置  | Collapse+Panel、showModal 等              |

**关键变化**：L3 不再是单次 click → 检查回调，而是**操作序列**（多步交互 → 验证中间状态和最终状态）。

八层的代码模板详见 [test-patterns.md](references/test-patterns.md)。

## TEST.md 规范

每个导出必须生成 `{NAME}/tests/TEST.md`，格式如下：

```markdown
# {NAME} 测试概要

## 覆盖率

| 指标       | 值  |
| ---------- | --- |
| Statements | xx% |
| Branches   | xx% |
| Functions  | xx% |
| Lines      | xx% |

## 测试场景

1. **场景名**：操作描述 → 预期结果
2. ...

## 评分

- 交互覆盖：x/5（是否包含真实用户操作序列）
- 分支覆盖：x/5（源码分支是否被测试覆盖）
- 边界处理：x/5（空值/极端值/异常输入）
- 场景真实度：x/5（是否反映真实业务使用模式）
- 综合评分：x/20

## 未覆盖说明（如有）

- 行 xx-xx：原因（如 jsdom 不支持 Canvas/Touch API 等）
```

评分标准：

- 5/5：全面覆盖，包含多步交互链
- 4/5：覆盖良好，有少量场景缺失
- 3/5：基本覆盖，以静态断言为主
- 2/5：仅冒烟 + 少量 prop 测试
- 1/5：仅冒烟测试

## 测试约定

### import 方式

```tsx
// ✅ 推荐：直接导入，避免加载全部 120 个模块
import Switch from '..'
import Collapse from '..'
import Panel from '../Panel'

// ✅ 推荐：使用共享工具模块中的 helper
import { waitFakeTimers, mockDrag, mockTouch, cleanupModals } from '../../../tests/testing'

// ❌ 避免：barrel import 会拖慢测试
import { Switch } from '@fexd/mobile'
```

### 共享测试工具

`packages/mobile/src/tests/testing.tsx` 提供四个通用 helper：

| 工具 | 用途 | 适用组件 |
| --- | --- | --- |
| `waitFakeTimers(loops?, ms?)` | 批量推进 fake timer，解决多层 setTimeout 嵌套 | toast / notify / loading / Modal / PickerView / Swiper / Collapse |
| `mockDrag(el, points)` | mouseDown → mouseMove × N → mouseUp | Slider / Drag |
| `mockTouch(el, points)` | touchStart → touchMove × N → touchEnd | Rate / Swiper / SwipeAction |
| `cleanupModals()` | modalStore.destroyAll + map.clear + cleanup（不清空 body，避免 Portal debounce 竞态） | 所有弹窗类组件 |

### userEvent vs fireEvent

```tsx
import userEvent from '@testing-library/user-event'

// ✅ 推荐：userEvent 模拟真实用户行为（含 focus/blur/pointer 序列）
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'hello')

// ⚠️ 允许：touch/drag 事件仍用 fireEvent（userEvent 不支持 touch API）
fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
fireEvent.touchMove(el, { touches: [{ clientX: 100, clientY: 0 }] })
fireEvent.touchEnd(el)

// ⚠️ 允许：mouseDown/mouseMove/mouseUp 拖拽序列用 fireEvent
fireEvent.mouseDown(el, { clientX: 0 })
fireEvent.mouseMove(el, { clientX: 100 })
fireEvent.mouseUp(el, { clientX: 100 })
```

### 描述语言

- `describe` 和 `test` 使用中文描述
- 示例：`test('拖拽滑块从 0 到 50% 位置值应为 50', ...)`

### 清理

- **弹窗类组件**（Modal/Popup/Dialog/ActionSheet/toast/notify/loading）统一使用：
  ```tsx
  import { cleanupModals } from '../../../tests/testing'
  afterEach(cleanupModals)
  ```
- 使用 `jest.useFakeTimers()` 的测试必须在 `afterEach` 中恢复 `jest.useRealTimers()`
- 非弹窗组件正常使用 RTL 的 `cleanup()` 即可

### 动画控制

- 弹窗/过渡组件统一传 `transitionSpeed="none"` 禁用 CSSTransition（timeout=0）
- 需要测试过渡终态时，不传 transitionSpeed，使用 `waitFor` 等待最终样式或 class 变化
- 不需要全局 `reduceMotion`（那是 react-spring 的方案，fexd-mobile 使用 react-transition-group）

### 日期组件 mock

DatePicker / DatePickerView / TimePicker 等依赖当前日期的组件，测试中必须固定"今天"：

```tsx
jest.useFakeTimers({ now: new Date('2025-06-15') })
// ... 测试代码 ...
jest.useRealTimers()
```

### 断言

- 优先使用 `@testing-library/jest-dom` 的语义断言
- 查询元素优先级：`getByRole` > `getByText` > `getByTestId` > `querySelector`
- **有原生语义元素时优先 `getByRole`**：Button → `getByRole('button')`，Switch 内部 `<input type="checkbox">`
- **多数组件为 div 实现**（Checkbox/Radio/Modal/Dialog 等无原生语义），此时 `querySelector` + class 是务实选择
- 允许在组件 DOM 结构复杂时降级使用 `container.querySelector`

### useIOControl 初始值陷阱

使用 `useIOControl` 的组件在不传 `defaultXxx` 时内部 value 为 `undefined`。 **原则**：测试时始终显式传入初始值。

### children 渲染确认

编写 children 测试前，必须在源码中确认 `{children}` 出现在 JSX 返回值中。

### 单关注点

每个 `test()` 只验证一个行为。避免在单个 test 中混合多个独立断言点。

## 质量标准

| 原则        | 说明                                              |
| ----------- | ------------------------------------------------- |
| 黑盒优先    | 基于 prop/事件/渲染结果测试，不直接访问内部 state |
| 无纯快照    | 不使用 `toMatchSnapshot()`，所有断言都是明确的    |
| 不编造 Prop | 只测试 type.tsx 中定义的 prop                     |
| 真实交互    | 使用 `userEvent` / `fireEvent` 模拟用户操作       |
| 操作链优先  | 优先写多步操作序列，而非单次 click → 检查回调     |
| 覆盖率驱动  | 未覆盖的行必须有对应测试或注明无法覆盖的原因      |
| 独立运行    | 每个 test case 不依赖其他 test 的执行顺序         |

## TEST.md 同步更新规则

每个组件的 `tests/TEST.md` 是该组件测试状态的权威记录。**任何测试文件变动都必须同步更新对应 TEST.md 中的测试场景、覆盖率、评分**。

### 必须更新的内容

| 触发条件                   | 需更新的 TEST.md 区域                        |
| -------------------------- | -------------------------------------------- |
| 新增 / 删除 / 修改测试用例 | **测试场景**列表 + **覆盖率**数据 + **评分** |
| 覆盖率发生变化             | **覆盖率**数据                               |
| 发现组件 Bug 导致 skip     | **未覆盖说明**                               |

### TEST.md 标准结构

```markdown
# {组件名} 测试概要

## 覆盖率

| 指标       | 值  |
| ---------- | --- |
| Statements | xx% |
| Branches   | xx% |
| Functions  | xx% |
| Lines      | xx% |

验证命令： `npx jest --coverage --testPathPattern='exports/{组件名}/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/{组件名}/index.tsx'`

## 测试场景

1. **场景名**：简述。 ...

## 评分

- 交互覆盖：x/5
- 分支覆盖：x/5
- 边界处理：x/5
- 场景真实度：x/5
- 综合评分：xx/20

## 未覆盖说明（如有）

- 说明未覆盖行的原因。
```

### 覆盖率获取

每次更新 TEST.md 前，必须运行覆盖率验证命令获取最新数据，不得估算或沿用旧值。

### 评分标准

| 维度       | 5/5 标准                                      |
| ---------- | --------------------------------------------- |
| 交互覆盖   | 所有可交互行为均有 userEvent / fireEvent 覆盖 |
| 分支覆盖   | 所有 prop 枚举值和条件分支均有对应 test       |
| 边界处理   | 空值、极值、异常输入、ref 转发等边界场景      |
| 场景真实度 | 测试场景与实际业务使用方式一致                |

## 失败分类指南

```
测试失败
├── 编译错误（import 不存在、类型不匹配）
│   └── → 测试问题：检查 import 路径和 prop 名称拼写
├── 渲染崩溃（TypeError / Cannot read property）
│   ├── 崩溃发生在测试代码中 → 测试问题：检查 mock 和 setup
│   └── 崩溃发生在组件源码中 → 组件 Bug：记录 FIXME.md 并 skip
├── 断言不匹配（Expected X, Received Y）
│   ├── DOM 选择器找不到元素 → 测试问题：检查 className / 角色名
│   ├── 组件行为与文档不符 → 组件 Bug：记录 FIXME.md 并 skip
│   └── 边界值行为不明确 → 对照源码确认预期行为后修正断言
├── 异步超时（exceeded timeout）
│   └── → 测试问题：检查是否需要 act()、waitFor()、fakeTimers
└── act() 警告
    └── → 测试问题：用 act() 包裹状态更新，或用 waitFor() 等待异步
```

### 组件问题清单格式

发现组件 Bug 时，在对应目录生成 `FIXME.md`：

```markdown
# {NAME} 待修复问题

## 问题 N: 简述

- **现象**: 具体表现
- **原因**: 源码中的问题代码位置
- **建议方案**: 修复思路
- **修复置信度**: 高/中/低
```

同时在测试文件中标记 `test.skip` + BUG 注释。
