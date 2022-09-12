//pokemonList holds pokemon array items

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

// prints pokemonList details with message for largest pokemon
function printPokemonArray(pokemon) {
    if ( pokemon.height > 1 ) {
        document.write( "</p>" + pokemon.name + " - that is a big ole pokemon!");
    } else {
        document.write( "</p>" + pokemon.name);
    }
};

pokemonList.forEach(printPokemonArray);

// printPokemonArray();






