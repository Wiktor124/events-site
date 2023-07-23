import { interactionsCategories } from '../config.js';

let state = {};

const appState = {
	getState() {
		return JSON.parse(localStorage.getItem('appState')) || {};
	},

	setState(interactionKey, data) {
		const currentState = getState();
		const existingCategory = currentState[interactionKey] || [];
		const isDuplicate = existingCategory.some(item => item.id === data.id);

		if (isDuplicate) {
			const index = existingCategory.findIndex(item => item.id === data.id);

			existingCategory.splice(index, 1);
		} else {
			existingCategory.push({ interaction: interactionKey, ...data });

			const interactionsSwitch = {
				going: interactionsCategories.interested,
				interested: interactionsCategories.going,
			}[interactionKey];

			const index = currentState[interactionsSwitch]?.findIndex(
				item => item.id === data.id,
			);

			if (index > -1) {
				currentState[interactionsSwitch].splice(index, 1);
			}
		}

		currentState[interactionKey] = existingCategory;
		state = { ...getState(), ...currentState };
		localStorage.setItem('appState', JSON.stringify(state));
	},
};
const { getState, setState } = Object.freeze(appState);

export { getState, setState };
