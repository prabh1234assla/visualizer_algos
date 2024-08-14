from collections import defaultdict

class Graph():

        def __init__(self):
            self.g = defaultdict(list)
            
        def addEdge(self, u: int, v: int):
            self.g[u].append(v)
            
        def print_adjacentList(self):
            print(self.g)
            
        def dfs_util(self, startNode: int, visited: set):
            visited.add(startNode)
            print(startNode, end=" ")
            
            for u in self.g[startNode]:
                if u not in visited:
                    self.dfs_util(u, visited)
            
        def dfs(self, startNode):
            visited = set()
            self.dfs_util(startNode, visited)


if __name__ == "__main__":
    g = Graph()

    vertices = int(input("no. of vertices : "))
    
    adjList = [[] for _ in range(vertices)]
    
    for u in range(vertices):
        v_list = input("for " + str(u) + " vertex list no. of vertices you want edges with => ")
        for v in v_list.split(" "):
            g.addEdge(u, int(v))
            
    g.print_adjacentList()
    
    visited = [False] * vertices
    
    startNode = int(input("choose the start vertex "))
    
    print("bfs starting from vertex " + str(startNode) + " :", end=" ")
    
    g.dfs(startNode)
