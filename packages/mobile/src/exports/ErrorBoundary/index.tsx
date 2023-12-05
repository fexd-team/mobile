import React, { Component } from 'react'
import { run, get } from '@fexd/tools'

import Fallback from '../Fallback'
import Button from '../BasicButton'
import { ErrorBoundaryProps, ErrorBoundaryState } from './type'

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    console: false,
    fallback: (error: Error, retry: () => void, boundaryProps: ErrorBoundaryProps) => (
      <Fallback
        console={boundaryProps.console}
        error={error}
        footer={() => (
          <Button block type="primary" size="small" onClick={retry}>
            Retry
          </Button>
        )}
      >
        {get(error, 'message')}
      </Fallback>
    ),
  }

  state = {
    error: undefined,
  }

  componentDidCatch(error: Error) {
    const { onError } = this.props

    run(onError, undefined, error)

    this.setState({
      error,
    })
  }

  retry = () => {
    this.setState({
      error: undefined,
    })
  }

  render() {
    const { children, fallback } = this.props
    const { error } = this.state

    return (error ? run(fallback, undefined, error, this.retry, this.props) : children) as JSX.Element
  }
}
