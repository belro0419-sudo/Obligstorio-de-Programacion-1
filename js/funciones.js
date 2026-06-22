// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 -  Iván De León Lino / N° de estudiante: 330339

// Show Modals

// Variables

//zona de influencers
const agregarInfluencerBtn = document.querySelector(".influencers__show-modal-btn"),
      influencersDialog    = document.querySelector(".influencers__dialog"),
      cerrarModalBtn       = document.querySelector(".influencers__close-modal-btn"),
      addInfluenceTableBtn = document.querySelector(".influencers__add-influencer-btn"),

  //zona de articulos
      agregarArticuloBtn   = document.querySelector(".articles__show-modal-btn"),
      articuloDialog       = document.querySelector(".articulo__dialog"),
      cerrarArtModalBtn    = document.querySelector(".articles__close-modal-btn"),
      addArticleTableBtn   = document.querySelector(".articles__add-modal-btn"),

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
const tablaInfluencers = document.querySelector(".influencers__table-body");

addInfluenceTableBtn.addEventListener("click", () => {

  const nombre   = document.querySelector("#nomInf").value;
  const mail     = document.querySelector("#mail").value;
  const comision = document.querySelector("#com").value;
  
  const fila     = document.createElement("tr");

  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${mail}</td>
    <td>${comision}%</td>
    <td>$0</td>
    <td></td> 
    <td>
      <button class="button influencers__table-delete-btn">Eliminar</button>
    </td>
  `;
  tablaInfluencers.appendChild(fila);
  influencersDialog.close();
  document.querySelector("#nomInf").value = "";
  document.querySelector("#mail").value = "";
  document.querySelector("#com").value = "";
});

<<<<<<< Updated upstream
tablaInfluencers.addEventListener("click", (e) => {

  if (e.target.classList.contains("influencers__table-delete-btn")) {
    e.target.parentElement.parentElement.remove();}
=======
let eliminarVenta = document.querySelector(".influencers__table-delete-btn");

eliminarVenta.addEventListener("click", (e) => {

  
>>>>>>> Stashed changes

})


<<<<<<< Updated upstream
// Boton ordenar por nombre
const sortBtn = document.querySelector(".influencers__table-button");
let ascendente = true;

sortBtn.addEventListener("click", () => {
  
  const filas = Array.from(tablaInfluencers.rows);

  filas.sort((filaUno, filaDos) => {
    const nombreA = filaUno.cells[0].textContent;
    const nombreB = filaDos.cells[0].textContent;

    if (ascendente) {
      return nombreA.localeCompare(nombreB, "es");
    } else {
      return nombreB.localeCompare(nombreA, "es");
    }
    });

    filas.forEach((fila) => tablaInfluencers.appendChild(fila));
    ascendente = !ascendente
});



=======
>>>>>>> Stashed changes

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
      <button class="button">❌</button>
    </td>
`;
  tablaSales.appendChild(fila);
  numeroVentas++;
  salesDialog.close();
});
