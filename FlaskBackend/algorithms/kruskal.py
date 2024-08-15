class Graph:

    def __init__(self, V):
        self.g = []
        self.V = V
        
    def addEdge(self, u, v, w):
        self.g.append([u, v, w])
        
    def find(self, parent, v):
        if(parent[v] != v):
            parent[v] = self.find(parent, parent[v])     
            
        return parent[v]
    
    def union(self, parent, rank, x, y):
        if rank[x] < rank[y]:
            parent[x] = y
        elif rank[y] > rank[x]:
            parent[y] = x   
        else:
            parent[y] = x
            rank[x] += 1
            
    def kruskal(self):
        result = []
        i = 0
        j = 0
        minCost = 0
        
        self.g = sorted(self.g, key=lambda item: item[2])
        
        parent = []
        rank = []
        
        for v in range(self.V):
            parent.append(v)
            rank.append(0)
        
        while j < self.V - 1:
            u, v, w = self.g[i]
            i += 1
            
            x = self.find(parent, u)
            y = self.find(parent, v)
            
            if x is not y:
                j += 1
                result.append([u, v, w])
                minCost += w
                self.union(parent, rank, x, y)
        
        return minCost
    
def main():
    V = 9
    edges = [[0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11], [7, 8, 7], [7, 6, 1], [2, 3, 7], [2, 5, 4], [2, 8, 2], [8, 6, 6], [6, 5, 2], [3, 4, 9], [3, 5, 14], [5, 4, 10]]
    
    g = Graph(V)
    for e in range(len(edges)):
        g.addEdge(*edges[e])
        
    result = g.kruskal()
    print(result)
    
    
if __name__ == "__main__":
    main()