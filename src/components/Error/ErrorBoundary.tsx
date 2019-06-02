import React from 'react'
import styled from 'styled-components'
import { StyledErrorBoundaryButton } from '../Buttons/index'

const ErrorWrapper = styled.div`
  background-color: #fbf1f0;
  padding: 10px;
  text-align: center;
  color: #da4433;
`

interface IProps {
  caption?: string
}

interface IState {
  errorInfo: object,
  error : Error | null
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
  readonly state: IState = {
    errorInfo: {},
    error: null
  }

  componentDidCatch (error: Error | null, errorInfo: object) {
    this.setState({ errorInfo, error })
  }

  render () {
    if (this.state.error) {
      return (
        <ErrorWrapper>
          <p>
            Something went wrong: <em>"{this.state.error.toString()}"</em> and
            the application can't recover.
          </p>
          <div style={{ marginTop: '5px' }}>
            <StyledErrorBoundaryButton onClick={() => window.location.reload()}>
              {this.props.caption || 'Reload application'}
            </StyledErrorBoundaryButton>
          </div>
        </ErrorWrapper>
      )
    }
    return this.props.children
  }
}
