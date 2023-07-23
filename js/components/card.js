import { interactionsCategories } from '../config.js';
import formatDate from '../utils/format-date.js';

const { favorites, interested, going, remove } = interactionsCategories;

const templates = {
	going: id => {
		return `
    <span class="check">✔</span>

    <div>
      <p>You're going to this event!.</p>
      <button data-id="${id}" data-interaction="${going}"  data-template="${remove}" class="button-link">Changed your mind?</button>
    </div>
    `;
	},

	interested: id => {
		return `
      <div>
        <p>You're interested in going.</p>
        <button data-id="${id}" data-interaction="${interested}" data-template="${remove}" class="button-link">Changed your mind?</button>
      </div>
      <button class="going" data-id="${id}" data-interaction="${going}" data-template="${going}">Going!</button>
    `;
	},

	intitial(id) {
		return `
      <div class="going-and-interested" data-id="${id}">
        <button class="going" data-id="${id}" data-interaction="${going}" data-template="${going}">Going!</button>
        <button class="interested" data-id="${id}" data-interaction="${interested}" data-template="${interested}">Interested</button>
      </div>
      <button class="heart" data-id="${id}" data-interaction="${favorites}"></button>
    `;
	},
};

function generateInteractionsButtons(interaction, id, category) {
	if (document.querySelector('.account-container')) {
		return `
      <p>
        Not ${interaction} anymore?
        <button data-id="${id}" data-interaction="${category}" class="button-link ${remove}">Remove</button>
      </p>
      
    `;
	}

	return templates.intitial(id);
}

const card = (
	{ title, image, date, address, city, state, price },
	{ interaction, id, category },
) => {
	return `
    <img src="${image}" alt="${title}"/>
    <div class="gallery__text">
      <div class="event__info">
        <h3>${title}</h3>
        <p class="date">${formatDate(new Date(date))}.</p>
        <p>${address} • ${city}, ${state}.</p>
        <strong>${price}</strong>
      </div>
      <div class="interactions-container" data-id="${id}">${generateInteractionsButtons(
				interaction,
				id,
				category,
			)}</div>
    </div>
  `;
};

export { card, templates };
