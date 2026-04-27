/*------------------------------------*\
  # Export data from sabores.json to category
\*------------------------------------*/
// import default_item from '../assets/data-json/default.json';
import sabores from '../assets/data-json/sabores.json';

// Solución a eliminar, es una chapuza y me toca hacerlo uno a uno, para esta ocasión lo dejo así pero tengo que buscar la forma de automatizar esto.
const imgDefault = new URL(`../assets/images/in-construction.jpg?as=avif`, import.meta.url).href;
const imgChorizo = new URL(`../assets/images/front-chorizo-pradera.jpg?as=avif`, import.meta.url).href;
const imgCostilla = new URL(`../assets/images/front-costilla-ezequiel.jpg?as=avif`, import.meta.url).href;

console.log('Imagen por defecto cargada:', imgDefault);
console.log('Imagen del chorizo cargada:', imgChorizo);
console.log('Imagen de la costilla cargada:', imgCostilla);

const imagesMap = {
  'in-construction.jpg': imgDefault,
  'front-chorizo-pradera.jpg': imgChorizo,
  'front-costilla-ezequiel.jpg': imgCostilla,
};

document.addEventListener('DOMContentLoaded', () => {
  const gridContenedor = document.getElementById('grid-sabores');
  if (!gridContenedor) console.error('No se encontró el contenedor para los productos.');

  const qtyItemsToShow = gridContenedor.getAttribute('data-itemsToShow');
  const qtyItemsLoaded = sabores.items.length;

  console.log('Cantidad de items solicitados en HTML:', qtyItemsToShow);
  console.log('Cantidad total de items en sabores.json:', qtyItemsLoaded);
  const defaultItemsToShow = qtyItemsToShow - qtyItemsLoaded;
  console.log('Cantidad de items por defecto a mostrar:', defaultItemsToShow);

  let htmlToInject = '';

  sabores.items.forEach((sabor) => {
    const imageFixed = imagesMap[sabor.src];

    htmlToInject += `
      <div class="categoria-card">
        <div class="categoria-card-image-wrapper">
          <img class="categoria-card-image" src="${imageFixed}" alt="${sabor.alt}">
        </div>
        <div class="categoria-card-content">
            <h3 class="categoria-card-title">${sabor.title}</h3>
            <p class="categoria-card-description">${sabor.description}</p>
            <a class="categoria-card-button" href="${sabor.link}">
              Leer más
            </a>
          </div>
        </div>
      </div>
    `;

    console.log('Inyectando tarjeta:', sabor);
  });

  if (defaultItemsToShow <= 0) {
    console.log('No se necesitan tarjetas por defecto, ya se han mostrado suficientes items.');
    return;
  } else {
    const imageFixed = imagesMap[sabores.default.src];

    const defaultCardHTML = `
      <div class="categoria-card">
        <div class="categoria-card-image-wrapper">
          <img class="categoria-card-image" src="${imageFixed}" alt="${sabores.default.alt}">
        </div>
        <div class="categoria-card-content">
          <h3 class="categoria-card-title">${sabores.default.title}</h3>
          <p class="categoria-card-description">${sabores.default.description}</p>
          <a class="categoria-card-button" href="${sabores.default.link}">
            Leer más
          </a>
        </div>
      </div>  
    `;

    console.log(`Inyectando ${defaultItemsToShow} tarjetas por defecto:`, sabores.default);
    for (let i = 0; i < defaultItemsToShow; i++) {
      htmlToInject += defaultCardHTML;
    }
  }

  gridContenedor.insertAdjacentHTML('beforeend', htmlToInject);
});
