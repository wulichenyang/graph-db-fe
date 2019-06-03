import React from 'react';
import { IGraphViewData } from '../../components/GraphView/types'
import GraphView from '../../components/GraphView/GraphView'

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
      nodes:[],
      links:[]
    }
  }
  componentDidMount() {
    this.setState({
      graphViewData: {
        nodes: [
          {
            id: 1,
            name: "Peter",
            label: "Person",
          },
          {
            id: 2,
            name: "Michael",
            label: "Person",
          },
          {
            id: 3,
            name: "Neo4j",
            label: "Database",
          },
          {
            id: 4,
            name: "Graph Database",
            label: "Database",
          }
        ],
        links: [
          {
            source: 1,
            target: 2,
            type: "KNOWS",
            since: 2010
          },
          {
            source: 1,
            target: 3,
            type: "FOUNDED"
          },
          {
            source: 2,
            target: 3,
            type: "WORKS_ON"
          },
          {
            source: 3,
            target: 4,
            type: "IS_A"
          }
        ]
      }
    })
  }
  render() {
    const { graphViewData } = this.state
    return (
      <>
        <h2>Graph Database</h2>
        <GraphView
          graphViewData={graphViewData}
          graphWidth={960}
          graphHeight={600}
        />
      </>
    );
  }
}

export default Main;
