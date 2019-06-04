import "./index.less";
import { GraphViewWrapper } from './styled';
import React from 'react'
import * as d3 from "d3";
import {drag as d3Drag} from 'd3-drag';
import {
  event as d3Event,
  select as d3Select
} from 'd3-selection';

import {
  Node,
  Relationship,
  D3dom,
  IGraphViewData
} from './types'

interface IProps {
  graphViewData: IGraphViewData
  graphWidth: number,
  graphHeight: number,
}

class GraphView extends React.Component<IProps, {}> {

  static defaultProps = {
    graphViewData: {},
    graphWidth: 960,
    graphHeight: 400,
  };

  componentWillReceiveProps({ graphViewData }: IProps) {
    let colors: any = d3.scaleOrdinal(d3.schemeCategory10);

    let svg: D3dom = d3Select("svg")
    let width: number = +svg.attr("width"),
      height: number = +svg.attr("height"),
      node: D3dom,
      link: D3dom

    let edgePaths: D3dom,
      edgeLabels: D3dom
      
    d3Select("svg").append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 13)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 13)
      .attr('markerHeight', 13)
      .attr('xoverflow', 'visible')

      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999')
      .style('stroke', 'none');

    let simulation = d3.forceSimulation()
      // ?????? d: Node????
      .force("link", d3.forceLink().id(function (d: Node) { return d.id; }).distance(100).strength(1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const update = (links: Relationship[], nodes: Node[]) => {
      link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr('marker-end', 'url(#arrowhead)')

      link.append("title")
        .text(function (d: Relationship) { return d.type; });

      edgePaths = svg.selectAll(".edge-path")
        .data(links)
        .enter()
        .append('path')
        .attr('class', 'edge-path')
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .attr('id', function (d: Relationship, i: number) { return 'edge-path' + i })
        .style("pointer-events", "none");

      edgeLabels = svg.selectAll(".edge-label")
        .data(links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edge-label',)
        .attr('id', function (d: Relationship, i: number) { return 'edge-label' + i },)
        .attr('font-size', 10,)
        .attr('fill', '#aaa');

      edgeLabels.append('textPath')
        .attr('xlink:href', function (d: Relationship, i: number) { return '#edge-path' + i })
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(function (d: Relationship) { return d.type });

      node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3Drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
        );

      node.append("circle")
        .attr("r", 5)
        .style("fill", function (d: Node, i: number) { return colors(i); })

      node.append("title")
        .text(function (d: Node) { return d.id; });

      node.append("text")
        .attr("dy", -3)
        .text(function (d: Node) { return d.name + ":" + d.label; });

      simulation
        .nodes(nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(links);
    }

    const ticked = () => {
      link
        .attr("x1", function (d: Relationship) { return (d.source as Node).x; })
        .attr("y1", function (d: Relationship) { return (d.source as Node).y; })
        .attr("x2", function (d: Relationship) { return (d.target as Node).x; })
        .attr("y2", function (d: Relationship) { return (d.target as Node).y; });

      node
        .attr("transform", function (d: Node) { return "translate(" + d.x + ", " + d.y + ")"; });

      edgePaths.attr('d', function (d: Relationship) {
        return 'M ' + (d.source as Node).x + ' ' + (d.source as Node).y + ' L ' + (d.target as Node).x + ' ' + (d.target as Node).y;
      });

      edgeLabels.attr('transform', function (this: D3dom, d: Relationship) {
        if ((d.target as any).x < (d.source as any).x) {
          let bbox = (this).getBBox();

          let rx = bbox.x + bbox.width / 2;
          let ry = bbox.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
        }
        else {
          return 'rotate(0)';
        }
      });
    }

    const dragstarted = (d: Node) => {
      if (!d3Event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x;
      d.fy = d.y;
    }

    const dragged = (d: Node) => {
      d.fx = d3Event.x;
      d.fy = d3Event.y;
    }

    const dragended = (d: Node) => {
      if (!d3Event.active) simulation.alphaTarget(0);
      d.fx = undefined;
      d.fy = undefined;
    }

    // d3.json("graph.json", function (error: any, graph: any) {
    //   if (error) throw error;
    //   update(graph.links, graph.nodes);
    // })

    update(graphViewData.links, graphViewData.nodes)
  }
  render() {
    const { graphWidth, graphHeight } = this.props

    return (
      <GraphViewWrapper>
        <h2>graph IGraphViewDataItem</h2>
        <svg width={graphWidth} height={graphHeight}></svg>
      </GraphViewWrapper>
    );
  }
}

export default GraphView