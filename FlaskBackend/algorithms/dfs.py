from collections import defaultdict

class Graph():
    
        def __init__(self, V: int, S: int, adjList: list):
            self.g = defaultdict(list)
            
            self.v = V
            
            self.colorNodes = [0] * V
            for u, v in adjList:
                self.addEdge(u, int(v))
                
            self.Iterations = [[0] * V]
            
            self.print_adjacentList()
            
            self.startNode = S
            
            print("bfs starting from vertex " + str(self.startNode) + " :", end=" ")
            
        def addEdge(self, u: int, v: int):
            self.g[u].append(v)
            self.g[v].append(u)
            
        def print_adjacentList(self):
            print(dict(self.g))
            
        def dfs_util(self, startNode: int, visited: set):
            # print(startNode)
            visited.add(startNode)
            # print(visited)
            self.colorNodes[startNode] = 1
            self.Iterations.append(self.colorNodes.copy())
            # print(self.g)
            
            # print(self.Iterations, self.colorNodes)
            for u in self.g[startNode]:
                if u not in visited:
                    self.dfs_util(u, visited)
                    
        def dfs(self):
            visited = set()
            self.dfs_util(self.startNode, visited)
            print(self.Iterations)
            return visited
        
        def getIterations(self):
            return self.Iterations
        
if __name__=="__main__":
    
    # Dummy data
    x = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 7], [5, 8], [6, 9], [7, 10], [8, 11], [9, 12], [10, 13], [11, 14], [12, 15], [13, 16], [14, 17], [15, 18], [16, 19]]
    v = 20
    s = 19
    g = Graph(v, s, x)
    print(g.dfs())
    
    l = g.getIterations()
    print(l)