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
const errorMessage = document.getElementById('error');

console.log(errorMessage)

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


// Affichage de recettes

const loadRecipes = () => {
    displayRecipes(recipes)
}

const displayRecipes = (recipes) => {
    const htmlString = recipes.map((recipe) => {
        const nameRecipes = recipe.name;
        const timeRecipes = recipe.time;
        const descriptionRecipes = recipe.description;
        const ingredientsRecipes = recipe.ingredients;
        const ingredientsList = ingredientsRecipes.map((ingredients) => {
            let ingredientsRecipe = ingredients.ingredient + ':';
            const quantityIngredients = ingredients.quantity;
            const unitIngredients = ingredients.unit;
            let quantity = [];
            quantity.push(quantityIngredients)
            quantity = quantity.filter(function(e) {
                return e !== undefined
            })
            let unit = [];
            unit.push(unitIngredients);
            unit = unit.filter(function(e) {
                return e !== undefined
            })
            if (unit == "grammes") {
                unit = "g";
            }
            if (quantity == "") {
                ingredientsRecipe = ingredients.ingredient;
            }
            return `
            <p class="ingredients_recipes">${ingredientsRecipe} ${quantity} ${unit}</p>
            `
        })
        .join('');
        return `
        <div class="col-4">
            <div class="card">
                <img class="card-img-top"/>
                <div class="card-body">
                    <h2 class="title_recipes">${nameRecipes}</h2>
                    <p class="time_recipes"><i class="far fa-clock"></i> ${timeRecipes} min</p>
                    ${ingredientsList}
                    <p class="description_recipes">${descriptionRecipes}</p>
                    
                </div>
            </div>
        </div>`;
    })
    .join('');
    divCards.innerHTML = htmlString;
};

loadRecipes()

// recherche barre principale

searchBar.addEventListener('keyup', e => {
    const searchBarValue = e.target.value;
    const searchBarTest = searchBarValue.length;
    let matchFound = false;
    const filteredRecipes = recipes.filter(recipe => {
        if (searchBarTest >= 3) {
            return(
            recipe.name.toLowerCase().includes(searchBarValue) ||
            recipe.description.toLowerCase().includes(searchBarValue) 
        );
        } else {
            return(
                recipe
            )
        }
    });
    displayRecipes(filteredRecipes);
    
});

// Afficher les listes et retirer doublons

const getIngredients = recipes.flatMap(
    o => o.ingredients.flatMap(
        o => o.ingredient
    )
);

getIngredients.forEach((c) => {
    if(!arrayIngredients.includes(c)) {
        arrayIngredients.push(c)
    }
})
arrayIngredients.forEach(function(index) {
    const listIngredients = document.createElement('li');
    listIngredients.innerHTML = index;
    dropDownIngredients.appendChild(listIngredients)
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
        badgeIngredients.addEventListener('click', function() {
                this.remove();
          })
    }
})

// ------
const getUstensils = recipes.flatMap(
        o => o.ustensils
);
getUstensils.forEach((c) => {
    if(!arrayUstensiles.includes(c)) {
        arrayUstensiles.push(c)
    }
})
arrayUstensiles.forEach(function(index) {
    const listUstensils = document.createElement('li');
    listUstensils.innerHTML = index;
    dropdownUstensiles.appendChild(listUstensils)
    listUstensils.onclick = function() {
        let contentUstensils = listUstensils.textContent;
        contentUstensils = contentUstensils.toLowerCase();
        let badgeUstensils = document.createElement('span');
        badgeUstensils.style.backgroundColor = "#ED6454"
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
        badgeUstensils.addEventListener('click', function() {
                this.remove();
          })}
        
})

// ------
const getAppareils = recipes.flatMap(
    o => o.appliance
);
getAppareils.forEach((c) => {
if(!arrayAppareils.includes(c)) {
    arrayAppareils.push(c)
}
})
arrayAppareils.forEach(function(index) {
const listAppareils = document.createElement('li');
listAppareils.innerHTML = index;
dropdownAppareils.appendChild(listAppareils)
listAppareils.onclick = function() {
    let contentAppareils = listAppareils.textContent;
    contentAppareils = contentAppareils.toLowerCase();
    let badgeAppareils = document.createElement('span');
    badgeAppareils.style.backgroundColor = "#68D9A4";
    console.log(contentAppareils)
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
    badgeAppareils.addEventListener('click', function() {
            this.remove();
    })     
}
})

// recherche barre filtres
