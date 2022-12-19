import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./displayRecipes.js";
import { displayIngredients } from "./dropdownLists.js";
import {
  errorSearch,
  searchBar,
  cards,
  lists,
  errorAppareils,
  errorUstensils,
  errorIngredients,
} from "./DOM.js";

searchBar.addEventListener("keyup", (e) => {
  const searchBarValue = e.target.value.toLowerCase();
  const searchBarTest = searchBarValue.length;
  let matchFound = false;
  const filteredRecipes = recipes.filter((recipe) => {
    if (
      recipe.name.toLowerCase().includes(searchBarValue) ||
      recipe.description.toLowerCase().includes(searchBarValue)
    ) {
      matchFound = true;
    }
    if (!matchFound) {
      errorSearch.style.display = "block";
    } else {
      errorSearch.style.display = "none";
    }
    if (searchBarTest >= 3) {
      return (
        recipe.name.toLowerCase().includes(searchBarValue.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchBarValue.toLowerCase())
      );
    } else {
      return recipe;
    }
  });
  displayRecipes(filteredRecipes);
});

// Mise à jour des éléments de la recherche avancée
searchBar.onkeyup = function () {
  let matchFound = false;
  let value = searchBar.value.toLowerCase();
  for (let list of lists) {
    for (let card of cards) {
      if (!card.textContent.includes(list.textContent) && value.length >= 3) {
        list.style.display = "none";
      } else {
        list.style.display = "block";
        matchFound = true;
      }
      if (!matchFound) {
        errorIngredients.style.display = "block";
        errorAppareils.style.display = "block";
        errorUstensils.style.display = "block";
      } else {
        errorIngredients.style.display = "none";
        errorAppareils.style.display = "none";
        errorUstensils.style.display = "none";
      }
    }
  }
};
