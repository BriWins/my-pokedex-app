// pokemonRepository is wrapped inside IIFE to prevent side effects of globalness
let pokemonRepository = (function() {
   
//pokemonList holds pokemon array items
let pokemonList = [];
let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

// getAll() returns list of pokemon items
function getAll() {
    return pokemonList;
}

// add() makes sure pokemon item is a real oject with appropriate object key properties
function add(pokemon) {
    if (typeof pokemon === "object" && "name" || "detailsURL" in pokemon) {
        return pokemonList.push(pokemon);
    } else {
        console.log("not a pokemon object!");
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

// showDetails() displays pokemon details upon user click
function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
        console.log(pokemon); 
    })
}

// filterItems() allows user to search for pokemon by name
function filterItems(pokemonList, query) {
    return pokemonList.filter((name) => name.toLowerCase().includes(query.toLowerCase()));
}

// loadList() gets pokemon items directly from api
function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then( function (json) {
        json.results.forEach( function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch( function(e) {
        console.error(e);
    })
}

// loadDetails() takes pokemon item as an argument to display its detailed data
function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then( function(response) {
        return response.json();
    }).then (function (details) {
        item.frontImageUrl = details.sprites.front_default;
        item.backImageUrl = details.sprites.back_default;
        item.types = details.types
    }).catch (function (e) {
        console.error(e);
    });
}

// showModal() allows each pokemon to display in a modal pop up
function showModal( title, text ) {
    let modalContainer = document.querySelector("#modal-container");

    // clears all existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    //add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })
}

document.querySelector("#show-modal").addEventListener('click', () => { showModal("Modal Title", "This is the modal content");    
});

let dialogPromiseReject;
// hideModal() removes the modal if user clicks close button
function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");

    //user can exit by pressing the esc key
    window.addEventListener("keydown", (e) => {
        let modalContainer = document.querySelector("#modal-container");
        if ( e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    })

    if ( dialogPromiseReject ) {
        dialogPromiseReject();
        dialogPromiseReject = null;
    }
}

function showDialog(title, text) {
    showModal(title, text);

    //defined modal container here
    let modalContainer = document.querySelector("#modal-container");

    let modal = modalContainer.querySelector(".modal");

    let confirmButton = document.createElement("button");
    confirmButton.classList.add("modal-confirm");
    confirmButton.innerText = "Confirm";

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-cancel");
    cancelButton.innerText = "Cancel";

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    confirmButton.focus();

    //return a promise that resolves when confirmed otherwise rejects
    return new Promise((resolve, reject) => {
        cancelButton.addEventListener("click", hideModal);
        confirmButton.addEventListener("click", () => {
            dialogPromiseReject = null;
            hideModal();
            resolve();
        });

        //This can be used to reject from other functions
        dialogPromiseReject = reject;
    });
}

document.querySelector("#show-dialog").addEventListener("click", () => {
    showDialog("Confirm Action", "Are you sure you want to do this?").then(function() {
        console.log("confirmed!");
    }, () => {
        console.log("not confirmed");
    });
});
  
// return invokes all functions within the immediately invoked functional expression statement
return {
    getAll: getAll,
    add: add,
    filterItems: filterItems,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    hideModal: hideModal,
    showModal: showModal,
    showDialog: showDialog,
}})();

// prints pokemonList details with message for largest pokemon
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(item) {
            pokemonRepository.addListItem(item)
    });
});






