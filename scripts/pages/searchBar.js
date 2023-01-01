import { errorSearch, searchBar, searchElement } from "./DOM.js";

searchBar.addEventListener("keyup", (e) => {
  const searchBarValue = e.target.value.toLowerCase();
  let matchFound = false;
  //first algo
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
  }
});
