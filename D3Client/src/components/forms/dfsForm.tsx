import { useRef, useState } from "react";
import "../../styles/Dfs.css";
import { jsonProps } from "../types/dfs";

import { FC } from "react";

type Props = {
    setStartNode: React.Dispatch<React.SetStateAction<string>>,
    setNodeData: React.Dispatch<React.SetStateAction<string>>,
    setVertexCount: React.Dispatch<React.SetStateAction<string>>,
    setData: React.Dispatch<React.SetStateAction<jsonProps>>
}

const DfsForm: FC<Props> = ({ setStartNode, setNodeData, setVertexCount, setData }) => {
    const graphDataRef = useRef<HTMLTextAreaElement>(null);
    const startNodeRef = useRef<HTMLInputElement>(null);
    const vertexRef = useRef<HTMLInputElement>(null);
    const [lstartNode, setLStartNode] = useState<string>('19');
    const [lnodeData, setLNodeData] = useState<string>("[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 7], [5, 8], [6, 9], [7, 10], [8, 11], [9, 12], [10, 13], [11, 14], [12, 15], [13, 16], [14, 17], [15, 18], [16, 19]");
    const [lvertexCount, setLVertexCount] = useState<string>('20');

    async function submitForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        try {
            const graph = lnodeData.trim().match(/\[\d+, \d+\]/g)?.map(item => JSON.parse(item));

            // Prepare the JSON object
            const inputJson = {
                startNode: lstartNode,
                vertexCount: lvertexCount,
                graph
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

                const data = await response.json() as jsonProps;
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

            <button type="button" onClick={e => submitForm(e)}>visualize</button>

        </form>
    </>)
}

export default DfsForm;