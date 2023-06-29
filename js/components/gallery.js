import formatDate from "../utils/format-date.js";
import autoGalleryContainerHeight from "../utils/auto-height-node.js";
import appInteractions from "../interactions/singleton.js";
import { interactionsCategories } from "../config.js";
import dynamic from "../utils/dynamic-data.js";

const galleryContainer = document.querySelector("#gallery");
const endPoint = new webkitURL(window.location).pathname.replace(/^\/|\.html$/g,"");

function generateInteractionsButtons(id, category) {

  if (endPoint === 'my-account') {
    return `
      <p>Not Going anymore?</p>
      <button data-id="${id}" data-interaction="${category}">Remove</button>
    `;
  }

  const { favorites, interested, going } = interactionsCategories;
    
  return `
    <button data-id="${id}" data-interaction="${interested}">Interested</button>
    <button data-id="${id}" data-interaction="${going}">Going!</button>
    <button class="heart heart-btn" data-id="${id}" data-interaction="${favorites}">
      <img src="./assets/icons/heart.svg" data-id="${id}" data-interaction="${favorites}" class="heart-img"/>
    </button>
  `;
}

function renderGallery({ data, category}) {
  
  galleryContainer.innerHTML = data
    ?.map(({ id, image, title, date, location, price }) => {
      const { address, city, state } = location;
      price = Number(price) !== 0 ? `$${price.toFixed(2)}` : "Free";

      return `
      <li class="gallery__card">
        <img src="${image}" alt="${title}"/>
        <div class="gallery__text">
          <h3>${title}</h3>
          <p class="date">${formatDate(new Date(date))}.</p>
          <p>${address} • ${city}, ${state}.</p>
          <strong>${price}</strong>
          <div class="interactions-container">${generateInteractionsButtons(id, category)}</div>
        </div>
      </li>
    `;
    })
    .join("");
  autoGalleryContainerHeight();
}

let content;
function handleInteractions(e) {
  if (!e.target.matches("button") && !e.target.matches("img")) return;
  const target = e.target;
  const { id, interaction } = e.target.dataset;

  appInteractions.setState(
    interaction,
    content.find((event) => event.id === id)
  );
}

async function getTabCategory(category) {
  const data = await dynamic.getState().events[category];
  content = data;

  galleryContainer.addEventListener("click", handleInteractions);
  renderGallery({ data, category });
}

export { getTabCategory, renderGallery };
