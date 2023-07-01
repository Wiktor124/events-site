import formatDate from "../utils/format-date.js";
import autoGalleryContainerHeight from "../utils/auto-height-node.js";
import appInteractions from "../interactions/singleton.js";
import dynamic from "../utils/dynamic-data.js";
import { generateInteractionsButtons, templates } from "./gallery-templates.js";
import { interactionsCategories } from "../config.js";

const galleryContainer = document.querySelector("#gallery");

function renderGallery({ data, category}) {
  let interactionKey;
  let eventId;

  console.log(data);
  galleryContainer.innerHTML = data
    ?.map(({ interaction, id, image, title, date, location:  { address, city, state }, price }) => {
      price = Number(price) !== 0 ? `$${price.toFixed(2)}` : "Free";
      interactionKey =  interaction;
      eventId = id;
      

      return `
      <li class="gallery__card">
        <img src="${image}" alt="${title}"/>
        <div class="gallery__text">
          <div class="event__info">
            <h3>${title}</h3>
            <p class="date">${formatDate(new Date(date))}.</p>
            <p>${address} • ${city}, ${state}.</p>
            <strong>${price}</strong>
          </div>
          <div class="interactions-container" data-id="${id}">${generateInteractionsButtons(interaction, id, category)}</div>
        </div>
      </li>
    `;
  }).join("");
  autoGalleryContainerHeight();

  const appState = JSON.parse(localStorage.getItem('appState')) || [];
  const arregloUnido = [].concat(...Object.values(appState))
  // console.table(arregloUnido);
  const interactionsContainer = document.querySelectorAll('.interactions-container')
  const hearts = document.querySelectorAll('.heart')
  const { favorites } = interactionsCategories;

  
  const test = data.find((item, i) => {
    const eventId = arregloUnido[i]?.id;
    return eventId && eventId.toString() === item.id.toString();
  });
  console.log(test);

  
}


let content;
function handleInteractions(e) {
  if (!e.target.matches("button")) return;
  const target = e.target;
  console.log(target);
  const { id, interaction } = e.target.dataset;
  const { going, interested, removeThis } = interactionsCategories;
  appInteractions.setState(interaction, content.find((event) => event.id === id));

  
  if(target.matches('.heart')) {
    target.classList.toggle('heart-blue');
  }
  
  document.querySelectorAll('.interactions-container').forEach(item => {
    if (item.dataset.id === id) {
      const container = item.querySelector('.going-and-interested');

      const interactionFunctions = {
        going: templates.going,
        interested: templates.interested
      };

      container.innerHTML = interactionFunctions[interaction] 
      ? interactionFunctions[interaction](id, interaction)
      : templates.intitial(id);

      
    }
  });
  
}

async function getTabCategory(category) {
  const data = await dynamic.getState().events[category];
  content = data;

  galleryContainer.addEventListener("click", handleInteractions);
  renderGallery({ data, category });
}

export { getTabCategory, renderGallery };
