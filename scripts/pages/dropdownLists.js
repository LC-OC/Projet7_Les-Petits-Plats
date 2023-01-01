let searchElements = document.getElementsByClassName("col-4");
let testTag = document.getElementsByClassName("taag");
import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./index.js";

import {
  lists,
  buttonAppareils,
  buttonIngredients,
  buttonUstensiles,
  dropDownIngredients,
  dropdownAppareils,
  dropdownUstensiles,
  searchBarIngredients,
  searchBarUstensiles,
  searchBarAppareils,
  divListAppareils,
  divListIngredients,
  divListUstensils,
  errorAppareils,
  errorIngredients,
  errorUstensils,
  searchBar,
  tagDiv,
} from "./DOM.js";

// Color button
buttonAppareils.style.backgroundColor = "#68D9A4";
buttonAppareils.style.borderColor = "#68D9A4";
buttonUstensiles.style.backgroundColor = "#ED6454";
buttonUstensiles.style.borderColor = "#ED6454";
buttonIngredients.style.backgroundColor = "#3282F7";
buttonIngredients.style.borderColor = "#3282F7";
dropDownIngredients.style.backgroundColor = "#3282F7";
dropdownAppareils.style.backgroundColor = "#68D9A4";
dropdownUstensiles.style.backgroundColor = "#ED6454";

// get elements filters

let arrayFilterIngredients = [];
let arrayFilterUstensils = [];
let arrayFilterAppliance = [];
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    arrayFilterIngredients.push(ingredient.ingredient);
  });
  arrayFilterAppliance.push(recipe.appliance);
  recipe.ustensils.forEach((ustensil) => {
    arrayFilterUstensils.push(ustensil);
  });
});

// tri doublon
let filtredArrayIngredients = [];
let filtredArrayUstensils = [];
let filtredArrayAppliance = [];
arrayFilterIngredients.forEach((ingredient) => {
  if (!filtredArrayIngredients.includes(ingredient)) {
    filtredArrayIngredients.push(ingredient);
  }
});
arrayFilterAppliance.forEach((appliance) => {
  if (!filtredArrayAppliance.includes(appliance)) {
    filtredArrayAppliance.push(appliance);
  }
});
arrayFilterUstensils.forEach((ustensil) => {
  if (!filtredArrayUstensils.includes(ustensil)) {
    filtredArrayUstensils.push(ustensil);
  }
});

// Afficher ingrédients et recherche dans liste
const loadIngredients = () => {
  displayIngredients(filtredArrayIngredients);
};
export const displayIngredients = (filtredArrayIngredients) => {
  const htmlString = filtredArrayIngredients
    .map((filtredIngredients) => {
      const ingredientList = filtredIngredients;
      return `<li class="ingredients lists">${ingredientList}</li>`;
    })
    .join("");
  divListIngredients.innerHTML = htmlString;
};
loadIngredients();

searchBarIngredients.addEventListener("keyup", (e) => {
  const searchBarValue = e.target.value;
  const searchBarLength = searchBarValue.length;
  let matchFound = false;
  const filteredIngredients = filtredArrayIngredients.filter((ingredient) => {
    if (ingredient.toLowerCase().includes(searchBarValue.toLowerCase())) {
      matchFound = true;
    }
    if (!matchFound) {
      errorIngredients.style.display = "block";
    } else {
      errorIngredients.style.display = "none";
    }
    if (searchBarLength >= 3) {
      return ingredient.toLowerCase().includes(searchBarValue.toLowerCase());
    } else {
      return ingredient;
    }
  });
  displayIngredients(filteredIngredients);
});

// Afficher appareils et recherche dans liste
const loadAppliances = () => {
  displayAppliances(filtredArrayAppliance);
};
const displayAppliances = (filtredArrayAppliance) => {
  const htmlString = filtredArrayAppliance
    .map((filtredAppliance) => {
      const applianceList = filtredAppliance;
      return `<li class="appliance lists">${applianceList}</li>`;
    })
    .join("");
  divListAppareils.innerHTML = htmlString;
};
loadAppliances();

searchBarAppareils.addEventListener("keyup", (e) => {
  const searchBarValue = e.target.value;
  const searchBarLength = searchBarValue.length;
  let matchFound = false;
  const filteredAppareils = filtredArrayAppliance.filter((appareil) => {
    if (appareil.toLowerCase().includes(searchBarValue.toLowerCase())) {
      matchFound = true;
    }
    if (!matchFound) {
      errorAppareils.style.display = "block";
    } else {
      errorAppareils.style.display = "none";
    }
    if (searchBarLength >= 3) {
      return appareil.toLowerCase().includes(searchBarValue.toLowerCase());
    } else {
      return appareil;
    }
  });
  displayAppliances(filteredAppareils);
});

// Afficher ustensiles et recherche dans liste
const loadUstensils = () => {
  displayUstentils(filtredArrayUstensils);
};
export const displayUstentils = (filtredArrayUstensils) => {
  const htmlString = filtredArrayUstensils
    .map((filteredUstensils) => {
      const ustensilsList = filteredUstensils;
      return `<li class="ustensils lists">${ustensilsList}</li>`;
    })
    .join("");
  divListUstensils.innerHTML = htmlString;
};
loadUstensils();

searchBarUstensiles.addEventListener("keyup", (e) => {
  const searchBarValue = e.target.value;
  const searchBarLength = searchBarValue.length;
  let matchFound = false;
  const filteredUstensils = filtredArrayUstensils.filter((ustensil) => {
    if (ustensil.toLowerCase().includes(searchBarValue.toLowerCase())) {
      matchFound = true;
    }
    if (!matchFound) {
      errorUstensils.style.display = "block";
    } else {
      errorUstensils.style.display = "none";
    }
    if (searchBarLength >= 3) {
      return ustensil.toLowerCase().includes(searchBarValue.toLowerCase());
    } else {
      return ustensil;
    }
  });
  displayUstentils(filteredUstensils);
});

let arrayAppliance = [];
let arrayUstensils = [];
let arrayIngredients = [];

for (let list of lists) {
  list.addEventListener("click", (e) => createTag(e));
  list.addEventListener("click", (e) => searchByTag(e));
  list.addEventListener("click", (e) => getListing(e));
  list.addEventListener("click", () => triListing());
}

function getListing(e) {
  recipes.forEach((recipe) => {
    let getNameIngredient = recipe.ingredients.map((a) => a.ingredient);
    if (
      recipe.appliance.includes(e.target.textContent) ||
      recipe.ustensils.includes(e.target.textContent) ||
      getNameIngredient.includes(e.target.textContent)
    ) {
      arrayIngredients.push(getNameIngredient);
      arrayAppliance.push(recipe.appliance);
      arrayUstensils.push(recipe.ustensils);
    }
  });
}

function triListing() {
  let newArrayAppliance = new Set(arrayAppliance);
  // tri ustensils
  let newArrayUstensils = new Set(arrayUstensils);
  const cleanArrayUstensils = [];
  newArrayUstensils.forEach((getUstensils) => {
    getUstensils.forEach((getAllUstensils) => {
      cleanArrayUstensils.push(getAllUstensils);
    });
  });
  const arrayFilterUstensils = new Set(cleanArrayUstensils);
  divListUstensils.innerHTML = "";
  for (let ustensils of arrayFilterUstensils) {
    const newListUstensils = document.createElement("li");
    newListUstensils.textContent = ustensils;
    divListUstensils.appendChild(newListUstensils);
    newListUstensils.classList.add("ustensils");
    newListUstensils.addEventListener("click", (e) => createTag(e));
    newListUstensils.addEventListener("click", (e) => searchByTag(e));
    newListUstensils.addEventListener("click", (e) => getListing(e));
  }
  // tri appareils
  divListAppareils.innerHTML = "";
  for (let appareil of newArrayAppliance) {
    const newListAppareil = document.createElement("li");
    newListAppareil.textContent = appareil;
    divListAppareils.appendChild(newListAppareil);
    newListAppareil.classList.add("appliance");
    newListAppareil.addEventListener("click", (e) => createTag(e));
    newListAppareil.addEventListener("click", (e) => searchByTag(e));
    newListAppareil.addEventListener("click", (e) => getListing(e));
  }
  // tri ingrédients
  const arrayCleanIngredient = [];
  arrayIngredients.forEach((ingredient) => {
    ingredient.forEach((getIngredient) => {
      arrayCleanIngredient.push(getIngredient);
    });
  });
  let uniqueArrayIngredient = new Set(arrayCleanIngredient);
  divListIngredients.innerHTML = "";
  for (let listIngredient of uniqueArrayIngredient) {
    const newListIngredient = document.createElement("li");
    newListIngredient.textContent = listIngredient;
    divListIngredients.appendChild(newListIngredient);
    newListIngredient.addEventListener("click", (e) => createTag(e));
    newListIngredient.addEventListener("click", (e) => searchByTag(e));
    newListIngredient.addEventListener("click", (e) => getListing(e));
  }
}

//Creation tag quand on clique sur un élément des dropdown
function createTag(e) {
  let badge = document.createElement("span");
  tagDiv.appendChild(badge);
  if (e.target.classList.contains("ingredients")) {
    badge.style.backgroundColor = "#3282F7";
  } else if (e.target.classList.contains("appliance")) {
    badge.style.backgroundColor = "#68D9A4";
  } else if (e.target.classList.contains("ustensils")) {
    badge.style.backgroundColor = "#ED6454";
  }
  badge.classList.add("badge");
  badge.style.cursor = "pointer";
  badge.innerHTML = e.target.innerHTML;
  badge.style.display = "inline-block";
  // tri pour éviter doublons tags
  const getTags = [...document.querySelectorAll(".badge")];
  const contentTag = new Set(getTags.map((x) => x.innerHTML));
  getTags.forEach((tag) => {
    if (contentTag.has(tag.innerHTML)) {
      contentTag.delete(tag.innerHTML);
    } else {
      tag.remove();
    }
  });
}

//Suppression du tag
for (let tag of testTag) {
  tag.addEventListener("click", (e) => deleteTag(e));
}

function deleteTag(e) {
  let tag = e.target;
  tag.remove();
  tagDiv.textContent = "";
  searchBar.value = "";
  displayRecipes(recipes);
  arrayUstensils = [];
  displayUstentils(filtredArrayUstensils);
  arrayAppliance = [];
  displayAppliances(filtredArrayAppliance);
  arrayIngredients = [];
  displayIngredients(filtredArrayIngredients);
  window.location.reload();
}

function searchByTag(e) {
  for (let searchElement of searchElements) {
    if (!searchElement.innerHTML.includes(e.target.textContent)) {
      searchElement.style.display = "none";
    } else {
      searchElement.style.display = "block";
    }
  }
}
