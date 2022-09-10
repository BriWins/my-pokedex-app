let pokemonList = [
    {name: "Bulbasaur", 
    height: 0.7, 
    weight: 6.9, 
    eggGroup: ["Monster","Grass"], 
    abilities: ["Chlorophyll", "Overgrow"]},
    {name: "Ivysaur", 
    height: 1, 
    weight: 13, 
    eggGroup: ["Monster","Grass"], 
    abilities: ["Chlorophyll", "Overgrow"]},
    {name: "Venusaur", 
    height: 2, 
    weight: 100, 
    eggGroup: ["Monster","Grass"], 
    abilities: ["Chlorophyll", "Overgrow"]}
]

for ( let i = 0; i < pokemonList.length; i++) {
    if ( pokemonList[i].height > 1 ) {
        document.write(pokemonList[i].name + " - that is a big ole pokemon!");
    } else {
        document.write(pokemonList[i].name)
    }
}