import { getTabCategory, renderGallery } from './gallery.js';
import { interactionsCategories } from '../config.js';
import intitCalendar from './calendar.js';
import { getState } from '../patterns/state.js';

const tabsContainer = document.querySelector('#tabs');
const mainContainer = document.querySelector('.main-container');

const gallery = document.createElement('ul');
gallery.setAttribute('id', 'gallery');
gallery.className = 'container error-container gallery home-gallery';

function renderTabs(categoires) {
	tabsContainer.innerHTML = categoires
		.map(({ label, category }) => {
			return `<button data-category="${category.toLowerCase()}">${label}</button>`;
		})
		.join('');

	tabsContainer.firstChild.className = 'active';
}

function handleTabs(e) {
	const target = e.target;
	const category = e.target.dataset.category;
	if (!target.matches('button')) return;

	const previousTab = tabsContainer.querySelector('.active');

	if (previousTab) {
		previousTab.removeAttribute('class', 'active');
	}
	target.setAttribute('class', 'active');

	if (category === interactionsCategories.calendar) {
		intitCalendar();
	} else {
		getTabCategory(category);
		const data = getState()[category];
		renderGallery({ data, category });

		mainContainer.innerHTML = gallery.outerHTML;
	}
}

function initTabs(categoiresTabs) {
	renderTabs(categoiresTabs);
	const category = tabsContainer.firstChild?.dataset.category;

	if (category !== interactionsCategories.calendar) {
		mainContainer.innerHTML = gallery.outerHTML;
		tabsContainer.addEventListener('click', handleTabs);

		getTabCategory(tabsContainer.firstChild.dataset.category);
	} else {
		intitCalendar();
	}
}

export default initTabs;
