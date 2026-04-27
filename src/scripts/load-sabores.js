/*------------------------------------*\
  # Export data from sabores.json to category
\*------------------------------------*/
// import default_item from '../assets/data-json/default.json';
import sabores from '../assets/data-json/sabores.json';

// Solución a eliminar, es una chapuza y me toca hacerlo uno a uno, para esta ocasión lo dejo así pero tengo que buscar la forma de automatizar esto.
const imgDefault = new URL(`../assets/images/in-construction.jpg`, import.meta.url).href;
const imgChorizo = new URL(`../assets/images/front-chorizo-pradera.jpg`, import.meta.url).href;
const imgCostilla = new URL(`../assets/images/front-costilla-ezequiel.jpg`, import.meta.url).href;

const imgDefaultWebp = new URL(`../assets/images/in-construction.jpg?as=webp`, import.meta.url).href;
const imgChorizoWebp = new URL(`../assets/images/front-chorizo-pradera.jpg?as=webp`, import.meta.url).href;
const imgCostillaWebp = new URL(`../assets/images/front-costilla-ezequiel.jpg?as=webp`, import.meta.url).href;

const imgDefaultAvif = new URL(`../assets/images/in-construction.jpg?as=avif`, import.meta.url).href;
const imgChorizoAvif = new URL(`../assets/images/front-chorizo-pradera.jpg?as=avif`, import.meta.url).href;
const imgCostillaAvif = new URL(`../assets/images/front-costilla-ezequiel.jpg?as=avif`, import.meta.url).href;

const imgDefaultWebpWide = new URL(`../assets/images/in-construction-wide.jpg?as=webp`, import.meta.url).href;
const imgChorizoWebpWide = new URL(`../assets/images/front-chorizo-pradera-wide.jpg?as=webp`, import.meta.url).href;
const imgCostillaWebpWide = new URL(`../assets/images/front-costilla-ezequiel-wide.jpg?as=webp`, import.meta.url).href;

const imgDefaultAvifWide = new URL(`../assets/images/in-construction-wide.jpg?as=avif`, import.meta.url).href;
const imgChorizoAvifWide = new URL(`../assets/images/front-chorizo-pradera-wide.jpg?as=avif`, import.meta.url).href;
const imgCostillaAvifWide = new URL(`../assets/images/front-costilla-ezequiel-wide.jpg?as=avif`, import.meta.url).href;

const imagesMap = {
  default: {
    'in-construction.jpg': imgDefault,
    'front-chorizo-pradera.jpg': imgChorizo,
    'front-costilla-ezequiel.jpg': imgCostilla,
  },
  webp: {
    'in-construction.jpg': imgDefaultWebp,
    'front-chorizo-pradera.jpg': imgChorizoWebp,
    'front-costilla-ezequiel.jpg': imgCostillaWebp,
  },
  avif: {
    'in-construction.jpg': imgDefaultAvif,
    'front-chorizo-pradera.jpg': imgChorizoAvif,
    'front-costilla-ezequiel.jpg': imgCostillaAvif,
  },
  webpWide: {
    'in-construction.jpg': imgDefaultWebpWide,
    'front-chorizo-pradera.jpg': imgChorizoWebpWide,
    'front-costilla-ezequiel.jpg': imgCostillaWebpWide,
  },
  avifWide: {
    'in-construction.jpg': imgDefaultAvifWide,
    'front-chorizo-pradera.jpg': imgChorizoAvifWide,
    'front-costilla-ezequiel.jpg': imgCostillaAvifWide,
  },
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
    // Solo para obtener los datos de imagen y texto, no es un sabor real
    htmlToInject += `
      <div class="categoria-card">
        <div class="categoria-card-image-wrapper">
          <picture>
            <source media="(max-width: 1023px)"
              type="image/avif"
              srcset="${imagesMap['avif'][sabor.src]}">
            <source
              type="image/avif"
              srcset="${imagesMap['avifWide'][sabor.src]}">

            <source media="(max-width: 1023px)"
              type="image/webp"
              srcset="${imagesMap['webp'][sabor.src]}">
            <source
              type="image/webp"
              srcset="${imagesMap['webpWide'][sabor.src]}">

            <img class="categoria-card-image" 
              src="${imagesMap['default'][sabor.src]}" 
              alt="${sabor.alt}">
          </picture>
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
    const sabor = sabores.default;

    const defaultCardHTML = `
      <div class="categoria-card">
        <div class="categoria-card-image-wrapper">
          <picture>
            <source media="(max-width: 1023px)"
              type="image/avif"
              srcset="${imagesMap['avif'][sabor.src]}">
            <source
              type="image/avif"
              srcset="${imagesMap['avifWide'][sabor.src]}">

            <source media="(max-width: 1023px)"
              type="image/webp"
              srcset="${imagesMap['webp'][sabor.src]}">
            <source
              type="image/webp"
              srcset="${imagesMap['webpWide'][sabor.src]}">

            <img class="categoria-card-image" 
              src="${imagesMap['default'][sabor.src]}" 
              alt="${sabor.alt}">
          </picture>
        </div>
        <div class="categoria-card-content">
            <h3 class="categoria-card-title">${sabor.title}</h3>
            <p class="categoria-card-description">${sabor.description}</p>
            <a class="categoria-card-button" href="${sabor.link}">
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
