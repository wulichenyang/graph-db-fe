import React from 'react';
import { IGraphViewData } from '../../components/GraphView/types'
import GraphView from '../../components/GraphView/GraphView'
import {
  getGraphViewData
} from '../../api/graph'

interface Iprops {

}

interface IState {
  graphViewData: IGraphViewData
}

class Main extends React.Component<Iprops, IState> {
  // constructor(props: IProps) {
  //   super(props)
  // }
  readonly state: IState = {
    graphViewData: {
      nodes: [],
      relationships: []
    }
  }
  
  async componentDidMount() {
    const res: Ajax.AjaxResponse = await getGraphViewData()
    if(res && res.code === 0) {
      // console.log(res)
      this.setState({
        graphViewData: {
          nodes: res.data.nodes,
          relationships: res.data.relationships
        }
      })
    }
  }
  render() {
    const { graphViewData } = this.state
    return (
      <>
        <GraphView
          nodes={graphViewData.nodes}
          relationships={graphViewData.relationships}
          graphWidth={960}
          graphHeight={600}
        />
      </>
    );
  }
}

export default Main;
