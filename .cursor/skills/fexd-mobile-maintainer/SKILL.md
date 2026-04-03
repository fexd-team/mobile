---
name: fexd-mobile-maintainer
description: >-
  维护 @fexd/mobile 发布 skill 的文档质量工具。扫描组件源码变更、清洗 dumi 语法、 生成/更新 references/*.md 组件文档、执行质量审查。 触发词：检查组件 skill、更新组件文档、生成组件文档、审查组件文档。
---

# fexd-mobile 文档维护 Skill

维护 `packages/mobile/skills/fexd-mobile/` 中的发布 skill 文档，确保与组件源码同步。

## 关键路径

| 用途         | 路径                                                      |
| ------------ | --------------------------------------------------------- |
| 组件源码     | `packages/mobile/src/exports/{NAME}/`                     |
| 发布 skill   | `packages/mobile/skills/fexd-mobile/`                     |
| 组件文档输出 | `packages/mobile/skills/fexd-mobile/references/{NAME}.md` |
| 变更追踪     | `.cursor/skills/fexd-mobile-maintainer/.doc-tracker.json` |
| 主索引入口   | `packages/mobile/src/index.ts`                            |

## 工作流程

### 流程 A：变更检测（日常维护）

用户说「检查组件 skill」或「哪些组件文档需要更新」时：

1. 运行 `node .cursor/skills/fexd-mobile-maintainer/scripts/detect-changes.js`
2. 展示需要更新/新建/删除的组件列表
3. 等待用户确认执行范围
4. 按「单组件处理步骤」逐个处理

### 流程 B：指定组件（单个更新）

用户说「更新 Button 的组件文档」时：

1. 直接按「单组件处理步骤」处理指定组件
2. 处理完成后更新 `.doc-tracker.json`

### 流程 C：全量初始化（首次或重建）

用户说「全量初始化组件文档」或「生成所有组件文档」时：

1. 运行 `node .cursor/skills/fexd-mobile-maintainer/scripts/scan-exports.js`
2. 从输出 JSON 中筛选 `exported: true` 且 `developing: false` 的组件
3. 分批派发子 agent 处理（每批 5-8 个并行）
4. 每批完成后更新 `.doc-tracker.json`
5. 全部完成后执行「索引同步」

### 流程 D：质量审查

用户说「审查组件文档」或「检查文档质量」时：

1. 列出所有 `references/*.md` 文件
2. 分批派发子 agent 审查（每批 3-5 个，需更细致）
3. 每个子 agent 按「审查维度」逐项检查
4. 汇总审查报告，对 NEEDS_FIX 的组件直接修复
5. 修复后**必须重新审查修复后的文件**，直到全部 PASS
6. 单组件最多重审 2 轮，第 3 轮仍有问题需报告人工介入
7. 更新 `.doc-tracker.json` 中的 reviewStatus

## 单组件处理步骤

对每个组件 `{NAME}`：

1. **读取源码文档** `packages/mobile/src/exports/{NAME}/index.zh.md`
   - 如果不存在，仅生成基于 type.tsx 的最小文档
2. **读取类型定义** `packages/mobile/src/exports/{NAME}/type.tsx`
   - 提取所有 exported interface/type，转为 Props 表格
   - 特别注意 `DOC_*` 前缀的导出（StyleVars 类型）
3. **可选读取示例** `packages/mobile/src/exports/{NAME}/demos/*.tsx`
   - 了解组件实际用法，提取关键代码片段
4. **清洗 dumi 语法** — 参照 [dumi-patterns.md](references/dumi-patterns.md)
5. **按模板输出** — 参照 [output-template.md](references/output-template.md)
6. **判断拆分**：
   - 预估超过 300 行 → 拆为 `{NAME}.md` + `{NAME}-advanced.md`
   - 简单组件 → 单文件
7. **判断 design.md**：
   - Modal/Form/IO 系统、有复杂 DOM 层级或继承关系的组件 → 需要 `{NAME}-design.md`
   - 简单展示/工具组件 → 不需要
8. **写入** `packages/mobile/skills/fexd-mobile/references/{NAME}.md`
9. **更新 tracker** `.doc-tracker.json`

## 审查维度

每个组件文档必须通过以下 9 项检查：

1. **Props 准确性**：与 type.tsx 逐字段比对，字段名/类型/默认值/必选标记一致
2. **代码片段可靠性**：import 路径、组件名、prop 名正确，用法符合实际 API
3. **dumi 语法零残留**：不得出现 `<ImportCost>`、`<code src=>`、`<API>`、` | pure`
4. **信息完整度**：关键用例、注意事项、坑点未遗漏
5. **样式定制点**：有 style.less 或 StyleVars 时必须包含样式定制说明
6. **拆分合理性**：超 300 行应拆分，已拆分的边界合理
7. **design.md 质量**（仅复杂组件）：DOM 层级描述准确，设计思路有助理解
8. **frontmatter 完整性**：name 和 description 字段齐全，description 准确概括组件用途
9. **源码溯源**：文件末尾 HTML 注释包含正确的源码路径

审查报告格式：

- **PASS**：文档准确完整
- **NEEDS_FIX**：附具体问题清单（字段缺失/类型错误/信息遗漏等）

## 索引同步

所有组件文档处理完毕后，更新以下索引文件：

1. `packages/mobile/skills/fexd-mobile/catalog.md` — 为每个组件补充 references 链接
2. `packages/mobile/skills/fexd-mobile/SKILL.md` — 更新任务路由表，并将 frontmatter 中 `metadata.version` 更新为当前日期（格式 `YYYY.MM.DD`）
3. `packages/mobile/AGENTS.md` — 更新文档索引表

## 子 agent 调度规范

派发子 agent 时必须在 prompt 中包含：

- 要处理的组件名称列表
- 组件源码路径 `packages/mobile/src/exports/{NAME}/`
- 输出路径 `packages/mobile/skills/fexd-mobile/references/{NAME}.md`
- 完整的 output-template.md 内容（或指引其读取路径）
- 完整的 dumi-patterns.md 内容（或指引其读取路径）
- 明确的质量要求：Props 必须从 type.tsx 提取，不可编造

## 不可处理组件（开发中黑名单）

以下组件有 `.developing` 标记，不在 index.ts 中导出，禁止生成文档：

Breadcrumb, Calendar, Card, Cascader, CountDown, CountTo, Drag, Drawer, Dropdown, Elevator, Footer, Gallery, ImagePicker, List, Marquee, Menu, NoticeBar, NumberKeyboard, Pagination, Search, SegmentedControl, ShareSheet, Skeleton, Sticky, SwipeAction, Table, Tag, Tips, TreeSelect, Video, Waterfall
