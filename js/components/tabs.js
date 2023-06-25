import getTabCategory from "./gallery.js";
const tabsContainer = document.querySelector("#tabs");

function renderTabs(categoires) {
  tabsContainer.innerHTML = categoires.map(({ label, category }) => {
      return `<button data-category="${category.toLowerCase()}">${label}</button>`;
  }).join("");

  tabsContainer.firstChild.className = "active";
}

function handleTabs(e) {
  const target = e.target;
  if (!target.matches("button")) return;

  const previousTab = tabsContainer.querySelector(".active");

  if (previousTab) {
    previousTab.removeAttribute("class", "active");
  }
  target.setAttribute("class", "active");

  getTabCategory(target.dataset.category);
}

function initTabs(categoiresTabs) {
  renderTabs(categoiresTabs);

  getTabCategory(tabsContainer.firstChild.dataset.category);
  tabsContainer.addEventListener("click", handleTabs);
}
export default initTabs;
