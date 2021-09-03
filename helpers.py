def to_base(n, b): 
    return "0" if not n else to_base(n//b, b).lstrip("0") + str(n%b)

def find_layout(graph, min_happiness):

    #Removing duplicate links from input graph
    for i in range(0, len(graph)):
        graph[i].sort()
        graph[i] = list(filter(lambda x: x > i, graph[i]))

    count_of_buildings = len(graph)-1;

    max_spice = 0
    max_happiness = 0
    best_layout = None

    #Calculating spice and happiness values for all possible layouts
    for i in range(0, 3**count_of_buildings):
        base_3 = to_base(i, 3)

        spice = 0
        happiness = 0
        layout = list(map(int, list("0" * (count_of_buildings - len(base_3) + 1) + base_3)))

        for a in range(len(graph)):

            #If it's an entertainment center
            if layout[a] == 1:
                happiness += 1
            
            #If it's a factory
            if layout[a] == 2:
                happiness -= 1
            
            for b in graph[a]:

                if layout[a] == layout[b]: 
                    continue

                #If one building is a house and the other is an entertainment center
                if layout[a] + layout[b] == 1: 
                    happiness += 1

                #If one building is a house and the other is a factory
                if layout[a] + layout[b] == 2: 
                    spice += 1

                #If one building is an entertainment center and the other is a factory
                if layout[a] + layout[b] == 3: 
                    happiness -= 1
        
        if happiness < min_happiness: 
            continue

        if spice > max_spice or (spice == max_spice and happiness > max_happiness):
            max_spice = spice
            max_happiness = happiness
            best_layout = layout

    return {
        'spice': max_spice,
        'happiness': max_happiness,
        'layout': ''.join(list(map(str, best_layout)))
    }
