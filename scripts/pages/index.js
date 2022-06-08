// DOM

const searchBar = document.getElementById('search-content');
const divCards = document.getElementById('cards-recipes');
const headerIcon = document.getElementById('header-flex');
const buttonAppareils = document.getElementById('button-appareils');
const buttonUstensiles = document.getElementById('button-ustensiles');
const buttonIngredients = document.getElementById('button-ingredients');


// Ajout icon 

// Color button
buttonAppareils.style.backgroundColor = "#68D9A4";
buttonAppareils.style.borderColor = "#68D9A4";
buttonUstensiles.style.backgroundColor = "#ED6454"
buttonUstensiles.style.borderColor = "#ED6454";
buttonIngredients.style.backgroundColor = "#3282F7";
buttonIngredients.style.borderColor = "#3282F7";

// Récupération des recettes présentes dans un autre fichier
import { recipes } from "../data/recipes.js";
console.log(recipes);


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
    }
    cardsRecipesBody.appendChild(cardsRecipesDescriptions);
    function searchAliments() {
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
            searchAliments() 
        
    }
   
}

/* Min length search bar 
function minLenghtSearchBar() {
    if (searchBar.value < 3) {
        console.log("recherche invalide");
    } 
    else if (searchBar.value >= 3) {
    console.log("recherche valide");
}

}

function searchRecipes() {
    let filter, divContent, p, i, textValue;
    filter = searchBar.value.toUpperCase();
    divContent = divCards.getElementsByTagName("div");
    for (i = 0; i < divContent.length; i++) {
        p = divContent[i].getElementsByTagName('p')[0];
        textValue = p.textContent || a.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            divContent[i].style.display = "";
        } else {
            divContent[i].style.display = "none";
        }
    }
}

searchBar.onkeyup = function() {
    searchRecipes()
}

function searchAliments() {
    let input = searchBar.value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName('titre');
    let y = document.getElementsByClassName('figure');
    for (let i = 0; i < y.length; i++) {
        if (!y[i].innerHTML.toLowerCase().includes(input) && input.length == 3) {
            y[i].style.display = "none";
        }
        else {
            y[i].style.display = "";
        }
    }
}

searchBar.onkeyup = function() {
    searchAliments()
}*/

