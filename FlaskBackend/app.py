from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithms.dfs import Graph
import json

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app, origins="*")
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/dfs', methods=['POST'])
@cross_origin()
def dfs_endpoint():
    data = request.json
    V = int(data.get("vertexCount"))
    adj_list = data.get("graph")
    S = int(data.get("startNode"))
    
    print(V, S, len(adj_list))
    print(adj_list[0])

    g = Graph(V, S, adj_list)
    g.dfs()
    iterations = g.getIterations()
    response = {
        "iterations": iterations
    }
    return jsonify(response)
    
if __name__=="__main__":
    app.run(debug=True, port=8080)
