/*------------------------------------*\
  # Export data from sabores.json to category
\*------------------------------------*/
import sabores from '../assets/data-json/sabores.json';

let imagesNames = [];

imagesNames.add(sabores.default.src);

sabores.items.forEach((item) => {
  imagesNames.add(item.src);
});

let imagesMap = {};

imagesNames.forEach((imageName) => {
  // Creamos un objeto por cada imagen con todas sus variantes de resolución
  imagesMap[imageName] = {
    fallback: new URL(`../assets/images/${imageName}`, import.meta.url).href,
    webp: new URL(`../assets/images/${imageName}?as=webp`, import.meta.url).href,
    webp400: new URL(`../assets/images/${imageName}?as=webp&width=400`, import.meta.url).href,
    webp800: new URL(`../assets/images/${imageName}?as=webp&width=800`, import.meta.url).href,
    webp1200: new URL(`../assets/images/${imageName}?as=webp&width=1200`, import.meta.url).href,
  };
});

document.addEventListener('DOMContentLoaded', () => {
  const gridContenedor = document.getElementById('grid-sabores');
  if (!gridContenedor) {
    console.error('No se encontró el contenedor para los productos.');
    return;
  }

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
          <img class="categoria-card-image" 
            srcset="${imagesMap[sabor.src]['webp400']} 400w, 
                    ${imagesMap[sabor.src]['webp800']} 800w, 
                    ${imagesMap[sabor.src]['webp1200']} 1200w"             
            src="${imagesMap[sabor.src]['webp']}" 
            alt="${sabor.alt}">
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
