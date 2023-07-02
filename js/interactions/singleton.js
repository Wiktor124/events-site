import { interactionsCategories } from "../config.js";
let state = {};

const appInteractions = {
  getState() {
    return JSON.parse(localStorage.getItem("appState")) || {};
  },

  setState(interactionKey, data) {
    const currentState = this.getState();
    const existingCategory = currentState[interactionKey] || [];
    const isDuplicate = existingCategory.some((item) => item.id === data.id);
    console.log(data);

    if (isDuplicate) {
      const index = existingCategory.findIndex((item) => item.id === data.id);

      existingCategory.splice(index, 1);
    } else {
      existingCategory.push({ interaction: interactionKey, ...data });

      const interactionsSwitch = {
        going: interactionsCategories.interested,
        interested: interactionsCategories.going,
      }[interactionKey];

      const index = currentState[interactionsSwitch]?.findIndex((item) => item.id === data.id);

      if (index > -1) {
        currentState[interactionsSwitch].splice(index, 1);
      }
    }
    
    currentState[interactionKey] = existingCategory;
    state = { ...this.getState(), ...currentState };
    localStorage.setItem("appState", JSON.stringify(state));
  }
};
Object.freeze(appInteractions);

export default appInteractions;
