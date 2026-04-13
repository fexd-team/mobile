# usePickerNumberColumn 测试概要

## 测试场景

1. **defaultValue 初始化**：在范围内直接使用
2. **defaultValue 超上限**：clamp 到 max
3. **defaultValue 低于下限**：clamp 到 min
4. **未传 defaultValue**：value 为 min
5. **options 生成**：min~max 正确生成，长度正确
6. **toLabel 格式化**：选项 label 由 toLabel 决定
7. **onChange 更新 value**：调用后 value 变化
8. **onChange 字符串**：接受字符串并转数值
9. **min/max 收窄 clamp**：value 超出新范围时被 clamp
10. **min/max 恢复不回跳**：rawValue 已同步，恢复后 value 稳定
11. **单值范围**：min === max 时仅一个选项
12. **toLabel 稳定化**：inline toLabel 不导致 options 重算
