from collections import defaultdict

class Graph():
    
        def __init__(self, V: int, S: int, adjList: list):
            self.g = defaultdict(list)
            
            self.v = V
            
            self.colorNodes = [0] * V
            for u, v in adjList:
                self.addEdge(u, int(v))
            
            self.print_adjacentList()
            
            self.startNode = S
            
            print("bfs starting from vertex " + str(self.startNode) + " :", end=" ")
            
        def addEdge(self, u: int, v: int):
            self.g[u].append(v)
            
        def print_adjacentList(self):
            print(dict(self.g))
            
        def dfs_util(self, startNode: int, visited: set):
            visited.add(startNode)
            print(startNode)
            self.colorNodes[startNode] = 1
            print(self.colorNodes)
            
            for u in self.g[startNode]:
                if u not in visited:
                    self.dfs_util(u, visited)
                    
        def dfs(self):
            visited = set()
            self.dfs_util(self.startNode, visited)
            return visited
        
if __name__=="__main__":
    
    # Dummy data
    x = [[0, 1], [0, 2], [0, 3], [1, 3], [2, 4], [3, 5], [3, 6], [4, 7], [4, 5], [5, 2]]
    v = 8
    s = 0
    g = Graph(v, s, x)
    print(list(g.dfs()))