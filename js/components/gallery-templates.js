import { interactionsCategories } from "../config.js";

const endPoint = new webkitURL(window.location).pathname.replace(/^\/|\.html$/g, "");
const { favorites, interested, going, removeThis } = interactionsCategories;

const templates = {
  going: (id) =>{
    return `
    <span class="check">✔</span>

      <div>
        <p>You're going to this event!.</p>
        <button data-id="${id}" class="default ${removeThis}">Changed your mind?</button>
      </div>
    `;
  },

  interested: (id) =>{
    return `
      <div>
        <p>You're interested in going.</p>
        <button data-id="${id}" class="default">Changed your mind?</button>
      </div>
      <button class="going" data-id="${id}" data-interaction="${going}">Going!</button>
    `;
  },

  intitial(id) {
    return `
      <div class="going-and-interested" data-id="${id}">
        <button class="going" data-id="${id}" data-interaction="${going}">Going!</button>
        <button class="interested" data-id="${id}" data-interaction="${interested}">Interested</button>
      </div>
      <button class="heart" data-id="${id}" data-interaction="${favorites}"></button>
    `;
  }
};

function generateInteractionsButtons(interaction, id, category) {
  if (endPoint === "account") {
    return `
      <p>Not ${interaction} anymore?</p>
      <button data-id="${id}" data-interaction="${category}">Remove</button>
    `;
  }

  return templates.intitial(id);
}


export { generateInteractionsButtons, templates };
