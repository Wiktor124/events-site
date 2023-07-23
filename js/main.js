import { homeTabs } from './config.js';
import initTabs from './components/tabs.js';
import { setNewData } from './patterns/dynamic-data.js';
import eventsCache from './services/cache.js';

window.onload = () => {
	setNewData(eventsCache);
	initTabs(homeTabs);
};
