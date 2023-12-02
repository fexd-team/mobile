import BlockLabel from '../BlockLabel'
import cloneFC from '../cloneFC'
import UnstyledIOInput from '../UnstyledIOInput'
// 此处不引入 style.less，目的是实现按需引用

const BlockInput = cloneFC(UnstyledIOInput)

BlockInput.defaultProps = {
  ...BlockInput.defaultProps,
  theme: BlockLabel,
  classNamePrefix: 'exd-block-input',
}

export default BlockInput
