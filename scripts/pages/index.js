import { recipes } from "../data/recipes.js";
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
