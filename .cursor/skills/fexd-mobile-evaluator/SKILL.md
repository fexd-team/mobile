---
name: fexd-mobile-evaluator
description: >-
  @fexd/mobile Skill 质量评估工具。对 SKILL.md 及 references/ 进行 A/B 盲评， 运行确定性检查，生成评分报告并与 baseline 对比检测退步。 触发词：评估 skill、评估 fexd-mobile skill、skill eval、skill 评分。
---

# fexd-mobile Skill 评估 Skill

对 `fexd-mobile` Skill（SKILL.md + references/）的质量进行自动化 A/B 盲评。

## 关键路径

| 用途           | 路径                                                          |
| -------------- | ------------------------------------------------------------- |
| 被评估的 Skill | `packages/mobile/skills/fexd-mobile/SKILL.md`                 |
| 组件目录       | `packages/mobile/skills/fexd-mobile/catalog.md`               |
| 组件文档       | `packages/mobile/skills/fexd-mobile/references/*.md`          |
| 测试用例       | `packages/mobile/skills/fexd-mobile/evals/prompts.json`       |
| 评分标准       | `packages/mobile/skills/fexd-mobile/evals/rubric.md`          |
| 基准报告       | `packages/mobile/skills/fexd-mobile/evals/baseline/report.md` |
| 评估指南       | `packages/mobile/skills/fexd-mobile/evals/README.md`          |

## 执行流程（Pipeline 模式）

严格按以下 6 步执行，每步完成后输出检查点状态。**不可跳步**。

### Step 1: 加载测试用例

读取 `evals/prompts.json`，解析出所有测试用例。确认用例数量和类别分布。

**检查点**: 列出加载的用例 ID 和类别。

### Step 2: 运行 Baseline subagent

对每组测试用例（按类别分组，每组 3 个），启动一个 readonly subagent：

- 提示词明确要求"不读取任何 Skill 文件"
- 仅使用通用 React 知识回答
- 输出格式：`=== {ID} ===` 分隔每个回答

**批次策略**: 5 组用例，5 个 subagent 并行。

**检查点**: 确认所有 baseline 输出已收集。

### Step 3: 运行 With-Skill subagent

对每组测试用例，启动一个 readonly subagent：

- 提示词要求先读取 SKILL.md，再按指引读取相关 references
- 严格遵循文档推荐实践
- 输出格式同上

**批次策略**: 5 组用例，5 个 subagent 并行（可与 Step 2 同时执行）。

**检查点**: 确认所有 with_skill 输出已收集。

### Step 4: 运行确定性检查

对每个用例的 with_skill 输出，运行 `prompts.json` 中的：

- `deterministic_checks`: 正则匹配，期望全部命中
- `negative_checks`: 正则匹配，期望全部未命中

**检查点**: 输出通过/失败矩阵。

### Step 5: 运行 LLM-as-Judge

对每组测试用例，启动一个 readonly Judge subagent：

- 收到两份**匿名**输出（标记为"方案 X"和"方案 Y"，随机分配）
- 按 `evals/rubric.md` 的 5 维度评分
- 先读取 SKILL.md 和 catalog.md 了解正确做法

**批次策略**: 5 组用例，5 个 judge subagent 并行。

**检查点**: 确认所有评分已收集，加权总分计算正确。

### Step 6: 汇总报告

生成评估报告，包含：

1. 总平均分（baseline vs with_skill）
2. 按类别汇总
3. 逐用例明细（含 deterministic check 结果）
4. 与 `baseline/report.md` 的 delta 对比
5. 退步项标记（delta < -0.5）

**通过判定**:

- with_skill 总平均分 ≥ 4.5
- 无单项 < 3.5
- 退步率 = 0%

**检查点**: 输出最终判定（PASS / FAIL），如 FAIL 则列出需修复项。

## 注意事项

- 所有 subagent 使用 `readonly: true`，不修改工作区
- Judge subagent 接收的输出必须匿名化（随机 X/Y 标记）
- 如果某个 subagent 超时或失败，重试一次后标记为 ERROR
- 报告保存到 `evals/baseline/report.md`（覆盖旧报告前先确认）
