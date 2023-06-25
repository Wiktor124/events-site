import { homeTabs } from "./config.js";
import initTabs from "./components/tabs.js";

window.onload = () => {
  initTabs(homeTabs);
}