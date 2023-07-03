import { homeTabs } from "./config.js";
import initTabs from "./components/tabs.js";
import dynamic from "./utils/dynamic-data.js";
import { cacheProxyCategories } from "./services/cache.js";


window.onload = () => {
  dynamic.setState(cacheProxyCategories)
  initTabs(homeTabs);
}