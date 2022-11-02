// pokemonRepository is wrapped inside IIFE to prevent side effects of globalness
let pokemonRepository = (function() {
   
//pokemonList holds pokemon array items
let pokemonList = [];

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

//addListItem() display unordered list of pokemon items
function addListItem(pokemon) {
    let pokemonItems = document.querySelector("ul");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn-pokemon-item");
    listItem.appendChild(button);
    pokemonItems.appendChild(listItem);

    button.addEventListener("click", function (event) {
        showDetails(pokemon);
    });
}

// showDetails() displays pokemon details
function showDetails(pokemon) {
    console.log(pokemon);
}

// filterItems() allows user to search for pokemon by name
function filterItems(pokemonList, query) {
    return pokemonList.filter((name) => name.toLowerCase().includes(query.toLowerCase()));
}
  
// return invokes all functions within the immediately invoked functional expression statement
return {
    getAll: getAll,
    add: add,
    filterItems: filterItems,
    addListItem: addListItem,
    showDetails: showDetails,
}})();

// prints pokemonList details with message for largest pokemon
pokemonRepository.getAll().forEach(function(item) {
    pokemonRepository.addListItem(item)
});






