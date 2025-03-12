import cloneFC from '../cloneFC'
import UnstyledIOInput from '../UnstyledIOInput'
import CellLabel from '../CellLabel'
// 此处不引入 style.less，目的是实现按需引用

const CellInput = cloneFC(UnstyledIOInput)

CellInput.defaultProps = {
  ...CellInput.defaultProps,
  theme: CellLabel,
  classNamePrefix: 'exd-cell-input',
}

export default CellInput
