import * as d3 from "d3";
import { NodeInit, LinkInit, D3NodeInit } from "./types/Data";
import LinksHighlight from "./Utils/utils";

type Props = {
    nodes: NodeInit[],
    links: LinkInit[]
}

function ForceGraph({
    nodes, // an iterable of node objects (typically [{id}, …])
    links // an iterable of link objects (typically [{source, target}, …])
}, {
    nodeId = d => d.id,
    nodeLevel = d => d.level, // given d in nodes, returns a unique identifier (string)
    nodeGroup, // given d in nodes, returns an (ordinal) value for color
    nodeGroups, // an array of ordinal values representing the node groups
    nodeTitle, // given d in nodes, a title string
    nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
    nodeStroke = "#fabe95", // node stroke color
    nodeStrokeWidth = 4, // node stroke width, in pixels
    nodeStrokeOpacity = 0.3, // node stroke opacity
    nodeRadius = 6, // node radius, in pixels
    nodeStrength = d => d.index - 20,
    linkSource = ({ source }) => source, // given d in links, returns a node identifier string
    linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
    linkStroke = "#E57B63", // link stroke color
    linkStrokeOpacity = 1, // link stroke opacity
    linkStrokeWidth = 2.5, // given d in links, returns a stroke width in pixels
    linkStrokeLinecap = "round", // link stroke linecap
    linkStrength,
    colors = d3.schemeTableau10, // an array of color strings, for the node groups
    width = '100%', // outer width, in pixels
    height = '100%', // outer height, in pixels
    invalidation // when this promise resolves, stop the simulation
} = {}) {
    // Compute values.

    const N = d3.map(nodes, nodeId).map(intern);
    const Ll = d3.map(nodes, nodeLevel).map(intern);
    const R = typeof nodeRadius !== "function" ? null : d3.map(nodes, nodeRadius);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
    const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
    const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);


    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({ id: N[i], level: Ll[i] }));
    links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));

    // console.log(links)

    // Compute default domains.
    if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

    // Construct the scales.
    const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);
    if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
    if (linkStrength !== undefined) forceLink.strength(linkStrength);

    const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center", d3.forceCenter())
        .on("tick", ticked);

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-200 -200 960 500")

    const link = svg.append("g")
        .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)
        .join("line");

    const node = svg.append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .call(drag(simulation))
        .attr("stroke-opacity", d => d.group === 0 ? 1 : 0)
        .attr("fill", d => d.level === 0 ? "#D0B8A8" : "#8E402E")
        .on("mouseenter", (event, d) => LinksHighlight(event, "enter", d as D3NodeInit))
        .on("mouseleave", (event, d) => LinksHighlight(event, "leave", d as D3NodeInit))

    const Texts = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append("text")
        .attr("dx", 10)
        .attr("dy", 0)
        .style("fill", "#661F10")
        .style("font-size", "0.6em")
        .style("font-weight", "700")
        .style("font-family", "Monospace")
        .text(function (d) { return d.id });

    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
    if (L) link.attr("stroke", ({ index: i }) => L[i]);
    if (G) node.attr("fill", ({ index: i }) => color(G[i]));
    if (R) node.attr("r", ({ index: i }) => R[i]);
    if (T) node.append("title").text(({ index: i }) => T[i])
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);
    if (invalidation != null) invalidation.then(() => simulation.stop());

    function intern(value) {
        return value !== null && typeof value === "object" ? value.valueOf() : value;
    }

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        Texts
            .attr('x', node => node.x)
            .attr('y', node => node.y);
    }

    function drag(simulation) {
        
        function dragstarted(event) {
            getNeighbors(event.subject.id);
            console.log(event)
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    function getNeighbors(n) {

        console.log("frhhhhhhhhhhhhhhhhhhhhhhhhhheut3ht4t4h4BIURWDFFDKJDVKJDVJKFZJK");

        const kk = links.filter((s, t, i) => s.source.id == n || s.target.id == n);
        links.map((s, t, i) => console.log(s, t, i))

        console.log(kk);

        // return link.reduce((neighbors, link) => {
        //     if (link.target.id === node.id) {
        //         neighbors.push(link.source.id)
        //     } else if (link.source.id === node.id) {
        //         neighbors.push(link.target.id)
        //     } return neighbors
        // }, [node.id])
    }

    // function isNeighborLink(node, link) {
    //     return link.target.id === node.id || link.source.id === node.id
    // }
    // function getNodeColor(node, neighbors) {
    //     if (neighbors.indexOf(node.id)) {
    //         return node.level === 1 ? 'blue' : 'green'
    //     }
    //     return node.level === 1 ? 'red' : 'gray'
    // } function getTextColor(node, neighbors) {
    //     return neighbors.indexOf(node.id) ? 'green' : 'black'
    // } function getLinkColor(node, link) {
    //     return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
    // }

    function selectNode(n) {
        console.log(n)

        console.log("dnkjdjksjdk")
        // const neighbors = getNeighbors(node);

        // nodeElements
        //   .attr('fill', node => getNodeColor(node, neighbors))
        // textElements
        //     .attr('fill', node => getTextColor(node, neighbors))
        // linkElements
        //     .attr('stroke', link => getLinkColor(selectedNode, link))
    }

    node.call(selectNode)

    return Object.assign(svg.node(), { scales: { color } });
}

export default ForceGraph;