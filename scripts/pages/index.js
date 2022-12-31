import { recipes } from "../data/recipes.js";
/*import { displayRecipes } from "./displayRecipes.js";

const loadRecipes = () => {
  displayRecipes(recipes);
};

loadRecipes();*/

import { recipesFactory } from "../factories/recipesFactory.js";
import { recipesSection } from "./DOM.js";

export function displayRecipes(recipes) {
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

displayRecipes(recipes);

/*
const searchBar = document.getElementById("search-content");
const divCards = document.getElementById("cards-recipes");
let searchElements = document.getElementsByClassName("col-4");
import { recipes } from "../data/recipes.js";
const errorSearch = document.getElementById("error");*/

/*
const loadRecipes = () => {
  displayRecipes(recipes);
};
export const displayRecipes = (recipes) => {
  const htmlString = recipes
    .map((recipe) => {
      const nameRecipes = recipe.name;
      const timeRecipes = recipe.time;
      const descriptionRecipes = recipe.description;
      const ingredientsRecipes = recipe.ingredients;
      const appareilsRecipes = recipe.appliance;
      const ustensilsRecipes = recipe.ustensils;
      const ingredientsList = ingredientsRecipes
        .map((ingredients) => {
          let ingredientsRecipe = ingredients.ingredient + ":";
          const quantityIngredients = ingredients.quantity;
          const unitIngredients = ingredients.unit;
          let quantity = [];
          quantity.push(quantityIngredients);
          quantity = quantity.filter(function (e) {
            return e !== undefined;
          });
          let unit = [];
          unit.push(unitIngredients);
          unit = unit.filter(function (e) {
            return e !== undefined;
          });
          if (unit == "grammes") {
            unit = "g";
          }
          if (quantity == "") {
            ingredientsRecipe = ingredients.ingredient;
          }
          return `
            <p class="ingredients_recipes"><span class="get_ingredient">${ingredientsRecipe}</span> ${quantity} ${unit}</p>
            `;
        })
        .join("");
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
    .join("");
  divCards.innerHTML = htmlString;
};
loadRecipes();*/
