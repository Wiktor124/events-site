import { interactionsTabs } from './config.js';
import initTabs from './components/tabs.js';
import { setNewData } from './patterns/dynamic-data.js';
import { getState } from './patterns/state.js';

window.onload = () => {
	setNewData(getState());
	initTabs(interactionsTabs);
};
