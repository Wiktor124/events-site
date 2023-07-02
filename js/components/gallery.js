import formatDate from "../utils/format-date.js";
import autoGalleryContainerHeight from "../utils/auto-height-node.js";
import appInteractions from "../interactions/singleton.js";
import dynamic from "../utils/dynamic-data.js";
import { generateInteractionsButtons, templates } from "./gallery-templates.js";
import { interactionsCategories } from "../config.js";

const galleryContainer = document.querySelector("#gallery");

function renderGallery({ data, category }) {

  console.log(data);
  galleryContainer.innerHTML = data
    ?.map(({ interaction, id, image, title, date, location: { address, city, state }, price }) => {
      price = Number(price) !== 0 ? `$${price.toFixed(2)}` : "Free";

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

}


let content;
function handleInteractions(e, category) {
  if (!e.target.matches("button")) return;

  const target = e.target;
  const { id, interaction, template } = e.target.dataset;
  const { going, interested, remove, favorites } = interactionsCategories;
  appInteractions.setState(interaction, content.find(event => event.id === id));


  // appInteractions.setState(interaction, content.find(event => event.id === id));
  if (target.matches('.heart')) {
    target.classList.toggle('heart-blue');
  }
  

  // if(target.matches(`.${remove}`)) {
 
  // }

  // document.querySelectorAll('.interactions-container').forEach(item => {
  //   if (item.dataset.id === id) {
  //     const container = item.querySelector('.going-and-interested');

  //     const interactionFunctions = {
  //       going: templates.going,
  //       interested: templates.interested
  //     };

  //     container.innerHTML = interactionFunctions[interaction] 
  //     ? interactionFunctions[interaction](id, interaction)
  //     : templates.intitial(id);


  //   }
  // });


  if(!target.matches('.heart') || !target.matches(`.${remove}`)) {
    const container = document.querySelector(`.interactions-container[data-id="${id}"] .going-and-interested`);
    const interactionFunctions = {
      going: templates.going,
      interested: templates.interested
    };
    
    container.innerHTML = interactionFunctions?.[template]
    ? interactionFunctions?.[template](id, interaction) : templates.intitial(id);
  }
  

  // if(template === remove || target.matches(`.${remove}`)) {
  //   appInteractions.removeInteraction(interaction, id)
  // }
}




async function getTabCategory(category) {
  const data = await dynamic.getState().events?.[category];
  content = data;

  galleryContainer.addEventListener("click", (e) => handleInteractions(e, category));
  renderGallery({ data, category });
}

export { getTabCategory, renderGallery };
