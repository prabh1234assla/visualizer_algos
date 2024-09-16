from collections import deque

def bfs(adjList, startNode: int, visited: list, colorNodes: list):
    q = deque()
    
    visited[startNode] = True
    colorNodes.append(startNode)
    q.append(startNode)
    print(adjList)
    
    while q:
        currentNode = q.popleft()
        print('*'*10)
        print(currentNode)
        
        for neighbour in adjList[currentNode]:
            print(neighbour)
            if not visited[neighbour]:
                visited[neighbour] = True
                colorNodes.append(neighbour)
                q.append(neighbour)
        print('*'*20)
                
    return colorNodes


def addEdge(adjList, u: int, v: int):
    adjList[u].append(v)
    adjList[v].append(u)


def main():
    vertices = 20
    
    adjList = [[] for _ in range(vertices)]
    adj = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 7], [5, 8], [6, 9], [7, 10], [8, 11], [9, 12], [10, 13], [11, 14], [12, 15], [13, 16], [14, 17], [15, 18], [16, 19]]
    colorNodes = []
    
    for u, v in adj:
        addEdge(adjList, u, int(v))
            
    print(adjList)
    
    visited = [False] * vertices
    
    startNode = 10
    
    x = bfs(adjList, startNode, visited, colorNodes)
    print(x)
    
if __name__ == "__main__":
    main()
