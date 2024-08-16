"use strict";

import { ReactNode, useEffect, useRef, useState } from 'react';
import './App.css';
import ForceGraph from './components/ForceGraph.ts';
import DfsForm from './components/forms/dfsForm.tsx';
import { jsonProps } from './components/types/dfs';
import { LinkInit, NodeInit } from './components/types/Data';

function nodesData(id: string, startNode: string, group: number = 0) {

  const level = id === startNode ? 0 : 1;
  const label = id === startNode ? "start-node" : "not-start-node";

  return {
    id,
    group,
    label,
    level
  }
}

function linksData(target: string, source: string) {

  return {
    target: String(target),
    source: String(source),
    strength: 0.1
  }
}

function animate(nodes: NodeInit[], links: LinkInit[], data: number[], startNode: string) {

  nodes = nodes.map((e, i) => nodesData(e.id, startNode, data[i]));

  links = links.map((e, _) => linksData(e.target as string, e.source as string));

  return [nodes, links];

}

function buildGraph(nodeData: string, startNode: string, vertexCount: number) {
  const graph = nodeData.trim().match(/\[\d+, \d+\]/g)?.map(item => JSON.parse(item));

  const nodes = [...Array(vertexCount)]?.map((_, i) => nodesData(String(i), startNode)) as NodeInit[];

  const links = graph?.map((edge, _) => linksData(edge[0], edge[1])) as LinkInit[];

  return [nodes, links];
}

function App() {
  const [startNode, setStartNode] = useState<string>('1');
  const [nodeData, setNodeData] = useState<string>("[0, 1]");
  const [vertexCount, setVertexCount] = useState<string>('2');
  const [data, setData] = useState<jsonProps>({
    iterations: [
      [0, 0],
      [1, 0],  // Starting from node 0, mark it as visited.
      [1, 1]   // Move to node 1, mark it as visited.
    ]
  });
  const [Nodes, setNodes] = useState<NodeInit[]>();
  const [Links, setLinks] = useState<LinkInit[]>();

  const DivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log('twgfgfs');

    const [nodes, links] = buildGraph(nodeData, startNode, parseInt(vertexCount));
    setNodes([...nodes]);
    setLinks([...links]);
    console.log(nodes, links);

    // const iterations = data.iterations;
    // let index = 0;

    // const interval = setInterval(() => {
    //   if (index < iterations.length) {
    //     // console.log(iterations)

    //     console.log(Nodes, Links);

    //     const [nodes, links] = animate(Nodes as NodeInit[], Links as LinkInit[], iterations[index], startNode);
    //     console.log(nodes, links)
        if (DivRef && DivRef.current) {
          // console.log(Nodes, Links, n, l);
          DivRef.current.innerHTML = "";
          DivRef.current.appendChild(ForceGraph({ nodes, links }));
          DivRef.current.style.width = '100vw';
          DivRef.current.style.height = '100vh';

        }

  //       ++index;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   })


  }, [])

  // useEffect(() => {
  //   // alert('wtf');

  //   const iterations = data.iterations;

  //   console.log(iterations)

  //   iterations.map((e, _) => animate(Nodes as NodeInit[], Links as LinkInit[], e, startNode));

  //   console.log(Nodes, Links);

  // }, []);

  return (
    <>
      <main>
        <div ref={DivRef}></div>
        <DfsForm startNode={startNode} setStartNode={setStartNode} nodeData={nodeData} setNodeData={setNodeData} vertexCount={vertexCount} setVertexCount={setVertexCount} setData={setData} />
      </main>
    </>
  )
}

export default App;