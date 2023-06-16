import { getCategory } from "./gallery.js";

const tabsContainer = document.querySelector('#tabs');

function renderTabs() {
  const categoriesArr = ['music', 'sports', 'business', 'food', 'art'];
  
  tabsContainer.innerHTML = categoriesArr.map(category => {
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
  renderTabs();
  
  getCategory(tabsContainer.firstChild.dataset.category);
  tabsContainer.addEventListener('click', handleTabs);
}
export default initTabs;