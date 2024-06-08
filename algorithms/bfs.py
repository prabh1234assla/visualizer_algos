from collections import deque


def bfs(adjList, startNode: int, visited: list):
    q = deque()
    
    visited[startNode] = True
    q.append(startNode)
    
    while q:
        currentNode = q.popleft()
        print(currentNode, end=" ")
        
        for neighbour in adjList[currentNode]:
            if not visited[neighbour]:
                visited[neighbour] = True
                q.append(neighbour)


def addEdge(adjList, u: int, v: int):
    adjList[u].append(v)


def main():
    vertices = int(input("no. of vertices : "))
    
    adjList = [[] for _ in range(vertices)]
    
    for u in range(vertices):
        v_list = input("for " + str(u) + " vertex list no. of vertices you want edges with => ")
        for v in v_list.split(" "):
            addEdge(adjList, u, int(v))
            
    print(adjList)
    
    visited = [False] * vertices
    
    startNode = int(input("choose the start vertex"))
    
    print("bfs starting from vertex " + str(startNode) + " : ")
    
    bfs(adjList, startNode, visited)
    

if __name__ == "__main__":
    main()
