export default (graph, minHappiness) => {

    //Removing repetitive links from input
    for (let i = 0; i < graph.length; i++) {

        graph[i].sort((a, b) => a - b);
        graph[i] = graph[i].filter(x => x > i);

    }

    const countOfBuildings = graph.length - 1;

    let maxSpice = 0;
    let maxHappiness = 0;
    let bestLayout;

    //Calculating spice and happiness values for all possible layouts
    for (let i = 0; i < 3 ** countOfBuildings; i++) {
        let happiness = 0;
        let spice = 0;
        let layout = i.toString(3);
            layout = '0'.repeat(countOfBuildings - layout.length + 1) + layout;
            layout = layout.split('').map(Number);

        for(let a in graph) {

            //If it's an entertainment center
            if(layout[a] == 1) {
                happiness++;
            }

            //If it's a factory
            if(layout[a] == 2) {
                happiness--;
            }

            for(let b of graph[a]) {

                if(layout[a] == layout[b]) continue;

                //If one building is a house and the other is an entertainment center
                if(layout[a] + layout[b] == 1) {
                    happiness++;
                }

                //If one building is a house and the other is a factory
                if(layout[a] + layout[b] == 2) {
                    spice++;
                }

                //If one building is an entertainment center and the other is a factory
                if(layout[a] + layout[b] == 3) {
                    happiness--;
                }

            }
        }

        if(happiness < minHappiness) continue;
        
        if(spice > maxSpice || (spice == maxSpice && happiness > maxHappiness)) {

            maxSpice = spice;
            maxHappiness = happiness;
            bestLayout = layout;

        }
        
    }

    return ({
        spice: maxSpice,
        happiness: maxHappiness,
        layout: bestLayout
    });

}