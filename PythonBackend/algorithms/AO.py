def FindCost(heuristics, condition, weight=1):
    cost = {}
    
    if "AND" in condition:
        And_Nodes_Aggregation = condition["AND"]
        Path_A_String = " AND ".join(And_Nodes_Aggregation)
        Path_A_Value = sum(heuristics[node] + weight for node in And_Nodes_Aggregation)
        cost[Path_A_String] = Path_A_Value
        
    if "OR" in condition:
        Or_Nodes_Aggregation = condition["OR"]
        Path_B_String = " OR ".join(Or_Nodes_Aggregation)
        Path_B_Value = sum(heuristics[node] + weight for node in Or_Nodes_Aggregation)
        cost[Path_B_String] = Path_B_Value
        
    return cost


def UpdateCost(heuristics, conditions, weight=1):
    
    MainNodes = list(conditions.keys())
    MainNodes.reverse()
    
    least_cost = {}
    
    for key in MainNodes:
        condition = conditions[key]
        print(key, " : ", condition, " >>> ", FindCost(heuristics, condition, weight))
        cost = FindCost(heuristics, condition, weight)
        heuristics[key] = min(cost.values())
        least_cost[key] = FindCost(heuristics, condition, weight)
        
    return least_cost


def ShortestPath(start, UpdatedCost, heurestics):
    Path = start
    
    if start in UpdatedCost.keys():
        
        Min_Cost = min(UpdatedCost[start].values())
        key = list(UpdatedCost[start].keys())
        values = list(UpdatedCost[start].values())
        index = values.index(Min_Cost)
        
        Next = key[index].split()
        
        if len(Next) == 1:
            Start = Next[0]
            Path += f" = {ShortestPath(Start, UpdatedCost, heurestics)} "
            
        else:
            Path += f"( {key[index]} )"
            
            Start = Next[0]
            Path += f"[ {ShortestPath(Start, UpdatedCost, heurestics)} + "
            
            Start = Next[-1]
            Path += f" {ShortestPath(Start, UpdatedCost, heurestics)} ]"
            
    return Path


H = {"A": 1, "B": 6, "C": 2, "D": 12, "E": 2, "F": 1, "G": 5, "H": 7, "I": 7, "J": 1, "T": 3}

Conditions = {
 'A': {'OR': ['D'], 'AND': ['B', 'C']},
 'B': {'OR': ['G', 'H']},
 'C': {'OR': ['J']},
 'D': {'AND': ['E', 'F']},
 'G': {'OR': ['I']}    
}

weight=1

print('Updated Cost :')
Updated_cost = UpdateCost(H, Conditions, weight=1)
print('*'*75)
print('Shortest Path :\n',ShortestPath('A', Updated_cost, H))