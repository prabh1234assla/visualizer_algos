import { useRef, useState } from "react";
import "../../styles/Dfs.css";
import { jsonProps } from "../types/dfs";

import { FC } from "react";

type Props = {
    setStartNode: React.Dispatch<React.SetStateAction<string>>,
    setNodeData: React.Dispatch<React.SetStateAction<string>>,
    setVertexCount: React.Dispatch<React.SetStateAction<string>>,
    setData: React.Dispatch<React.SetStateAction<jsonProps>>,
    setStrength: React.Dispatch<React.SetStateAction<string>>
}

const DfsForm: FC<Props> = ({ setStartNode, setNodeData, setVertexCount, setData, setStrength }) => {
    const graphDataRef = useRef<HTMLTextAreaElement>(null);
    const startNodeRef = useRef<HTMLInputElement>(null);
    const vertexRef = useRef<HTMLInputElement>(null);
    const strengthRef = useRef<HTMLInputElement>(null);

    const [lstartNode, setLStartNode] = useState<string>('1');
    const [lnodeData, setLNodeData] = useState<string>("[0, 1]");
    const [lvertexCount, setLVertexCount] = useState<string>('2');
    const [lstrength, setLStrength] = useState<string>('0');

    async function submitForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        try {
            // Prepare the JSON object
            const inputJson = {
                startNode: lstartNode,
                vertexCount: lvertexCount,
                graph: lnodeData.trim().match(/\[\d+, \d+\]/g)?.map(item => JSON.parse(item))
            };

            // Send the JSON to the Flask endpoint
            try {
                const response = await fetch('http://127.0.0.1:8080/dfs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputJson)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setStartNode(lstartNode);
                setNodeData(lnodeData);
                setVertexCount(lvertexCount);
                setStrength(lstrength);

                const data = await response.json() as jsonProps;
                console.log(data);
                setData(data);

            } catch (error: any) {
                alert("An error occurred: " + error.message);
            }

        } catch (e: any) {
            alert("Invalid JSON format for graph :: " + e.message);
            return;
        }

    }

    return (<>
        <form id="form">

            <label htmlFor="start-node">Start Node:
                <br />
                <input ref={startNodeRef} id="start-node" name="start-node" value={lstartNode} onInput={e => setLStartNode(e.currentTarget.value)} required />
            </label>
            <br />

            <label htmlFor="vertex">Vertices:
                <br />
                <input ref={vertexRef} id="vertex" name="vertex" value={lvertexCount} onInput={e => setLVertexCount(e.currentTarget.value)} required />
            </label>
            <br />

            <label htmlFor="graph">Graph (as adjacency list):
                <br />
                <textarea ref={graphDataRef} id="graph" name="graph" rows={6} value={lnodeData} onInput={e => setLNodeData(e.currentTarget.value)} required></textarea>
            </label>
            <br />

            <label htmlFor="strength">Strength (current {lstrength}):
                <br />
                <input ref={strengthRef} type="range" id="strength" name="strength" min="-500" max="500" step="10" value={lstrength} onChange={e => setLStrength(e.currentTarget.value)} required />
            </label>
            <br />

            <button type="button" onClick={e => submitForm(e)}>visualize</button>

        </form>
    </>)
}

export default DfsForm;