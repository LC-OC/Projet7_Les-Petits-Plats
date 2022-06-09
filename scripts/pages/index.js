// DOM

const searchBar = document.getElementById('search-content');
const divCards = document.getElementById('cards-recipes');
const buttonAppareils = document.getElementById('button-appareils');
const buttonUstensiles = document.getElementById('button-ustensiles');
const buttonIngredients = document.getElementById('button-ingredients');
const dropDownIngredients = document.getElementById('ingredients-dropdown');
const searchBarIngredients = document.getElementById('search_ingredients');
const searchBarAppareils = document.getElementById('search_appareils');
const searchBarUstensiles = document.getElementById('search_ustensiles');
const dropdownAppareils = document.getElementById('dropdown_appareils');
const dropdownUstensiles = document.getElementById('dropdown_ustensiles');

// Ajout icon 

// Color button
buttonAppareils.style.backgroundColor = "#68D9A4";
buttonAppareils.style.borderColor = "#68D9A4";
buttonUstensiles.style.backgroundColor = "#ED6454"
buttonUstensiles.style.borderColor = "#ED6454";
buttonIngredients.style.backgroundColor = "#3282F7";
buttonIngredients.style.borderColor = "#3282F7";
dropDownIngredients.style.backgroundColor = "#3282F7";
dropdownAppareils.style.backgroundColor =  "#68D9A4";
dropdownUstensiles.style.backgroundColor = "#ED6454";


// Récupération des recettes présentes dans un autre fichier
import { recipes } from "../data/recipes.js";
console.log(recipes);

// Array
let arrayIngredients = [];
let arrayAppareils = [];
let arrayUstensiles = [];
let arrayUstensils = [];



//Création dynamique des cards recettes 
for (let i = 0; i < recipes.length; i++) {
    let cardsCols = document.createElement('div');
    cardsCols.classList.add('col-4');
    let cardsRecipes = document.createElement('div');
    cardsRecipes.classList.add('card');
    cardsRecipes.style.margin = '1rem 0';
    cardsRecipes.style.height = '15rem';
    cardsRecipes.style.backgroundColor = "#E7E7E7";
    let imgCardsRecipes = document.createElement('img');
    imgCardsRecipes.classList.add('card-img-top');
    imgCardsRecipes.style.height = "250%";
    imgCardsRecipes.style.backgroundColor = "#C7BEBE";
    let cardsRecipesBody = document.createElement('div');
    cardsRecipesBody.classList.add('card-body');
    cardsRecipesBody.style.overflow = "scroll";
    let cardsRecipesTitle = document.createElement('h2');
    cardsRecipesTitle.setAttribute('id', 'search_title')
    cardsRecipesTitle.style.fontSize = "16px";
    cardsRecipesTitle.style.color = "black";
    let cardsRecipesTime = document.createElement('p');
    cardsRecipesTitle.innerText = recipes[i].name;
    cardsRecipesTime.classList.add('card-text');
    cardsRecipesTime.innerHTML = '<i class="far fa-clock"></i> ' + recipes[i].time + ' min';
    let cardsRecipesDescriptions = document.createElement('p');
    cardsRecipesDescriptions.innerText = recipes[i].description;
    cardsRecipesDescriptions.style.fontSize = "12px";
    cardsRecipesDescriptions.style.width = "60%";
    cardsRecipesDescriptions.style.height = "10rem";
    //cardsRecipesDescriptions.style.textOverflow = "ellipsis";
    divCards.appendChild(cardsCols);
    cardsCols.appendChild(cardsRecipes);
    cardsRecipes.appendChild(imgCardsRecipes);
    cardsRecipes.appendChild(cardsRecipesBody);
    cardsRecipesBody.appendChild(cardsRecipesTitle);
    cardsRecipesBody.appendChild(cardsRecipesTime);
    let ingredients = recipes[i].ingredients;
    let appareils = recipes[i].appliance;
    let ustensiles = recipes[i].ustensils;
    arrayAppareils.push(appareils);
    arrayUstensiles.push(ustensiles);
    for (let y = 0; y < ingredients.length; y++) {
        let ingredientName = ingredients[y].ingredient;
        let ingredientQuantity = ingredients[y].quantity;
        let ingredientUnit = ingredients[y].unit;
        let cardsRecipesIngredients = document.createElement('p');
        if (ingredientUnit == undefined) {
            cardsRecipesIngredients.innerText = ingredientName + ': ' + ingredientQuantity;
        }
        else {
            cardsRecipesIngredients.innerText = ingredientName + ': ' + ingredientQuantity + ingredientUnit;
        }
        if (ingredientUnit == "grammes") {
            cardsRecipesIngredients.innerText = ingredientName + ': ' + ingredientQuantity + "g";
        }
        if (ingredientQuantity == undefined) {
            cardsRecipesIngredients.innerText = ingredientName;
        }
        cardsRecipesBody.appendChild(cardsRecipesIngredients);
        arrayIngredients.push(ingredientName);
        

    }
    cardsRecipesBody.appendChild(cardsRecipesDescriptions);
    function searchRecipes() {
        let inputSearch = searchBar.value;
        inputSearch = inputSearch.toLowerCase();
        let matchFound = false;
        let errorMessage = document.getElementById('error');
        let searchElement = document.getElementsByClassName('col-4');
        for (let a = 0; a < searchElement.length; a++) {
            if (!searchElement[a].innerHTML.toLowerCase().includes(inputSearch) && inputSearch.length >= 3) {
                searchElement[a].style.display = "none";
            }
            else {
                searchElement[a].style.display = "";
                matchFound = true;
            }
        }
        if (!matchFound) {
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    }
    searchBar.onkeyup = function() {
            searchRecipes() 
        
    }
   
}

// Récupérer array ustensils
for (let i = 0; i < arrayUstensiles.length; i++) {
    for (let z = 0; z < arrayUstensiles[i].length; z++) {
        let filtredArrayUstensils = arrayUstensiles[i][z];
        arrayUstensils.push(filtredArrayUstensils);
    }
}

// Filtre doublon ingrédients
let filtredArrayIngredients = [];
arrayIngredients.forEach((c) => {
    if (!filtredArrayIngredients.includes(c)) {
        filtredArrayIngredients.push(c)
    }
})
console.log(filtredArrayIngredients)

// Filtre doublon appareils
let filtredArrayAppareils = [];
arrayAppareils.forEach((c) => {
    if (!filtredArrayAppareils.includes(c)) {
        filtredArrayAppareils.push(c)
    }
})
console.log(filtredArrayAppareils)

// Filtre doublon ustensils
let filtredArrayUstensils = [];
arrayUstensils.forEach((c) => {
    if (!filtredArrayUstensils.includes(c)) {
        filtredArrayUstensils.push(c)
    }
})
console.log(filtredArrayUstensils)

// Recherche et liste ingrédients
for (let i = 0; i < filtredArrayIngredients.length; i++) {
    let listIngredients = document.createElement('li');
    listIngredients.classList.add('list_ingredient');
    let newListIngredients = filtredArrayIngredients[i];
    listIngredients.innerText = newListIngredients;
    listIngredients.style.color = "#FFFFFF";
    dropDownIngredients.appendChild(listIngredients);
    // Search Bar Ingrédients
    function searchIngredients() {
        let inputSearchIngredients = searchBarIngredients.value;
        inputSearchIngredients = inputSearchIngredients.toLowerCase();
        let matchFoundIngredients = false;
        let searchElementIngredients = document.getElementsByClassName('list_ingredient');
        for (let a = 0; a < searchElementIngredients.length; a++) {
            if (!searchElementIngredients[a].innerHTML.toLowerCase().includes(inputSearchIngredients) && inputSearchIngredients.length >= 3) {
                searchElementIngredients[a].style.display = "none";
            }
            else {
                searchElementIngredients[a].style.display = "";
                matchFoundIngredients = true;
            }
        }

        
    }
    searchBarIngredients.onkeyup = function() {
        searchIngredients()
    }
}

// Recherche et liste Appareils
for (let i = 0; i < filtredArrayAppareils.length; i++) {
    let listAppareils = document.createElement('li');
    listAppareils.classList.add('list_appareils');
    let newListAppareils = filtredArrayAppareils[i];
    listAppareils.innerText = newListAppareils;
    listAppareils.style.color = "#FFFFFF";
    dropdownAppareils.appendChild(listAppareils);
    // Search Bar Appareils
    function searchAppareils() {
        let inputSearchAppareils = searchBarAppareils.value;
        inputSearchAppareils = inputSearchAppareils.toLowerCase();
        let matchFoundAppareils = false;
        let searchElementAppareils = document.getElementsByClassName('list_appareils');
        for (let a = 0; a < searchElementAppareils.length; a++) {
            if (!searchElementAppareils[a].innerHTML.toLowerCase().includes(inputSearchAppareils) && inputSearchAppareils.length >= 3) {
                searchElementAppareils[a].style.display = "none";
            }
            else {
                searchElementAppareils[a].style.display = "";
                matchFoundAppareils = true;
            }
        }

        
    }
    searchBarAppareils.onkeyup = function() {
        searchAppareils()
    }
}

// Recherche et liste Ustensiles

for (let i = 0; i < filtredArrayUstensils.length; i++) {
    let listUstensils = document.createElement('li');
    listUstensils.classList.add('list_ustensils');
    let newListUstensils = filtredArrayUstensils[i];
    listUstensils.innerText = newListUstensils;
    listUstensils.style.color = "#FFFFFF";
    dropdownUstensiles.appendChild(listUstensils);
    
    // Search Bar Ustensiles
    function searchUstensils() {
        let inputSearchUstensils = searchBarUstensiles.value;
        inputSearchUstensils = inputSearchUstensils.toLowerCase();
        let matchFoundUstensils = false;
        let searchElementUstensils = document.getElementsByClassName('list_ustensils');
        for (let a = 0; a < searchElementUstensils.length; a++) {
            if (!searchElementUstensils[a].innerHTML.toLowerCase().includes(inputSearchUstensils) && inputSearchUstensils.length >= 3) {
                searchElementUstensils[a].style.display = "none";
            }
            else {
                searchElementUstensils[a].style.display = "";
                matchFoundUstensils = true;
            }
        }

        
    }
    searchBarUstensiles.onkeyup = function() {
        searchUstensils()
    }
}