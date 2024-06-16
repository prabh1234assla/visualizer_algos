import heapq

def prims(V, E, edges):
    adjList = [[] for _ in range(V)]
    
    for i in range(E):
        u, v, wt = edges[i]
        adjList[u].append((v, wt))
        adjList[v].append((u, wt))
        
    priority_Queue = []
    visited = [False] * V
    
    heapq.heappush(priority_Queue, (0, 0))
    
    result = 0
    
    while(priority_Queue):
        u, wt = heapq.heappop(priority_Queue)
        
        if(visited[u]):
            continue
        
        result += wt
        
        visited[u] = True
        
        for v, wt in adjList[u]:
            if not visited[v]:
                heapq.heappush(priority_Queue, (v, wt))
                
    return result


def main():
    edges = [[0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11], [7, 8, 7], [7, 6, 1], [2, 3, 7], [2, 5, 4], [2, 8, 2], [8, 6, 6], [6, 5, 2], [3, 4, 9], [3, 5, 14], [5, 4, 10]]
    res = prims(9, 14, edges)
    print(res)

    
if __name__ == "__main__":
    main()
