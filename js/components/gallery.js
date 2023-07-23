import autoGalleryContainerHeight from '../utils/auto-height-node.js';
import { getState, setState } from '../patterns/state.js';
import { getData } from '../patterns/dynamic-data.js';
import { card, templates } from './card.js';

const appState = JSON.parse(localStorage.getItem('appState')) || [];
const galleryHome = document.querySelector('.home-gallery');
const interactionFunctions = {
	going: templates.going,
	interested: templates.interested,
};

function handleInteraction() {
	const appStateJoined = [].concat(...Object.values(appState));

	const container = document.querySelectorAll('.going-and-interested');
	const favoriteButton = document.querySelectorAll('.heart');

	if (!galleryHome && container.length <= 0 && appStateJoined.length <= 0)
		return;

	for (let i = 0; i < container.length; i++) {
		for (let j = 0; j < appStateJoined.length; j++) {
			const id = appStateJoined[j]?.id;

			if (container[i]?.dataset.id === id) {
				const interaction = appStateJoined[j]?.interaction;

				if (interaction === 'favorites') {
					favoriteButton[i].classList.toggle('heart-blue');
				}

				if (interaction !== 'favorites') {
					const key = appStateJoined[j]?.interaction;

					container[i].innerHTML = interactionFunctions?.[key]
						? interactionFunctions?.[key](id)
						: templates.intitial(id);
				}
			}
		}
	}
}

let galleryContainer;
function renderGallery({ data = [], category = '' }) {
	if (data.length === 0) {
		galleryContainer.innerHTML = `<li>There's nothig to show in ${category}</li>`;
		return;
	}

	galleryContainer.innerHTML = data
		?.map(
			({
				interaction,
				id,
				image,
				title,
				date,
				location: { address, city, state },
				price,
			}) => {
				price = Number(price) !== 0 ? `$${price.toFixed(2)}` : 'Free';

				return `
      <li class="gallery__card">
       ${card(
					{ title, image, date, address, city, state, price },
					{ interaction, id, category },
				)}
      </li>
    `;
			},
		)
		.join('');

	handleInteraction();
	autoGalleryContainerHeight();
}

const eventsData = {};
function handleInteractionsButton(e) {
	const { content, category } = eventsData;

	if (!e.target.matches('button')) return;
	const target = e.target;

	const { id, interaction, template } = e.target.dataset;

	setState(
		interaction,
		content.find(event => event.id === id),
	);

	if (target.matches('.heart')) {
		target.classList.toggle('heart-blue');
	}

	if (!target.matches('.heart') && !target.matches('.remove')) {
		const container = document.querySelector(
			`.interactions-container[data-id="${id}"] .going-and-interested`,
		);

		container.innerHTML = interactionFunctions[template]
			? interactionFunctions[template](id)
			: templates.intitial(id);
	}

	if (target.matches('.remove') && !galleryHome) {
		const data = getState()[category];

		renderGallery({ data, category });
	}
}

async function getTabCategory(category) {
	const data = await getData().events?.[category];

	eventsData.content = data;
	eventsData.category = category;

	galleryContainer = document.querySelector('#gallery');
	galleryContainer.addEventListener('click', handleInteractionsButton);

	if (document.querySelector('.account-container')) {
		return renderGallery({ data: getState()[category], category });
	}

	renderGallery({ data, category });
}

export { getTabCategory, renderGallery };
