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
const tagDiv = document.getElementById('tag');
const divListIngredients = document.getElementById('list_ingredient');
const divListUstensils = document.getElementById('list_ustensils');
const divListAppareils = document.getElementById('list_appareil');


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
    cardsRecipes.style.cursor = "pointer";
    let imgCardsRecipes = document.createElement('img');
    imgCardsRecipes.classList.add('card-img-top');
    let cardsRecipesBody = document.createElement('div');
    cardsRecipesBody.classList.add('card-body');
    let cardsTimeTitle = document.createElement('div');
    cardsRecipesBody.appendChild(cardsTimeTitle);
    cardsTimeTitle.classList.add('style_title_time');
    let cardsRecipesTitle = document.createElement('h2');
    cardsRecipesTitle.setAttribute('id', 'search_title')
    let cardsRecipesTime = document.createElement('p');
    cardsRecipesTitle.innerText = recipes[i].name;
    cardsRecipesTime.classList.add('card-text', 'time_recipes');
    cardsRecipesTime.innerHTML = '<i class="far fa-clock"></i> ' + recipes[i].time + ' min';
    cardsTimeTitle.appendChild(cardsRecipesTitle);
    cardsTimeTitle.appendChild(cardsRecipesTime);
    let cardsIngredientsDescription = document.createElement('div');
    cardsIngredientsDescription.classList.add('style_description_ingredients');
    cardsRecipesBody.appendChild(cardsIngredientsDescription);
    let cardsRecipesDescriptions = document.createElement('p');
    cardsRecipesDescriptions.innerText = recipes[i].description;
    //cardsRecipesDescriptions.style.textOverflow = "ellipsis";
    divCards.appendChild(cardsCols);
    cardsCols.appendChild(cardsRecipes);
    cardsRecipes.appendChild(imgCardsRecipes);
    cardsRecipes.appendChild(cardsRecipesBody);
    let ingredients = recipes[i].ingredients;
    let appareils = recipes[i].appliance;
    let appareilsPart = document.createElement('p');
    cardsRecipes.appendChild(appareilsPart);
    appareilsPart.innerHTML = appareils;
    appareilsPart.style.display = "none";
    let ustensiles = recipes[i].ustensils;
    let ustensilsPart = document.createElement('p');
    cardsRecipes.appendChild(ustensilsPart);
    ustensilsPart.innerHTML = ustensiles;
    ustensilsPart.style.display = "none";
    arrayAppareils.push(appareils);
    arrayUstensiles.push(ustensiles);
    let divIngredients = document.createElement('div');
    for (let y = 0; y < ingredients.length; y++) {
        let ingredientListTes = document.createElement('p');
        ingredientListTes.innerHTML = ingredients[y].ingredient;
        cardsRecipes.appendChild(ingredientListTes);
        ingredientListTes.classList.add('test')
        ingredientListTes.style.display = "none";
        let ingredientName = ingredients[y].ingredient;
        let ingredientQuantity = ingredients[y].quantity;
        let ingredientUnit = ingredients[y].unit;
        let cardsRecipesIngredients = document.createElement('p');
        cardsRecipesIngredients.classList.add('ingredients_recipes');
        divIngredients.appendChild(cardsRecipesIngredients);
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
        
        arrayIngredients.push(ingredientName);

    }
    
    cardsIngredientsDescription.appendChild(divIngredients);
    cardsIngredientsDescription.appendChild(cardsRecipesDescriptions);
    cardsRecipesDescriptions.classList.add('description_recipes');
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

// Filtre doublon appareils
let filtredArrayAppareils = [];
arrayAppareils.forEach((c) => {
    if (!filtredArrayAppareils.includes(c)) {
        filtredArrayAppareils.push(c)
    }
})

// Filtre doublon ustensils
let filtredArrayUstensils = [];
arrayUstensils.forEach((c) => {
    if (!filtredArrayUstensils.includes(c)) {
        filtredArrayUstensils.push(c)
    }
})


// Recherche et liste ingrédients
for (let i = 0; i < filtredArrayIngredients.length; i++) {
    let listIngredients = document.createElement('li');
    listIngredients.classList.add('ingredients');
    let newListIngredients = filtredArrayIngredients[i];
    listIngredients.innerText = newListIngredients;
    listIngredients.style.cursor = "pointer";
    listIngredients.style.color = "#FFFFFF";
    divListIngredients.appendChild(listIngredients);
    // Search Bar Ingrédients
    function searchIngredients() {
        let inputSearchIngredients = searchBarIngredients.value;
        inputSearchIngredients = inputSearchIngredients.toLowerCase();
        let matchFoundIngredients = false;
        let errorIngredients = document.getElementById('error_ingredient');
        let searchElementIngredients = document.getElementsByClassName('ingredients');
        for (let a = 0; a < searchElementIngredients.length; a++) {
            if (!searchElementIngredients[a].innerHTML.toLowerCase().includes(inputSearchIngredients)) {
                searchElementIngredients[a].style.display = "none";
            }
            else {
                searchElementIngredients[a].style.display = "";
                matchFoundIngredients = true;
            }
        }
        if (!matchFoundIngredients) {
            errorIngredients.style.display = "block";
        } else {
            errorIngredients.style.display = "none";
        }
    }
    searchBarIngredients.onkeyup = function() {
        searchIngredients()
    }
    listIngredients.onclick = function() {
       let contentIngredients = listIngredients.textContent;
       let badgeIngredients = document.createElement('span');
       tagDiv.appendChild(badgeIngredients);
       badgeIngredients.classList.add("badge");
       badgeIngredients.style.cursor = "pointer";
       badgeIngredients.innerHTML = contentIngredients;
       const ingredientsTags = [...document.querySelectorAll('.badge')];
        const textIngredients = new Set(ingredientsTags.map(x => x.innerHTML));
        ingredientsTags.forEach(ingredientsTag => {
           if(textIngredients.has(ingredientsTag.innerHTML)) {
            textIngredients.delete(ingredientsTag.innerHTML);
           } else {
            ingredientsTag.remove()
           }
        })
       badgeIngredients.style.display = "inline-block";
       let searchElement = document.getElementsByClassName('col-4');
            for (let b = 0; b < searchElement.length; b++) {
            if (!searchElement[b].innerHTML.includes(badgeIngredients.textContent)) {
                searchElement[b].style.display = "none";
            }
            
            
            // Supprimer filtre
            badgeIngredients.addEventListener('click', function() {
                if (!searchElement[b].innerHTML.toLowerCase().includes(this.textContent)) {
                    searchElement[b].style.display = "block";
                    this.remove();
                    tagDiv.textContent = "";
                    searchBar.value = "";
                    
                } 
              })
        }
        }
    }
// Recherche et liste Appareils
for (let i = 0; i < filtredArrayAppareils.length; i++) {
    let listAppareils = document.createElement('li');
    listAppareils.classList.add('appareils');
    let newListAppareils = filtredArrayAppareils[i];
    listAppareils.innerText = newListAppareils;
    listAppareils.style.cursor = "pointer";
    listAppareils.style.color = "#FFFFFF";
    divListAppareils.appendChild(listAppareils);
    // Search Bar Appareils
    function searchAppareils() {
        let inputSearchAppareils = searchBarAppareils.value;
        inputSearchAppareils = inputSearchAppareils.toLowerCase();
        let matchFoundAppareils = false;
        let errorAppareils = document.getElementById('error_appareil')
        let searchElementAppareils = document.getElementsByClassName('appareils');
        for (let a = 0; a < searchElementAppareils.length; a++) {
            if (!searchElementAppareils[a].innerHTML.toLowerCase().includes(inputSearchAppareils)) {
                searchElementAppareils[a].style.display = "none";
            }
            else {
                searchElementAppareils[a].style.display = "";
                matchFoundAppareils = true;
            }
        }
        if (!matchFoundAppareils) {
            errorAppareils.style.display = "block";
        } else {
            errorAppareils.style.display = "none";
        }

        
    }
    searchBarAppareils.onkeyup = function() {
        searchAppareils()
    }
    listAppareils.onclick = function() {
        let contentAppareils = listAppareils.textContent;
        contentAppareils = contentAppareils.toLowerCase();
        let badgeAppareils = document.createElement('span');
        badgeAppareils.style.backgroundColor = "#68D9A4";
        tagDiv.appendChild(badgeAppareils);
        badgeAppareils.style.cursor = "pointer";
        badgeAppareils.classList.add("badge");
        badgeAppareils.innerHTML = contentAppareils;
        badgeAppareils.style.display = "inline-block";
        let testIcon = document.createElement('span');
        testIcon.innerHTML = '<i class="far fa-times-circle"></i>';
        const appareilsTags = [...document.querySelectorAll('.badge')];
        const textAppareils = new Set(appareilsTags.map(x => x.innerHTML));
        appareilsTags.forEach(appareilsTag => {
           if(textAppareils.has(appareilsTag.innerHTML)) {
            textAppareils.delete(appareilsTag.innerHTML);
           } else {
            appareilsTag.remove()
           }
        })
        let searchElement = document.getElementsByClassName('col-4');
            for (let b = 0; b < searchElement.length; b++) {
             if (!searchElement[b].innerHTML.toLowerCase().includes(badgeAppareils.textContent)) {
                 searchElement[b].style.display = "none";
          } 
          badgeAppareils.addEventListener('click', function() {
            if (!searchElement[b].innerHTML.toLowerCase().includes(this.textContent)) {
                searchElement[b].style.display = "block";
                this.remove();
                tagDiv.textContent = "";
            } 
          })
          }
           
        }
}

// Recherche et liste Ustensiles

for (let i = 0; i < filtredArrayUstensils.length; i++) {
    let listUstensils = document.createElement('li');
    listUstensils.classList.add('ustensils');
    let newListUstensils = filtredArrayUstensils[i];
    listUstensils.innerText = newListUstensils;
    listUstensils.style.color = "#FFFFFF";
    listUstensils.style.cursor = "pointer";
    divListUstensils.appendChild(listUstensils);
    // Search Bar Ustensiles
    function searchUstensils() {
        let inputSearchUstensils = searchBarUstensiles.value;
        inputSearchUstensils = inputSearchUstensils.toLowerCase();
        let matchFoundUstensils = false;
        let errorUstensils = document.getElementById('error_ustensils');
        let searchElementUstensils = document.getElementsByClassName('ustensils');
        for (let a = 0; a < searchElementUstensils.length; a++) {
            if (!searchElementUstensils[a].innerHTML.toLowerCase().includes(inputSearchUstensils)) {
                searchElementUstensils[a].style.display = "none";
            }
            else {
                searchElementUstensils[a].style.display = "";
                matchFoundUstensils = true;
            }
        }
        if (!matchFoundUstensils) {
            errorUstensils.style.display = "block";
        } else {
            errorUstensils.style.display = "none";
        }
    }
    searchBarUstensiles.onkeyup = function() {
        searchUstensils()
    }
    listUstensils.onclick = function() {
        let contentUstensils = listUstensils.textContent;
        contentUstensils = contentUstensils.toLowerCase();
        let badgeUstensils = document.createElement('span');
        badgeUstensils.style.backgroundColor = "#ED6454";
        tagDiv.appendChild(badgeUstensils);
        badgeUstensils.classList.add("badge");
        badgeUstensils.innerHTML = contentUstensils;
        badgeUstensils.style.cursor = "pointer";
        badgeUstensils.style.display = "inline-block";
        const ustensilsTags = [...document.querySelectorAll('.badge')];
        const textUstensils = new Set(ustensilsTags.map(x => x.innerHTML));
        ustensilsTags.forEach(ustensilsTag => {
           if(textUstensils.has(ustensilsTag.innerHTML)) {
            textUstensils.delete(ustensilsTag.innerHTML);
           } else {
            ustensilsTag.remove()
           }
        })
        let searchElement = document.getElementsByClassName('col-4');
            for (let b = 0; b < searchElement.length; b++) {
             if (!searchElement[b].innerHTML.toLowerCase().includes(badgeUstensils.textContent)) {
                 searchElement[b].style.display = "none";   
         }
         badgeUstensils.addEventListener('click', function() {
            if (!searchElement[b].innerHTML.toLowerCase().includes(this.textContent)) {
                searchElement[b].style.display = "block";
                this.remove();
                tagDiv.textContent = "";
            } 
          })
        } 
         
       
 
     }
}