import fetchEventsByCategories from "./api.js";
const cache = {};

const cacheProxyCategories = new Proxy(cache, {
  get: async (target, property) => {
    if (property in target) {
      return target[property];
    }

    const data = await fetchEventsByCategories(property);
    target[property] = data;

    return Reflect.get(target, property);
  }
});

export { cacheProxyCategories }


