import React, { Component } from 'react';
import { IGraphViewDataItem } from '../components/GraphView/GraphView'
import GraphView from '../components/GraphView/GraphView'
// import { MainWrapper } from '../components/Wrappers/styled'

interface IState {
  graphViewData: IGraphViewDataItem[]
}

class Home extends Component<{}, IState> {
  // constructor(props: IProps) {
  //   super(props)
  // }
  readonly state: IState = {
    graphViewData: []
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