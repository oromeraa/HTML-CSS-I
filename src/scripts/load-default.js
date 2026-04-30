/*------------------------------------*\
  # Export data from sabores.json to category
\*------------------------------------*/
// import default_item from '../assets/data-json/default.json';
import default_item from '../assets/data-json/default.json';

const DefaultName = default_item.default.src;

let imagesMap = {
  fallback: new URL(`../assets/images/${DefaultName}`, import.meta.url).href,
  webp: new URL(`../assets/images/${DefaultName}?as=webp`, import.meta.url).href,
  webp400: new URL(`../assets/images/${DefaultName}?as=webp&width=400`, import.meta.url).href,
  webp800: new URL(`../assets/images/${DefaultName}?as=webp&width=800`, import.meta.url).href,
  webp1200: new URL(`../assets/images/${DefaultName}?as=webp&width=1200`, import.meta.url).href,
};

document.addEventListener('DOMContentLoaded', () => {
  const gridContenedor = document.getElementById('grid-default');
  if (!gridContenedor) {
    console.error('No se encontró el contenedor para los productos.');
    return;
  }

  const qtyItemsToShow = gridContenedor.getAttribute('data-itemsToShow');
  const qtyItemsLoaded = default_item.items.length;

  console.log('Cantidad de items solicitados en HTML:', qtyItemsToShow);
  console.log('Cantidad total de items en sabores.json:', qtyItemsLoaded);
  const defaultItemsToShow = qtyItemsToShow - qtyItemsLoaded;
  console.log('Cantidad de items por defecto a mostrar:', defaultItemsToShow);

  let htmlToInject = '';

  const defaultCardHTML = `
    <div class="categoria-card">
      <div class="categoria-card-image-wrapper">    
        <img class="categoria-card-image" 
          srcset="${imagesMap['webp400']} 400w, 
                  ${imagesMap['webp800']} 800w, 
                  ${imagesMap['webp1200']} 1200w"             
          src="${imagesMap['webp']}" 
          alt="${default_item.default.alt}">  
      </div>
      <div class="categoria-card-content">
        <h3 class="categoria-card-title">${default_item.default.title}</h3>
        <p class="categoria-card-description">${default_item.default.description}</p>
        <a class="categoria-card-button" href="${default_item.default.link}">
          Leer más
        </a>
      </div>
    </div>  
  `;

  console.log(`Inyectando ${defaultItemsToShow} tarjetas por defecto:`, default_item.default);
  for (let i = 0; i < defaultItemsToShow; i++) {
    htmlToInject += defaultCardHTML;
  }

  gridContenedor.insertAdjacentHTML('beforeend', htmlToInject);
});
