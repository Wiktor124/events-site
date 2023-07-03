import { interactionsTabs } from "./config.js";
import initTabs from "./components/tabs.js";
import dynamic from "./utils/dynamic-data.js";

window.onload = () => {
  dynamic.setState(JSON.parse(localStorage.getItem('appState')))
  initTabs(interactionsTabs);  
}
