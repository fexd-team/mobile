# fexd-mobile Skill 评分标准 (Rubric)

## 评分维度

| 维度 | 权重 | 5 分标准 | 1 分标准 |
| --- | --- | --- | --- |
| **正确性** (correctness) | 25% | import 路径正确、Props 用法与文档一致、代码可直接运行 | import 不存在的组件或使用不存在的 API |
| **组件选型** (component_selection) | 25% | 选了最合适的组件，给出选型理由，拒绝使用禁用组件 | 使用了禁用组件或选了不合适的组件 |
| **最佳实践** (best_practice) | 20% | Provider 包裹根组件、命令式 API 优先、表单用 Line\* 变体、样式用 Less 变量覆盖 | 违反多条推荐实践 |
| **反幻觉** (anti_hallucination) | 15% | 不按其他库习惯幻觉 Props，不确定时声明不确定，正确识别不存在的 API | 幻觉不存在的 Props/API（如 danger prop、Form.Item、Dialog.confirm、ConfigProvider） |
| **完整性** (completeness) | 10% | 覆盖全部需求，含样式定制建议和注意事项 | 只给了代码片段，遗漏关键细节 |
| **交互质量** (interaction_quality) | 5% | 需求模糊时主动澄清或提供多方案对比 | 需求模糊时直接猜测，无解释 |

## 加权计算

```
weighted_total = correctness * 0.25
              + component_selection * 0.25
              + best_practice * 0.2
              + anti_hallucination * 0.15
              + completeness * 0.1
              + interaction_quality * 0.05
```

总分范围：1.0 - 5.0

## 各维度详细标准

### 正确性 (correctness)

| 分数 | 标准                                                                       |
| ---- | -------------------------------------------------------------------------- |
| 5    | 所有 import 正确、Props 签名与文档一致、代码可直接复制运行                 |
| 4    | import 正确、大部分 Props 正确，可能有微小类型问题                         |
| 3    | 组件选对了，但部分 Props 或 API 用法偏离文档（如 Form.Item vs Form.Field） |
| 2    | 混入了其他库的 API 习惯（antd 的 Form.Item/rules 对象等），部分无法运行    |
| 1    | import 不存在的组件、使用不存在的 API（如 ConfigProvider、Dialog.confirm） |

### 最佳实践 (best_practice)

| 分数 | 标准                                                                     |
| ---- | ------------------------------------------------------------------------ |
| 5    | Provider 包裹 + 命令式 API 优先 + Line\* 变体 + Less 变量 + loading 成对 |
| 4    | 满足 4 条以上推荐实践                                                    |
| 3    | 满足 2-3 条推荐实践                                                      |
| 2    | 仅满足 1 条推荐实践                                                      |
| 1    | 完全未遵循任何推荐实践                                                   |

### 组件选型 (component_selection)

| 分数 | 标准                                            |
| ---- | ----------------------------------------------- |
| 5    | 选了最合适的组件，给出理由，正确拒绝禁用组件    |
| 4    | 组件选择正确，有简单理由说明                    |
| 3    | 组件可用但非最优选择                            |
| 2    | 组件选择不当，但至少没用禁用组件                |
| 1    | 使用了禁用组件（Calendar/Skeleton/Cascader 等） |

### 完整性 (completeness)

| 分数 | 标准                                            |
| ---- | ----------------------------------------------- |
| 5    | 需求全覆盖 + 样式定制建议 + 注意事项 + 文档引用 |
| 4    | 需求全覆盖 + 部分样式/注意事项                  |
| 3    | 核心需求覆盖，缺少样式或注意事项                |
| 2    | 仅给出基础代码，多处遗漏                        |
| 1    | 只有片段代码，关键需求未满足                    |

### 交互质量 (interaction_quality)

| 分数 | 标准                                       |
| ---- | ------------------------------------------ |
| 5    | 模糊需求时主动澄清 + 多方案对比 + 场景分析 |
| 4    | 提供多方案对比或场景分析                   |
| 3    | 有简单说明但未深入分析                     |
| 2    | 直接给出单一方案，无解释                   |
| 1    | 需求模糊时直接猜测且猜错方向               |

### 反幻觉 (anti_hallucination)

| 分数 | 标准 |
| --- | --- |
| 5 | 所有 Props 与文档/源码一致，不确定时主动声明不确定，正确识别不存在的 API（Form.Item / Dialog.confirm / ConfigProvider 等） |
| 4 | Props 基本正确，可能有微小偏差但及时声明不确定 |
| 3 | 部分 Props 偏离文档但核心用法正确，未按其他库习惯幻觉 |
| 2 | 混入其他库的 API 习惯（antd 的 Form.Item / Dialog.confirm 等），部分无法运行 |
| 1 | 大量幻觉不存在的 Props 或 API，直接按 antd-mobile/MUI 习惯输出 |

## 测试类别

| 类别                           | ID 前缀 | 用例数 | 重点考察                                    |
| ------------------------------ | ------- | ------ | ------------------------------------------- |
| 日常开发 (daily)               | A       | 6      | Tool Wrapper 质量：API 正确性、最佳实践覆盖 |
| 边界防护 (boundary)            | B       | 3      | 禁用组件拦截、架构理解                      |
| 模糊需求 (fuzzy)               | C       | 3      | Inversion 模式：选型分析、多方案提供        |
| 多步骤任务 (pipeline)          | D       | 3      | Pipeline 模式：步骤完整性、迁移对照         |
| 组件选型 (component-selection) | S       | 5      | 相似组件间的正确选择                        |
| 反幻觉 (anti-hallucination)    | H       | 5      | 不按其他库习惯幻觉 Props/API                |

## 回归判定

- **通过标准**：with_skill 总平均分 ≥ 4.5 且无单项 < 3.5
- **退步判定**：任何用例的 with_skill 分数比 baseline 下降 > 0.5
- **退步率 > 0% 时不可发布**，需修复后重跑
