import React from 'react'
import { LineLabel, BlockLabel, CellLabel, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="第 1 层：Label 层 - 不同视觉风格">
      <LineLabel active label="LineLabel" placeholder="线性样式 - 底部下划线">
        <div style={{ padding: '8px 0', color: '#666' }}>内容区域</div>
      </LineLabel>

      <BlockLabel active label="BlockLabel" placeholder="块状样式 - 边框圆角">
        <div style={{ padding: '8px 0', color: '#666' }}>内容区域</div>
      </BlockLabel>

      <CellLabel active label="CellLabel" placeholder="单元格样式 - 列表项">
        <div style={{ padding: '8px 0', color: '#666' }}>内容区域</div>
      </CellLabel>
    </DemoBlock>
  </>
)
