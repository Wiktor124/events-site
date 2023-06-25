import { cacheProxyCategories } from "../services/cache.js";
import formatDate from "../utils/format-date.js";
import autoGalleryContainerHeight from "../utils/auto-height-node.js";

function renderGallery(media) {
  document.querySelector('#gallery').innerHTML = media.map(({ image, title, date, location, price }) => {
    const { address, city, state } = location;
    price = Number(price) !== 0 ? `$${price.toFixed(2)}`: 'Free';

    return `
      <li class="gallery__card">
        <img src="${image}" alt="${title}"/>
        <div class="gallery__text">
          <h3>${title}</h3>
          <p class="date">${formatDate(new Date(date))}.</p>
          <p>${address} • ${city}, ${state}.</p>
          <strong>${price}</strong>
        </div>
      </li>
    `
  }).join('');
  
  autoGalleryContainerHeight();
}

async function getTabCategory(category) {
  const content = await cacheProxyCategories[category];

  renderGallery(content);
}
export default getTabCategory;