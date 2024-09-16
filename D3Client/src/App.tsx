"use strict";

import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DfsForm from './components/forms/dfsForm.tsx';
import { jsonProps } from './components/types/dfs';
import { LinkInit, NodeInit } from './components/types/Data';
import ForceGraph from './components/ForceGraph.tsx';

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
  const [strength, setStrength] = useState<string>('0.1');
  const [data, setData] = useState<jsonProps>({
    iterations: [
      [0, 0],
      [1, 0],  // Starting from node 0, mark it as visited.
      [1, 1]   // Move to node 1, mark it as visited.
    ]
  });
  const [Nodes, setNodes] = useState<NodeInit[]>([
    { id: '0', group: 0, label: 'start-node', level: 0 },
    { id: '1', group: 0, label: 'not-start-node', level: 1 }
  ]
  );
  const [Links, setLinks] = useState<LinkInit[]>([
    { target: '0', source: '1', strength: 0.1 }
  ]
  );

  useEffect(() => {

    let [nodes, links] = buildGraph(nodeData, startNode, parseInt(vertexCount));
    nodes = nodes as NodeInit[];
    links = links as LinkInit[];
    setNodes([...nodes]);
    setLinks([...links]);

    const iterations = data.iterations;
    let index = 0;

    const interval = setInterval(() => {
      if (index < iterations.length) {

        let [nodes, links] = animate(Nodes as NodeInit[], Links as LinkInit[], iterations[index], startNode);
        nodes = nodes as NodeInit[];
        links = links as LinkInit[];
        setNodes([...nodes]);
        setLinks([...links]);

        console.log(nodes)

        ++index;
      } else {
        alert('Iterations Executed Successfully!!!');
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [startNode, nodeData, vertexCount, data, strength]);

  return (
    <>
      <main>
        <ForceGraph nodes={Nodes} links={Links} strength={+strength} />
        <DfsForm setStartNode={setStartNode} setNodeData={setNodeData} setVertexCount={setVertexCount} setData={setData} setStrength={setStrength} />
      </main>
    </>
  )
}

export default App;