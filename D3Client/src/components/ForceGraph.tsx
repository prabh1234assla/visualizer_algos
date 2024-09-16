import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { NodeInit, LinkInit, D3NodeInit } from "./types/Data";
import LinksHighlight from "./Utils/utils";

type ForceGraphProps = {
  nodes: NodeInit[];
  links: LinkInit[];
  strength: number;
};

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links, strength }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Set up dimensions and colors
    const width = 1000;
    const height = 700;
    const colors = d3.schemeTableau10;

    // Create the SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("preserveAspectRatio", "xMinYMin meet");

    // Compute values.
    const N = d3.map(nodes, d => d.id);
    const G = d3.map(nodes, d => d.group);
    const L = d3.map(nodes, d => d.label);
    const Ll = d3.map(nodes, d => d.level);
    const LS = d3.map(links, ({ source }) => source);
    const LT = d3.map(links, ({ target }) => target);
    const S = d3.map(links, ({ strength }) => strength);

    nodes = nodes.map((_, i) => ({ id: N[i], level: Ll[i], group: G[i], label: L[i] }));
    links = links.map((_, i) => ({ source: LS[i], target: LT[i], strength: S[i] }));

    const color = d3.scaleOrdinal<string>(colors);

    console.log(strength);

    const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);
    const forceNode = d3.forceManyBody().strength(strength);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("center", d3.forceCenter())
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("stroke", "#E57B63")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 2.5)
      .attr("stroke-linecap", "round")
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("stroke", "yellow")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 4)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 6)
      .call(drag(simulation))
      .attr("stroke-opacity", d => (d.group === 0 ? 0 : 1))
      .attr("fill", d => (d.level === 0 ? "#D0B8A8" : "#8E402E"))
      .on("mouseenter", (event, d) =>
        LinksHighlight(event, "enter", d as D3NodeInit)
      )
      .on("mouseleave", (event, d) =>
        LinksHighlight(event, "leave", d as D3NodeInit)
      );

    console.log(node)

    const Texts = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dx", 10)
      .attr("dy", 0)
      .style("fill", "#661F10")
      .style("font-size", "0.6em")
      .style("font-weight", "700")
      .style("font-family", "Monospace")
      .text(d => d.id);

    function ticked() {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node.attr("cx", d => d.x).attr("cy", d => d.y);

      Texts.attr("x", d => d.x).attr("y", d => d.y);
    }

    function drag(simulation) {
      function dragstarted(event) {
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

      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }

    return () => {
      // Clean up the SVG and force simulation
      svg.selectAll("*").remove();
      simulation.stop();
    };
  }, [nodes, links]);

  return <svg style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', margin: '4%' }} ref={svgRef}></svg>;
};

export default ForceGraph;