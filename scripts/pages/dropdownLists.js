let searchElements = document.getElementsByClassName("col-4");
let testTag = document.getElementsByClassName("taag");
import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./displayRecipes.js";
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
  cards,
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

/*Search by Tags Test

for (let list of lists) {
  list.addEventListener("click", () => {
    let contentIngredients = list.textContent;
    let badgeIngredients = document.createElement("span");
    tagDiv.appendChild(badgeIngredients);
    if (list.classList.contains("ingredients")) {
      badgeIngredients.style.backgroundColor = "#3282F7";
    } else if (list.classList.contains("appliance")) {
      badgeIngredients.style.backgroundColor = "#68D9A4";
    } else if (list.classList.contains("ustensils")) {
      badgeIngredients.style.backgroundColor = "#ED6454";
    }
    badgeIngredients.classList.add("badge");
    badgeIngredients.style.cursor = "pointer";
    badgeIngredients.innerHTML = contentIngredients;
    badgeIngredients.style.display = "inline-block";
    // tri pour éviter doublons tags
    const ingredientsTags = [...document.querySelectorAll(".badge")];
    const textIngredients = new Set(ingredientsTags.map((x) => x.innerHTML));
    ingredientsTags.forEach((ingredientsTag) => {
      if (textIngredients.has(ingredientsTag.innerHTML)) {
        textIngredients.delete(ingredientsTag.innerHTML);
      } else {
        ingredientsTag.remove();
      }
    });
    for (let searchElement of searchElements) {
      if (!searchElement.innerHTML.includes(list.textContent)) {
        searchElement.style.display = "none";
      }

      badgeIngredients.onclick = function () {
        let teeest = recipes.filter((recipe) => {
          if (
            !recipe.appliance.includes(this.textContent) ||
            !recipe.ustensils.includes(this.textContent)
          ) {
            this.remove();
            return recipe;
          } else {
            return (
              recipe.appliance.includes(this.textContent) ||
              recipe.ustensils.includes(this.textContent)
            );
          }
        });
        displayRecipes(teeest);
      };
    }
  });
}*/

let arrayTestAddTag = [];

for (let list of lists) {
  list.addEventListener("click", (e) => createTag(e));
  list.addEventListener("click", (e) => searchByTag(e));
}

//Creation tag quand on clique sur un élément des dropdown
function createTag(e) {
  let badgeIngredients = document.createElement("span");
  tagDiv.appendChild(badgeIngredients);
  if (e.target.classList.contains("ingredients")) {
    badgeIngredients.style.backgroundColor = "#3282F7";
  } else if (e.target.classList.contains("appliance")) {
    badgeIngredients.style.backgroundColor = "#68D9A4";
  } else if (e.target.classList.contains("ustensils")) {
    badgeIngredients.style.backgroundColor = "#ED6454";
  }
  badgeIngredients.classList.add("badge");
  badgeIngredients.style.cursor = "pointer";
  badgeIngredients.innerHTML = e.target.innerHTML;
  badgeIngredients.style.display = "inline-block";
  // tri pour éviter doublons tags
  const ingredientsTags = [...document.querySelectorAll(".badge")];
  const textIngredients = new Set(ingredientsTags.map((x) => x.innerHTML));
  ingredientsTags.forEach((ingredientsTag) => {
    if (textIngredients.has(ingredientsTag.innerHTML)) {
      textIngredients.delete(ingredientsTag.innerHTML);
    } else {
      ingredientsTag.remove();
    }
  });
  for (let searchElement of searchElements) {
    if (!searchElement.innerHTML.includes(e.target.textContent)) {
      searchElement.style.display = "none";
    }
    arrayTestAddTag.push(badgeIngredients);
  }
}

// Suppression du tag
for (let tag of testTag) {
  tag.addEventListener("click", (e) => deleteTag(e));
  tag.addEventListener("click", (e) => test(e));
}

function deleteTag(e) {
  let tag = e.target;
  tag.remove();
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

function test(e) {
  arrayTestAddTag.forEach((tag) => {
    if (tag.textContent == e.target.textContent) {
      console.log(e.target.textContent);

      let teeest = recipes.filter((recipe) => {
        if (
          recipe.appliance.includes(tag.textContent) ||
          recipe.ustensils.includes(tag.textContent)
        ) {
          return (
            recipe.appliance.includes(tag.textContent) ||
            recipe.ustensils.includes(tag.textContent)
          );
        } else {
          return recipe;
        }
      });
      displayRecipes(teeest);
    }
  });
}
