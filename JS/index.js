// pokemonRepository is wrapped inside IIFE to prevent side effects of globalness
let pokemonRepository = (function() {
   
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

// getAll() returns list of pokemon items
function getAll() {
    return pokemonList;
}

// add() makes sure pokemon item is a real oject with appropriate object key properties
function add(pokemon) {
    if (typeof pokemon !== "object" && Object.keys(pokemon)) {
        return "Error not a pokemon object!"
    } else {
        return pokemonList.push(pokemon);
    }
}

// filterItems() allows user to search for pokemon by name
function filterItems(pokemonList, query) {
    return pokemonList.filter((name) => name.toLowerCase().includes(query.toLowerCase()));
  }


// return invokes all functions with IIFE statement
return {
    getAll: getAll,
    add: add,
    filterItems: filterItems,
}
})();

// prints pokemonList details with message for largest pokemon
pokemonRepository.getAll().forEach(function(item) {
    document.write( "<br />" + "Name: " + item.name + " " + "Height: " + item.height + " " + "meters" + " "); {
       if (item.height < 0.3 ) {
        document.write( " ~ AWW! that is one itty bitty Pokemon!");
      }
      else if (item.height > 1) {
          document.write(" ~ WHOA! that is one big 'ole Pokemon!"); 
        }
    }
});






