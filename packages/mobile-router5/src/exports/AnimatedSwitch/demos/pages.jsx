import { useHistory } from 'react-router-dom'
import { Button } from '@fexd/mobile'
import { Page } from './router'

export const Page1 = ({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  history = useHistory(),
  children = (
    <Button type="primary" onClick={() => history.push('/sub')}>
      push to Test2
    </Button>
  ),
}) => (
  <Page background="rgba(82, 133, 237, 1)">
    Test1
    {children}
  </Page>
)

export const Page2 = ({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  history = useHistory(),
  children = (
    <Button type="warn" onClick={() => history.push('/')}>
      push to Test1
    </Button>
  ),
}) => (
  <Page background="orange">
    Test2
    {children}
  </Page>
)
