import { homeTabs } from "./config.js";
import initTabs from "./components/tabs.js";
import dynamic from "./patterns/dynamic-data.js";
import eventsCache from "./services/cache.js";

window.onload = () => {
  dynamic.setState(eventsCache)
  initTabs(homeTabs);
}