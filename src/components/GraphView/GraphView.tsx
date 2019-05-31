import "./index.scss";
import { GraphViewWrapper } from './styled';
import React from 'react'

export interface IGraphViewDataItem {}

interface IProps {
  graphViewData: IGraphViewDataItem[]
}

const GraphView :React.FC<IProps> = (props) => {

  const { graphViewData } = props

  return (
    <GraphViewWrapper>
      <h2>graph IGraphViewDataItem</h2>
      {graphViewData}
    </GraphViewWrapper>
  );
}

export default GraphView