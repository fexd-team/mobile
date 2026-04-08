# NavBar 测试概要

## 覆盖率

定向命令：

`npx jest --coverage --testPathPattern='exports/NavBar/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/NavBar/index.tsx'`

| 指标       | 值     |
| ---------- | ------ |
| Statements | 95.23% |
| Branches   | 86.66% |
| Functions  | 100%   |
| Lines      | 95%    |

## 测试场景

1. **冒烟**：标题、wrapper 结构。
2. **三槽**：`left` / `right` / `children`；左右支持函数形式 `run()`。
3. **样式**：`className`、`contentClassName`。
4. **交互**：`userEvent` 点击左右槽触发 `onLeftClick` / `onRightClick`。
5. **居中**：`alignCenter={false}` 不写 `left`；溢出时 `left: 0`；未溢出计算 `left`；偏移夹紧；计算为负时不写入。
6. **副作用**：`jest.mock('@fexd/tools')` 将 `throttle` 透传以便同步断言；`jest.mock('../../useSize')` 驱动 `useEffect`；`resize` 监听注册与手动调用 handler。
7. **ref**：`useImperativeHandle` 指向外层容器。

## 评分

- 交互覆盖：5/5
- 分支覆盖：4/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明

- 行 37–38：Istanbul 仍标记为未覆盖，但「标题内容溢出」用例已对 `scrollWidth > offsetWidth` 分支做断言；可能与 source map 或语句合并有关。
- 行 61–62：`if (!root.addEventListener)` 空分支，无业务意义，未单独构造环境。
