class Graph:

    def __init__(self, V):
        self.V = V
        self.g = []
        self.distances = [float("Inf")] * self.V
        
    def addEdge(self, u, v, w):
        self.g.append([u, v, w])
        
    def createGraph(self, edges):
        for e in range(len(edges)):
            self.addEdge(*edges[e])
        
    def bellman_ford(self, src):
        
        self.distances[src] = 0
        
        for _ in range(self.V - 1):
        
            for u, v, wt in self.g:
                print(self.distances)
                d3.js
                self.distances[v] = min(self.distances[v], self.distances[u] + wt)
                    
                    
        for u, v, wt in self.g:
            
            if self.distances[v] > self.distances[u] + wt:
                print("Graph contains negative weight cycle")
                return
            
        for v in range(self.V):
            print(str(v) + " -> " + str(self.distances[v]))

            
def main():

    g = Graph(6)
    g.addEdge(0, 1, 5)
    g.addEdge(1, 2, 1)
    g.addEdge(1, 3, 2)
    g.addEdge(2, 4, 1)
    g.addEdge(3, 4, -1)
    g.addEdge(3, 5, 2)
    g.addEdge(3, 4, -1)
    g.addEdge(4, 5, -3)
    
    g.bellman_ford(0)

    
if __name__ == "__main__":
    main()
