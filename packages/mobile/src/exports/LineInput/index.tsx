import LineLabel from '../LineLabel'
import cloneFC from '../cloneFC'
import UnstyledIOInput from '../UnstyledIOInput'
// 此处不引入 style.less，目的是实现按需引用

const LineInput = cloneFC(UnstyledIOInput)

LineInput.defaultProps = {
  ...LineInput.defaultProps,
  theme: LineLabel,
  classNamePrefix: 'exd-line-input',
}

export default LineInput
