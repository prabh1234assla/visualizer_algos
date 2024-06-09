import math
import heapq

class Cell:
    def __init__(self):
        self.parent_row = 0
        self.parent_col = 0
        self.f = float("inf")
        self.g = float("inf")
        self.h = 0
        
Rows = 9
Cols = 10
        
def isValidCell(row: int, col: int):
    return (row >= 0 and row <= Rows and col >= 0 and col <= Cols)

def isNotBlocked(grid: list, row: int, col: int):
    return grid[row][col] == 1

def isdest(row: int, col: int, dest: list):
    return row == dest[0] and col == dest[1]

def CalculateHeuresticsValue(row: int, col: int, dest: list):
    return ((row - dest[0]) ** 2 + (col - dest[1]) ** 2) ** 0.5

def tracePath(cellDetails, dest):
    print("The path is : ")
    
    path = []
    
    row = dest[0]
    col = dest[1]
    
    while cellDetails[row][col].parent_row != row or cellDetails[row][col].parent_col != col:
        path.append((row, col))
        row = cellDetails[row][col].parent_row
        col = cellDetails[row][col].parent_col
        
    path.append((row, col))
    path.reverse()
    
    for (row, col) in path:
        print("-> row ", row, " col ", col, end=" ")
        
    print()
    
def AStarSearch(grid: list, src: list, dest: list):
    if not isValidCell(src[0], src[1]) or not isValidCell(dest[0], dest[1]):
        print("Src or Dest is either or both InValid!!!")
        return
    
    if not isNotBlocked(grid, src[0], src[1]) or not isNotBlocked(grid, dest[0], dest[1]):
        print("Src or Dest is either or both Blocked!!!")
        return
    
    if isdest(src[0], src[1], dest):
        print("Destination Reached!!!")
        return
    
    closedList = [[False for _ in range(Cols)] for _ in range(Rows)]
    cellDetails = [[Cell() for _ in range(Cols)] for _ in range(Rows)]
    
    i = src[0]
    j = src[1]
    cellDetails[i][j].parent_row = i
    cellDetails[i][j].parent_col = j
    cellDetails[i][j].f = 0
    cellDetails[i][j].g = 0
    cellDetails[i][j].h = 0
    
    openList = []
    heapq.heappush(openList, (0, i, j))
    
    destFound = False
    
    while openList:
        p = heapq.heappop(openList)
        
        i = p[1]
        j = p[2]
        
        closedList[i][j] = True
        
        directions = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]
        
        for d in directions:
            I = i + d[0]
            J = j + d[1]
            
            if isValidCell(I, J) and isNotBlocked(grid, I, J) and not closedList[I][J]:
                if isdest(I, J, dest):
                    cellDetails[I][J].parent_row = i
                    cellDetails[I][J].parent_col = j
                    print("Destination Reached : ")
                    tracePath(cellDetails, dest)
                    destFound = True
                    return 
                else:
                    G = cellDetails[i][j].g + 1
                    H = CalculateHeuresticsValue(I, J, dest)
                    F = G + H
                    if cellDetails[I][J].f == float("inf") or cellDetails[I][J].f > F:
                        heapq.heappush(openList, {F, I, J})
                        cellDetails[I][J].g = G
                        cellDetails[I][J].h = H
                        cellDetails[I][J].f = F
                        cellDetails[I][J].parent_row = i
                        cellDetails[I][J].parent_col = j

    if not destFound:
        print("Failed to Reach Destination")
            
def main():
    # Define the grid (1 for unblocked, 0 for blocked)
    grid = [
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 1]
    ]
 
    # Define the source and destination
    src = [8, 0]
    dest = [0, 0]
    
    # Run the A* search algorithm
    AStarSearch(grid, src, dest)
 
if __name__ == "__main__":
    main()