import { getCategory } from "./gallery.js";
import { tabsCategories } from "../config.js";

const tabsContainer = document.querySelector('#tabs');

function renderTabs(categoires) {  
  tabsContainer.innerHTML = categoires.map(category => {
    return `<button data-category="${category.toLowerCase()}">${category}</button>`
  }).join('');
  
  tabsContainer.firstChild.className = 'active';
}

function handleTabs(e) {
  const target = e.target;
  if(!target.matches('button')) return;
  
  const previousTab = tabsContainer.querySelector('.active');

  previousTab 
    ? previousTab.classList.remove('active') 
    : target.classList.add('active');

  getCategory(target.dataset.category)
}

function initTabs() {
  renderTabs(tabsCategories);
  
  getCategory(tabsContainer.firstChild.dataset.category);
  tabsContainer.addEventListener('click', handleTabs);
}
export default initTabs;