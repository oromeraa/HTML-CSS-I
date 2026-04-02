/*------------------------------------*\
  # Export data from sabores.json to category
\*------------------------------------*/
// import default_item from '../assets/data-json/default.json';
import sabores from '../assets/data-json/sabores.json';

document.addEventListener('DOMContentLoaded', () => {
  const gridContenedor = document.getElementById('grid-sabores');
  if (!gridContenedor) console.error('No se encontró el contenedor para los productos.');

  const qtyItemsToShow = gridContenedor.getAttribute('data-itemsToShow');
  const qtyItemsLoaded = sabores.items.length;
  
  console.log('Cantidad de items solicitados en HTML:', qtyItemsToShow);
  console.log('Cantidad total de items en sabores.json:', qtyItemsLoaded);
  const defaultItemsToShow = qtyItemsToShow - qtyItemsLoaded;
  console.log('Cantidad de items por defecto a mostrar:', defaultItemsToShow);

  sabores.items.forEach(sabor => {
    const imageFixed = new URL(`../assets/images/${sabor.src}`, import.meta.url).href;

    const cardHTML = `
      <div class="categoria-card">
        <a href="${sabor.link}">
          <img src="${imageFixed}" alt="${sabor.alt}">
          <h3>${sabor.title}</h3>
          <p>${sabor.description}</p>
        </a>
      </div>
    `;

    console.log('Inyectando tarjeta:', sabor);
    
    gridContenedor.insertAdjacentHTML('beforeend', cardHTML);
  });
  
  if (defaultItemsToShow <= 0) {
    console.log('No se necesitan tarjetas por defecto, ya se han mostrado suficientes items.');
    return;
  }
  else {
    const imageFixed = new URL(`../assets/images/${sabores.default.src}`, import.meta.url).href;

    const defaultCardHTML = `
      <div class="categoria-card">
        <a href="${sabores.default.link}">
          <img src="${imageFixed}" alt="${sabores.default.alt}">
          <h3>${sabores.default.title}</h3>
          <p>${sabores.default.description}</p>
        </a>
      </div>  
    `;
      
    console.log(`Inyectando ${defaultItemsToShow} tarjetas por defecto:`, sabores.default);
    for (let i = 0; i < defaultItemsToShow; i++) {
      gridContenedor.insertAdjacentHTML('beforeend', defaultCardHTML);
    }  
  }
});
