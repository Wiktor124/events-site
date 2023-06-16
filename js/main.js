import initTabs from "./home/tabs.js";
import autoHeight from "./utils/auto-height-node.js";

window.onload = () => {
  initTabs();
  autoHeight();
}

