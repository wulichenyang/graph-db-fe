import React, { Fragment } from 'react';
import { IGraphViewDataItem } from '../../components/GraphView/GraphView'
import GraphView from '../../components/GraphView/GraphView'

interface Iprops {

}

interface IState {
  graphViewData: IGraphViewDataItem[]
}

class Main extends React.Component<Iprops, IState> {
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
      <Fragment>
        <h2>Graph Database</h2>
        <GraphView
          graphViewData={graphViewData}
        />
      </Fragment>
    );
  }
}


export default Main;
