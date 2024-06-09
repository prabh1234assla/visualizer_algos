import heapq


class Graph:

    def __init__(self, V):
        self.V = V
        self.adj = [[] for _ in range(V)]
        self.distances = [float("Inf")] * self.V
        
    def addEdge(self, u, v, w):
        self.adj[u].append([v, w])
        self.adj[v].append([u, w])
        
    def createEdges(self, edges):
        for e in range(len(edges)):
            self.addEdge(*edges[e])
        
    def dijkstra(self, src):
        pq = []
        
        heapq.heappush(pq, (src, 0))
        
        self.distances[src] = 0
        print(self.adj)
        
        while pq:
            u, _ = heapq.heappop(pq)
            
            for v, wt in self.adj[u]:
                
                if self.distances[u] + wt <= self.distances[v]:
                    
                    self.distances[v] = self.distances[u] + wt
                    heapq.heappush(pq, [v, self.distances[v]])
        
    def listDistanceFromSource(self):
        for v in range(self.V):
            print(str(v) + " : " + str(self.distances[v]))

            
def main():
    edges = [[0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11], [7, 6, 1], [7, 8, 7], [2, 3, 7], [2, 5, 4], [2, 8, 2], [8, 6, 6], [6, 5, 2], [3, 4, 9], [3, 5, 14], [5, 4, 10]]
    
    g = Graph(9)
    g.createEdges(edges)
    
    g.dijkstra(0)
    g.listDistanceFromSource()

    
if __name__ == "__main__":
    main()
