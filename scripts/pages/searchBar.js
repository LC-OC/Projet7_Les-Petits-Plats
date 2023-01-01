import { recipes } from "../data/recipes.js";
import {
  errorSearch,
  searchBar,
  recipesSection,
  cards,
  lists,
  errorAppareils,
  errorUstensils,
  errorIngredients,
  searchElement,
} from "./DOM.js";
import { displayRecipes } from "./index.js";

searchBar.addEventListener("keyup", (e) => {
  const searchBarValue = e.target.value.toLowerCase();
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
    if (searchBarValue.length >= 3) {
      return (
        recipe.name.toLowerCase().includes(searchBarValue) ||
        recipe.description.toLowerCase().includes(searchBarValue)
      );
    } else {
      return recipe;
    }
  });
  displayRecipes(filteredRecipes);
  /*test first algo
  for (let a = 0; a < searchElement.length; a++) {
    if (
      !searchElement[a].innerHTML.toLowerCase().includes(searchBarValue) &&
      searchBarValue.length >= 3
    ) {
      searchElement[a].style.display = "none";
      searchElement[a].classList.add("hide-recipe");
      searchElement[a].classList.remove("show-recipe");
    } else {
      searchElement[a].style.display = "";
      matchFound = true;
      searchElement[a].classList.add("show-recipe");
      searchElement[a].classList.remove("hide-recipe");
    }
  }
  if (!matchFound) {
    errorSearch.style.display = "block";
  } else {
    errorSearch.style.display = "none";
  }*/
});

// maj listing on search
searchBar.onkeyup = function () {
  let matchFound = false;
  let value = searchBar.value.toLowerCase();
  for (let list of lists) {
    for (let card of cards) {
      if (!card.innerHTML.includes(list.textContent) && value.length >= 3) {
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
