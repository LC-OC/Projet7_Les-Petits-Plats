// DOM
const searchBar = document.getElementById('search-content');
const divCards = document.getElementById('cards-recipes');
const searchElements = document.getElementsByClassName('col-4');
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
const errorIngredients = document.getElementById('error_ingredient');
const divListUstensils = document.getElementById('list_ustensils');
const divListAppareils = document.getElementById('list_appareil');
const errorSearch = document.getElementById('error');
const errorUstensils = document.getElementById('error_ustensils');
const errorAppareils = document.getElementById('error_appareil');



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
        const appareilsRecipes = recipe.appliance;
        const ustensilsRecipes = recipe.ustensils;
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
            <p class="ingredients_recipes"><span class="get_ingredient">${ingredientsRecipe}</span> ${quantity} ${unit}</p>
            `
        })
        .join('');
        return `
        <div class="col-4">
            <div class="card">
                <img class="card-img-top"/>
                <div class="card-body">
                <div class="style_title_time">
                    <h2 class="title_recipes">${nameRecipes}</h2>
                    <p class="time_recipes"><i class="far fa-clock"></i> ${timeRecipes} min</p>
                </div>
                <div class="style_description_ingredients">
                    <div>
                        ${ingredientsList}
                    </div>
                    <div>
                        <p class="description_recipes">${descriptionRecipes}</p>
                    </div>
                    
                </div>
                    <p class="appareils_recipes">${appareilsRecipes}</p>
                    <p class="ustensils_recipes">${ustensilsRecipes}</p>
                    
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
        if (recipe.name.includes(searchBarValue) || recipe.description.toLowerCase().includes(searchBarValue) ) {
            matchFound = true;
        } 
        if (!matchFound) {
            errorSearch.style.display = "block";
        } else {
            errorSearch.style.display = "none";
        }
        if (searchBarTest >= 3) {
            return(
            recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchBarValue.toLowerCase())
            
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
let newArrayIngredients = arrayIngredients.map(function(obj) {
    return {ingredient: obj}
})
const loadIngredients = () => {
    displayIngredients(newArrayIngredients)
}
const displayIngredients = (newArrayIngredients) => {
    const htmlString = newArrayIngredients.map((newArrayIngredient) => {
        const ingredientList = newArrayIngredient.ingredient;
        return `
        <li class="ingredients">${ingredientList}</li>`;
    })
    .join('');
    divListIngredients.innerHTML = htmlString;
    let liIngredients = document.getElementsByClassName('ingredients');
    for (let liIngredient of liIngredients) {
       liIngredient.addEventListener('click', function() {
        let contentIngredients = liIngredient.textContent;
        let badgeIngredients = document.createElement('span');
        badgeIngredients.style.backgroundColor = "#3282F7";
        tagDiv.appendChild(badgeIngredients);
        badgeIngredients.style.cursor = "pointer";
        badgeIngredients.classList.add("badge");
        badgeIngredients.innerHTML = contentIngredients;
        badgeIngredients.style.display = "inline-block";
        let testIcon = document.createElement('span');
        testIcon.innerHTML = '<i class="far fa-times-circle"></i>';
        const ingredientsTags = [...document.querySelectorAll('.badge')];
        const textIngredients = new Set(ingredientsTags.map(x => x.innerHTML));
        ingredientsTags.forEach(ingredientTag => {
           if(textIngredients.has(ingredientTag.innerHTML)) {
            textIngredients.delete(ingredientTag.innerHTML);
           } else {
            ingredientTag.remove()
           }
        })
        for (let searchElement of searchElements) {
            if (!searchElement.innerHTML.includes(badgeIngredients.textContent)) {
                searchElement.style.display = "none";
            }
            badgeIngredients.addEventListener('click', function() {
                if (!searchElement.innerHTML.includes(this.textContent)) {
                    searchElement.style.display = "block";
                    this.remove();
                    tagDiv.textContent = "";
                }
            })
        }
    }); 
}}
loadIngredients()

// ------
const getUstensils = recipes.flatMap(
        o => o.ustensils
);
getUstensils.forEach((c) => {
    if(!arrayUstensiles.includes(c)) {
        arrayUstensiles.push(c)
    }
})
let newArrayUstensiles = arrayUstensiles.map(function(obj) {
    return {ustensils: obj}
})
const loadUstensils = () => {
    displayUstensils(newArrayUstensiles)
}
const displayUstensils = (newArrayUstensiles) => {
    const htmlString = newArrayUstensiles.map((newArrayUstensile) => {
        const ustensilsList = newArrayUstensile.ustensils;
        return `
        <li class="ustensils">${ustensilsList}</li>`;
    })
    .join('');
    divListUstensils.innerHTML = htmlString;
    let liUstensils = document.getElementsByClassName('ustensils');
    for (let liUstensil of liUstensils) {
       liUstensil.addEventListener('click', function() {
        let contentUstensils = liUstensil.textContent;
        let badgeUstensils = document.createElement('span');
        badgeUstensils.style.backgroundColor = "#ED6454";
        tagDiv.appendChild(badgeUstensils);
        badgeUstensils.style.cursor = "pointer";
        badgeUstensils.classList.add("badge");
        badgeUstensils.innerHTML = contentUstensils;
        badgeUstensils.style.display = "inline-block";
        let testIcon = document.createElement('span');
        testIcon.innerHTML = '<i class="far fa-times-circle"></i>';
        const ustensilsTags = [...document.querySelectorAll('.badge')];
        const textUstensils = new Set(ustensilsTags.map(x => x.innerHTML));
        ustensilsTags.forEach(ustensilTag => {
           if(textUstensils.has(ustensilTag.innerHTML)) {
            textUstensils.delete(ustensilTag.innerHTML);
           } else {
            ustensilTag.remove()
           }
        })
        for (let searchElement of searchElements) {
            if (!searchElement.innerHTML.includes(badgeUstensils.textContent)) {
                searchElement.style.display = "none";
            }
            
            badgeUstensils.addEventListener('click', function() {
                if (!searchElement.innerHTML.includes(this.textContent)) {
                    searchElement.style.display = "block";
                    this.remove();
                    tagDiv.textContent = "";
                }
            })
        }
    
    }); 

}
    
};
loadUstensils()

// ------
const getAppareils = recipes.flatMap(
    o => o.appliance
);
getAppareils.forEach((c) => {
if(!arrayAppareils.includes(c)) {
    arrayAppareils.push(c)
}
})
let newArrayAppareils = arrayAppareils.map(function(obj) {
    return {appareils: obj}
})
const loadAppareils = () => {
    displayAppareils(newArrayAppareils)
}
const displayAppareils = (newArrayAppareils) => {
    const htmlString = newArrayAppareils.map((newArrayAppareil) => {
        const appareilsList = newArrayAppareil.appareils;
        return `
        <li class="appareils">${appareilsList}</li>`;
    })
    .join('');
    divListAppareils.innerHTML = htmlString;
    let liAppareils = document.getElementsByClassName('appareils');
    
    for (let liAppareil of liAppareils) {
        liAppareil.addEventListener('click', function() {
        let contentAppareils = liAppareil.textContent;
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
        const textAppareil = new Set(appareilsTags.map(x => x.innerHTML));
        appareilsTags.forEach(appareilTag => {
           if(textAppareil.has(appareilTag.innerHTML)) {
            textAppareil.delete(appareilTag.innerHTML);
           } else {
            appareilTag.remove()
           }
        })
        for (let searchElement of searchElements) {
            if (!searchElement.innerHTML.includes(badgeAppareils.textContent)) {
                searchElement.style.display = "none";
            }
            
            badgeAppareils.addEventListener('click', function() {
                if (!searchElement.innerHTML.includes(this.textContent)) {
                    searchElement.style.display = "block";
                    this.remove();
                    tagDiv.textContent = "";
                }
            })
        }
    
    }); 

}
};
loadAppareils()

// recherche barre filtres

searchBarIngredients.addEventListener('keyup', e => {
    const searchBarValue = e.target.value;
    let matchFound = false;
    const filteredIngredients = newArrayIngredients.filter(newArrayIngredient => {
        if (newArrayIngredient.ingredient.toLowerCase().includes(searchBarValue.toLowerCase()) ) {
            matchFound = true;
        } 
        if (!matchFound) {
            errorIngredients.style.display = "block";
        } else {
            errorIngredients.style.display = "none";
        }
       
            return(
            newArrayIngredient.ingredient.toLowerCase().includes(searchBarValue.toLowerCase()) 
        );
    });
    displayIngredients(filteredIngredients);
});

searchBarUstensiles.addEventListener('keyup', e => {
    const searchBarValue = e.target.value;
    let matchFound = false;
    const filteredUstensils = newArrayUstensiles.filter(newArrayUstensile => {
        if (newArrayUstensile.ustensils.toLowerCase().includes(searchBarValue.toLowerCase()) ) {
            matchFound = true;
        };
        if (!matchFound) {
            errorUstensils.style.display = "block";
        } else {
            errorUstensils.style.display = "none";
        };
       
            return(
            newArrayUstensile.ustensils.toLowerCase().includes(searchBarValue.toLowerCase()) 
        );
    }); 
    displayUstensils(filteredUstensils);
});

searchBarAppareils.addEventListener('keyup', e => {
    const searchBarValue = e.target.value;
    let matchFound = false;
    const filteredAppareils = newArrayAppareils.filter(newArrayAppareil => {
        if (newArrayAppareil.appareils.toLowerCase().includes(searchBarValue.toLowerCase())) {
            matchFound = true;
        };
        if (!matchFound) {
            errorAppareils.style.display = "block";
        } else {
            errorAppareils.style.display = "none";
        };
       
            return(
            newArrayAppareil.appareils.toLowerCase().includes(searchBarValue.toLowerCase()) 
        );
    }); 
    displayAppareils(filteredAppareils);
});

// 


