import fetchData from "./api.js";
const cache = {};

const cacheProxyCategories = new Proxy(cache, {
  get: async (target, property) => {
    if (property in target) {
      return target[property];
    }
    
    const data = await fetchData(property);
    target[property] = data;

    return Reflect.get(target, property);
  },
  set: async (target, property, value) => {
    target[property] = value;

    return Reflect.set(target, property, value);
  },
});

export { cacheProxyCategories }


