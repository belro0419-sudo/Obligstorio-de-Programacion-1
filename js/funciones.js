// Show Modals

// Variables
//zona de influencers
const agregarInfluencerBtn = document.querySelector(
    ".influencers__show-modal-btn",
  ),
  influencersDialog = document.querySelector(".influencers__dialog"),
  cerrarModalBtn = document.querySelector(".influencers__close-modal-btn"),
  addInfluenceTableBtn = document.querySelector(
    ".influencers__add-influencer-btn",
  ),
  //zona de articulos
  agregarArticuloBtn = document.querySelector(".articles__show-modal-btn"),
  articuloDialog = document.querySelector(".articulo__dialog"),
  cerrarArtModalBtn = document.querySelector(".articles__close-modal-btn"),
  addArticleTableBtn = document.querySelector(".articles__add-modal-btn"),
  //zona de sales
  agregarSalesBtn = document.querySelector(".sales__show-modal-btn"),
  salesDialog = document.querySelector(".sales__dialog"),
  cerrarSalesModalBtn = document.querySelector(".sales__close-modal-btn"),
  addASalesTableBtn = document.querySelector(".sales__add-modal-btn");

// Influencer Modal
agregarInfluencerBtn.addEventListener("click", () => {
  influencersDialog.showModal();
});
cerrarModalBtn.addEventListener("click", () => {
  influencersDialog.close();
});
agregarArticuloBtn.addEventListener("click", () => {
  articuloDialog.showModal();
});
cerrarArtModalBtn.addEventListener("click", () => {
  articuloDialog.close();
});
agregarSalesBtn.addEventListener("click", () => {
  salesDialog.showModal();
});
cerrarSalesModalBtn.addEventListener("click", () => {
  salesDialog.close();
});
//crear tabla influencer
const tablaInfluencers = document.querySelector(".influencers__table");
addInfluenceTableBtn.addEventListener("click", () => {
  const nombre = document.querySelector("#nomInf").value;
  const mail = document.querySelector("#mail").value;
  const comision = document.querySelector("#com").value;
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${mail}</td>
    <td>${comision}%</td>
    <td>$0</td>
    <td>-</td> 
    <td>
      <button class="button">Eliminar</button>
    </td>
  `;
  tablaInfluencers.appendChild(fila);
  influencersDialog.close();
  document.querySelector("#nomInf").value = "";
  document.querySelector("#mail").value = "";
  document.querySelector("#com").value = "";
});
//crear tabla articul
const tablaArticle = document.querySelector(".articles__table");
addArticleTableBtn.addEventListener("click", () => {
  const codigo = document.querySelector("#codigo").value;
  const descripcion = document.querySelector("#descripcion").value;
  const precio = document.querySelector("#precio").value;
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${codigo}</td>
    <td>${descripcion}</td>
    <td>${precio}</td>
  `;
  tablaArticle.appendChild(fila);
  articuloDialog.close();
  document.querySelector("#codigo").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#precio").value = "";
});
//crea tabla de sales
let numeroVentas = 1;
const tablaSales = document.querySelector(".sales__table");
addASalesTableBtn.addEventListener("click", () => {
  const codArt = document.querySelector("#articulo").value;
  const nomInf = document.querySelector("#influencer").value;
  const cantidad = document.querySelector("#cantidad").value;
  const medio = document.querySelector("#medio").value;
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${numeroVentas}</td>
    <td>${codArt}</td>
    <td>${nomInf}</td>
    <td>${cantidad}</td>
    <td>${medio}</td>
    <td>
      <button class="button">Eliminar</button>
    </td>
`;
  tablaSales.appendChild(fila);
  numeroVentas++;
  salesDialog.close();
});
// TODO: Hacer que el <button class="button articles__table-button">Código ↕</button> ordene la tabla de forma ascendente a descendete y visceversa.
/* TODO: Investigar como hacer la grafica de burbujas.
- Debe representar seis valores numericos
- El equipo deberá investigar cómo generar la gráfica de burbujas de colores. Se debe mostrar una gráfica de burbujas que
represente seis valores numéricos. Cada burbuja corresponde al total de ventas de ese medio y su tamaño es proporcional al
monto representado: la burbuja asociada al valor mínimo debe tener un radio equivalente al 10 % del radio máximo,
mientras que la burbuja asociada al valor máximo debe tener el 100 % del radio máximo.
Las demás burbujas deben escalarse de forma proporcional entre esos extremos. Debe indicarse el monto de cada burbuja.
Los colores son a elección. Deben quedar alineadas.
*/
