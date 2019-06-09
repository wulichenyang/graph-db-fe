import React, { Component } from 'react';
import { IGraphViewData } from '../components/GraphView/types'
import GraphView from '../components/GraphView/GraphView'
// import { MainWrapper } from '../components/Wrappers/styled'

interface IState {
  graphViewData: IGraphViewData
}

class Home extends Component<{}, IState> {
  // constructor(props: IProps) {
  //   super(props)
  // }
  readonly state: IState = {
    graphViewData: {
      nodes: [],
      relationships: []
    }
  }
  componentDidMount() {
    this.setState({

    })
  }
  render() {
    const { graphViewData } = this.state

    return (
      null
      // <MainWrapper>
      //   <h2>Graph Database</h2>
      //   <GraphView
      //     graphViewData={graphViewData}
      //   />
      // </MainWrapper>
    )
  }
}

export default Home