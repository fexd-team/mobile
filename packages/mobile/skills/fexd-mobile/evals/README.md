# fexd-mobile Skill 评估框架

对 `fexd-mobile` Skill（SKILL.md + references/）的质量进行 A/B 对比评估，确保每次修改不会引入退步。

## 目录结构

```
evals/
├── README.md                    # 本文件
├── prompts.json                 # 15 个基础测试用例
├── component-selection.json     # 5 个组件选型测试用例
├── anti-hallucination.json      # 5 个反幻觉测试用例
├── rubric.md                    # 6 维度评分标准
└── baseline/
    └── report.md                # 基准报告快照（2026-04-14）
```

## 快速开始

### 1. 本地硬检查（无 CI / 无模型）

每次修改 `skills/fexd-mobile/`、`README.md`、`AGENTS.md`、`src/index.ts` 或 `.developing` 状态后，先在仓库根目录执行：

```bash
npm run ai:assets
npm run ai:check
```

这一步不调用任何 AI，也不需要 CI。它会检查：

- `components.manifest.json` / `llms.txt` 是否由当前源码生成
- public export 是否都有 reference 文档
- reference 文档是否误多出非 public export
- `.developing` 组件是否泄漏到 public export 或 README
- SKILL / AGENTS / catalog / source-navigation 的版本号和导出数量是否漂移
- eval JSON 的 id、必填字段和正则是否有效
- package 发布白名单与样式 sideEffects 是否覆盖 AI 资产和样式文件

### 2. Agent 辅助评估（无 CI / 可选）

当这次改动影响推荐实践、反幻觉规则、组件选型或 recipes 时，生成一份评估提示：

```bash
npm run skill:eval:prompt > packages/mobile/skills/fexd-mobile/evals/.local-eval-prompt.md
```

把 `.local-eval-prompt.md` 的内容粘贴给当前可用的 AI Agent（Cursor、Codex、Claude Code、OpenCode 均可），让它按提示读取 `SKILL.md` 和 references 后输出 JSON 评估报告。

建议本地保留最近一次报告作为人工发布记录，例如：

```text
packages/mobile/skills/fexd-mobile/evals/local-report.latest.md
```

`.local-eval-prompt.md` 和 `local-report.latest.md` 只是本地工作产物，不要求提交；真正要提交的是修复后的 skill 文档、eval case 或 baseline 说明。

### 3. 手动 A/B 评估（需要更严谨时）

对 Cursor Agent 说：

> 评估 fexd-mobile skill：读取 `evals/prompts.json` 中的测试用例，对每个用例分别用"无 Skill 知识"和"读取 Skill 文档后"两种方式回答，然后按 `evals/rubric.md` 的标准打分，与 `evals/baseline/report.md` 对比。

### 4. 评估流程

```
Step 1: 加载 prompts.json 中的测试用例
Step 2: 对每个用例启动两个 subagent：
        - Subagent A (baseline): 不读取 Skill 文件，纯通用知识
        - Subagent B (with_skill): 按 SKILL.md 指引读取文档后回答
Step 3: 启动 Judge subagent：收到匿名的 A/B 输出，按 rubric.md 评分
Step 4: 运行确定性检查（deterministic_checks / negative_checks）
Step 5: 汇总为报告，与 baseline/report.md 对比
Step 6: 退步率 > 0 则需修复
```

### 5. 解读报告

| 指标               | 含义                                       |
| ------------------ | ------------------------------------------ |
| **weighted_total** | 5 维度加权总分（1.0-5.0）                  |
| **delta**          | with_skill 分 - baseline 分（正值 = 提升） |
| **回归检测**       | 任何用例 delta < -0.5 标记为退步           |

### 6. 通过标准

- with_skill 总平均分 ≥ 4.5
- 无单项分数 < 3.5
- 退步率 = 0%

## 测试用例分类

| 类别                             | 数量 | 考察重点                     |
| -------------------------------- | ---- | ---------------------------- |
| A 日常开发 (daily)               | 6    | Tool Wrapper：API 正确性     |
| B 边界防护 (boundary)            | 3    | 禁用组件拦截                 |
| C 模糊需求 (fuzzy)               | 3    | Inversion：选型分析          |
| D 多步骤 (pipeline)              | 3    | Pipeline：步骤完整性         |
| S 组件选型 (component-selection) | 5    | 相似组件间的正确选择         |
| H 反幻觉 (anti-hallucination)    | 5    | 不按其他库习惯幻觉 Props/API |

## 添加新测试用例

在 `prompts.json` 中追加条目：

```json
{
  "id": "A7",
  "category": "daily",
  "prompt": "你的测试问题",
  "should_trigger": true,
  "deterministic_checks": ["期望出现的正则模式"],
  "negative_checks": ["不应出现的正则模式"],
  "rubric_focus": ["重点考察的维度"]
}
```

## 基准数据

首次评估于 2026-04-14 完成，结果：

- Baseline (无 Skill) 平均分：2.41
- With Skill 平均分：4.72
- Skill 带来 +95.9% 质量提升
