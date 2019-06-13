const d3 = require('d3')
const d3Drag = require('d3-drag').drag
const d3Event = require('d3-selection').event
const d3Select = require('d3-selection').select
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { getGraphMock } = require('../mocks/graph')
const { getTranslation } = require('../utils/d3-transform')

// Create graphSvg and rendering on server side
const createGraphSvg = () => {
  const dom = new JSDOM(`<!DOCTYPE html><svg></svg>`); // html file skull with a container svg for the d3 dataviz
  let graphData = getGraphMock()
  initGraph(graphData.nodes, graphData.relationships, dom)
  // console.log(dom.window.document.querySelector("svg").textContent)
}

const initGraph = (nodes, relationships, dom) => {
  console.time('server');
  // Listen to dragging of the SVG
  const svgdragstarted = (d) => {
    d3Event.sourceEvent.stopPropagation();
    d3Event.sourceEvent.preventDefault();
    // console.log("start")

    // Stop rendering
    simulation.stop()
  }
  const svgdragged = (d) => {
    // console.log(draggableSvg.attr("transform"))
    var t = getTranslation(draggableSvg.attr("transform"));
    // console.log(t)
    draggableSvg.attr("transform", "translate(" + [t[0] + d3Event.dx, t[1] + d3Event.dy] + ")")
    // console.log("drag: " + getTranslation(draggableSvg.attr("transform")));
  }
  const svgdragended = (d) => {
    // console.log("end")

  }
  let colors = d3.scaleOrdinal(d3.schemeCategory10);
  let svg = d3Select(dom.window.document.querySelector('svg'))
    .attr("class", "graph-view-svg")
    .attr("overflow", "hidden")
    .call(d3Drag()
      .on("start", svgdragstarted)
      .on("drag", svgdragged)
      .on("end", svgdragended)
    )
  let draggableSvg = svg.append("g")
    .attr("class", "draggable-svg")
    .attr("transform", "translate(0,0)")

  let width = +svg.attr("width"),
    height = +svg.attr("height"),
    node,
    link

  let relType,
    relTextPath
  // Define Arrow
  draggableSvg.append('defs').append('marker')
    .attr('id', 'arrow-head')
    .attr('viewBox', '-0 -5 10 10')
    .attr('refX', 13)
    .attr('refY', 0)
    .attr('orient', 'auto')
    .attr('markerWidth', 13)
    .attr('markerHeight', 13)
    .attr('xoverflow', 'visible')

    .append('path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke', 'none');

  let simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(200).strength(1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  const update = (links, nodes) => {
    // Relationship
    let linkGroup = draggableSvg.append("g").attr("class", "links")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "link")
    // Title
    linkGroup.append("title")
      .text(function (d) { return `Rel-[${d.type}]->`; });

    // Relationship line with the arrow
    link = linkGroup.append("line")
      // .attr("class", "link")
      .attr('marker-end', 'url(#arrow-head)')

    // Hidden virtual relationship lines for text direction
    // The textPath uses xlink:href:#rel-type-path to bind the virtual relationship line.
    relTextPath = linkGroup.append("path")
      .attr('class', 'rel-type-path')
      .attr('fill-opacity', '0')
      .attr('stroke-opacity', '0')
      .attr('id', function (d, i) { return 'rel-type-path' + i })
      .style("pointer-events", "none");

    // Text of relationship type
    relType = linkGroup.append("text")
      .style("pointer-events", "none")
      .attr('class', 'rel-type')
      .attr('id', function (d, i) { return 'rel-type' + i })
      .attr('font-size', 10)
      .attr('fill', '#aaa');
    // Virtual path of relationship type(Bind textPath direction to the relTextPath)
    relType.append('textPath')
      .attr('xlink:href', function (d, i) { return '#rel-type-path' + i })
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("startOffset", "50%")
      .text(function (d) { return d.type });

    // Node
    node = draggableSvg.append("g").attr("class", "nodes")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3Drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) // TODO refresh position
      );

    node.append("title")
      .text(function (d) { return `(node)-${d.id}`; });

    node.append("circle")
      .attr("r", 10)
      .style("fill", function (d, i) { return colors(i); })

    node.append("text")
      .attr("dy", -3)
      .text(function (d) { return d.name + ":" + d.label; });

    simulation
      .nodes(nodes)
      .on("tick", ticked)
      .on("end", updatePosition)
    simulation.force("link")
      .links(links);
  }

  const ticked = () => {
    // // Render it when the graph is stable enough
    if (simulation.alpha() <= 0.05) {
      // Stop rendering
      simulation.stop()
      console.timeEnd('server');
      // // Relocate links
      // link
      //   .attr("x1", function (d) { return (d.source).x; })
      //   .attr("y1", function (d) { return (d.source).y; })
      //   .attr("x2", function (d) { return (d.target).x; })
      //   .attr("y2", function (d) { return (d.target).y; });

      // // Relocate nodes
      // node
      //   .attr("transform", function (d) { return "translate(" + d.x + ", " + d.y + ")"; });

      // // Relocate virtual lines that the text based on
      // relTextPath.attr('d', function (d) {
      //   return 'M ' + (d.source).x + ' ' + (d.source).y + ' L ' + (d.target).x + ' ' + (d.target).y;
      // });

      // relType.attr('transform', function (d) {
      //   if ((d.target).x < (d.source).x) {
      //     let bbox = this.getBBox();

      //     let rx = bbox.x + bbox.width / 2;
      //     let ry = bbox.y + bbox.height / 2;
      //     return 'rotate(180 ' + rx + ' ' + ry + ')';
      //   }
      //   else {
      //     return 'rotate(0)';
      //   }
      // });
      // // Stop rendering
      // simulation.stop()
    }
  }

  const updatePosition = () => {
    // let max = { x: 0, y: 0 },
    //   min = { x: 0, y: 0 }
    // // Stop rendering
    // simulation.stop()
    // if (nodes.length > 0) {
    //   // Store positions of min and max nodes
    //   nodes.forEach((node) => {
    //     if ((node).x > max.x) {
    //       max.x = (node.x) as number
    //     }
    //     if ((node).y > max.y) {
    //       max.y = (node.y) as number
    //     }
    //     if ((node).x < min.x) {
    //       min.x = (node.x) as number
    //     }
    //     if ((node).y < min.y) {
    //       min.y = (node.y) as number
    //     }
    //   })
    //   // Set total size of SVG
    //   let width = max.x - min.x
    //   let height = max.y - min.y
    //   svg.attr("width", width)
    //   svg.attr("height", height)
    //   // Set visual size of SVG
    //   svg.attr('viewBox', `${min.x},${min.y},${width},${height}`)
    // }
  }

  const dragstarted = (d) => {
    if (!d3Event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
  }

  const dragged = (d) => {
    d.fx = d3Event.x;
    d.fy = d3Event.y;
  }

  const dragended = (d) => {
    if (!d3Event.active) simulation.alphaTarget(0);
    d.fx = undefined;
    d.fy = undefined;
  }

  // d3.json("graph.json", function (error, graph) {
  //   if (error) throw error;
  //   update(graph.links, graph.nodes);
  // })

  update(relationships, nodes)
}
module.exports = {
  createGraphSvg
}