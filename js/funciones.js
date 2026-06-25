// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 - Iván De León Lino / N° de estudiante: 330339

let sistema = new Sistema();

let ordenInfluencersAscendente = true;
let ordenArticulosAscendente = true;

const showInfluencerModalBtn = document.querySelector(".influencers__show-modal-btn");
const showArticleModalBtn = document.querySelector(".articles__show-modal-btn");
const showSaleModalBtn = document.querySelector(".sales__show-modal-btn");

const influencerDialog = document.querySelector(".influencers__dialog");
const articleDialog = document.querySelector(".articles__dialog");
const saleDialog = document.querySelector(".sales__dialog");

const closeInfluencerModalBtn = document.querySelector(".influencers__close-modal-btn");
const closeArticleModalBtn = document.querySelector(".articles__close-modal-btn");
const closeSaleModalBtn = document.querySelector(".sales__close-modal-btn");

const addInfluencerBtn = document.querySelector(".influencers__add-influencer-btn");
const addArticleBtn = document.querySelector(".articles__add-article-btn");
const addSaleBtn = document.querySelector(".sales__add-sale-btn");

const influencerNameInput = document.querySelector(".influencers__name-input");
const influencerMailInput = document.querySelector(".influencers__mail-input");
const influencerCommissionInput = document.querySelector(".influencers__commission-input");

const articleCodeInput = document.querySelector(".articles__code-input");
const articleDescriptionInput = document.querySelector(".articles__description-input");
const articlePriceInput = document.querySelector(".articles__price-input");

const saleArticleSelect = document.querySelector(".sales__article-select");
const saleInfluencerSelect = document.querySelector(".sales__influencer-select");
const saleQuantityInput = document.querySelector(".sales__quantity-input");
const saleMediumSelect = document.querySelector(".sales__medium-select");
const saleNumberSpan = document.querySelector(".sales__article-number");

const influencersTableBody = document.querySelector(".influencers__table-body");
const articlesTableBody = document.querySelector(".articles__table-body");
const salesTableBody = document.querySelector(".sales__table-body");

const sortInfluencersBtn = document.querySelector(".influencers__table-button");
const sortArticlesBtn = document.querySelector(".articles__table-button");

const bubbleChart = document.querySelector(".sales__bubble-chart");

const mostrarModalInfluencer = () => {
  influencerDialog.showModal();
};

const cerrarModalInfluencer = () => {
  influencerDialog.close();
};

const mostrarModalArticulo = () => {
  articleDialog.showModal();
};

const cerrarModalArticulo = () => {
  articleDialog.close();
};

const mostrarModalVenta = () => {
  if (sistema.articulos.length === 0 || sistema.influencers.length === 0) {
    alert("Debe existir al menos un artículo y un influencer para registrar una venta");
  } else {
    saleNumberSpan.textContent = "Nro: " + sistema.proximoNumeroVenta;
    saleDialog.showModal();
  }
};

const cerrarModalVenta = () => {
  saleDialog.close();
};

const actualizarTodo = () => {
  actualizarSelectInfluencers();
  actualizarSelectArticulos();
  actualizarTablaInfluencers();
  actualizarTablaArticulos();
  actualizarTablaVentas();
  actualizarGraficoBurbujas();
};

const agregarInfluencer = () => {
  let nombre = influencerNameInput.value.trim();
  let mail = influencerMailInput.value.trim().toLowerCase();
  let comision = Number(influencerCommissionInput.value);

  if (nombre === "" || mail === "" || influencerCommissionInput.value === "") {
    alert("Todos los campos son obligatorios");
  } else if (comision <= 0) {
    alert("La comisión debe ser mayor a 0");
  } else if (sistema.existeMail(mail)) {
    alert("Ya existe un influencer con ese mail");
  } else {
    sistema.agregarInfluencer(nombre, mail, comision);

    influencerNameInput.value = "";
    influencerMailInput.value = "";
    influencerCommissionInput.value = "";

    actualizarTodo();
  }
};

const actualizarTablaInfluencers = () => {
  sistema.ordenarInfluencersPorNombre(ordenInfluencersAscendente);
  influencersTableBody.innerHTML = "";

  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];
    let totalComisiones = sistema.calcularTotalComisionesInfluencer(influencer);
    let etiquetas = sistema.obtenerEtiquetasInfluencer(influencer);

    influencersTableBody.innerHTML += `
      <tr class="influencers__table-row">
        <td class="influencers__table-cell">${influencer.nombre}</td>
        <td class="influencers__table-cell">${influencer.mail}</td>
        <td class="influencers__table-cell">${influencer.comision}%</td>
        <td class="influencers__table-cell">$${totalComisiones}</td>
        <td class="influencers__table-cell">${etiquetas}</td>
        <td class="influencers__table-cell">
          <button type="button" class="button influencers__sales-detail-btn" data-mail="${influencer.mail}">
            Ventas
          </button>
        </td>
      </tr>
    `;
  }

  const detailButtons = document.querySelectorAll(".influencers__sales-detail-btn");

  for (let i = 0; i < detailButtons.length; i++) {
    detailButtons[i].addEventListener("click", mostrarDetalleVentasInfluencer);
  }
};

const mostrarDetalleVentasInfluencer = (evento) => {
  let mail = evento.target.dataset.mail;
  let influencer = sistema.buscarInfluencer(mail);
  let ventas = sistema.obtenerVentasDeInfluencer(influencer);

  if (ventas.length === 0) {
    alert("El influencer " + influencer.nombre + " no tiene ventas.");
  } else {
    let mensaje = "Ventas de " + influencer.nombre + ":\n\n";

    for (let i = 0; i < ventas.length; i++) {
      let venta = ventas[i];

      mensaje +=
        "Nro " + venta.numero +
        " - " + venta.cantidad + " x " + venta.articulo.descripcion +
        " - Precio unitario: $" + venta.articulo.precio +
        " - Total: $" + venta.calcularTotal() +
        " - Comisión: $" + venta.calcularComision() +
        "\n";
    }

    alert(mensaje);
  }
};

const actualizarSelectInfluencers = () => {
  saleInfluencerSelect.innerHTML = "";

  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];

    saleInfluencerSelect.innerHTML += `
      <option value="${influencer.mail}">${influencer.nombre}</option>
    `;
  }
};

const agregarArticulo = () => {
  let codigo = articleCodeInput.value.trim();
  let descripcion = articleDescriptionInput.value.trim();
  let precio = Number(articlePriceInput.value);

  if (codigo === "" || descripcion === "" || articlePriceInput.value === "") {
    alert("Todos los campos son obligatorios");
  } else if (precio <= 0) {
    alert("El precio debe ser mayor a 0");
  } else if (sistema.existeCodigo(codigo)) {
    alert("Ya existe un artículo con ese código");
  } else {
    sistema.agregarArticulo(codigo, descripcion, precio);

    articleCodeInput.value = "";
    articleDescriptionInput.value = "";
    articlePriceInput.value = "";

    actualizarTodo();
  }
};

const actualizarTablaArticulos = () => {
  sistema.ordenarArticulosPorCodigo(ordenArticulosAscendente);
  articlesTableBody.innerHTML = "";

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];
    let medalla = "";

    if (sistema.articuloEsMasVendido(articulo)) {
      medalla = " ⭐";
    }

    articlesTableBody.innerHTML += `
      <tr class="articles__table-row">
        <td class="articles__table-cell">${articulo.codigo}${medalla}</td>
        <td class="articles__table-cell">${articulo.descripcion}</td>
        <td class="articles__table-cell">$${articulo.precio}</td>
      </tr>
    `;
  }
};

const actualizarSelectArticulos = () => {
  saleArticleSelect.innerHTML = "";

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];

    saleArticleSelect.innerHTML += `
      <option value="${articulo.codigo}">${articulo.codigo}</option>
    `;
  }
};

const agregarVenta = () => {
  let codigoArticulo = saleArticleSelect.value;
  let mailInfluencer = saleInfluencerSelect.value;
  let cantidad = Number(saleQuantityInput.value);
  let medio = Number(saleMediumSelect.value);

  let articulo = sistema.buscarArticulo(codigoArticulo);
  let influencer = sistema.buscarInfluencer(mailInfluencer);

  if (saleQuantityInput.value === "") {
    alert("La cantidad es obligatoria");
  } else if (cantidad <= 0) {
    alert("La cantidad debe ser mayor a 0");
  } else {
    sistema.agregarVenta(articulo, influencer, cantidad, medio);

    saleQuantityInput.value = "";

    actualizarTodo();
  }
};

const actualizarTablaVentas = () => {
  salesTableBody.innerHTML = "";

  for (let i = 0; i < sistema.ventas.length; i++) {
    let venta = sistema.ventas[i];

    salesTableBody.innerHTML += `
      <tr class="sales__table-row">
        <td class="sales__table-cell">${venta.numero}</td>
        <td class="sales__table-cell">${venta.articulo.codigo}</td>
        <td class="sales__table-cell">${venta.influencer.nombre}</td>
        <td class="sales__table-cell">${venta.cantidad}</td>
        <td class="sales__table-cell">${venta.textoMedio()}</td>
        <td class="sales__table-cell">
          <button type="button" class="button sales__delete-btn" data-number="${venta.numero}">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  }

  const deleteButtons = document.querySelectorAll(".sales__delete-btn");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", eliminarVenta);
  }
};

const eliminarVenta = (evento) => {
  let numero = Number(evento.target.dataset.number);
  let confirma = confirm("¿Seguro que desea eliminar esta venta?");

  if (confirma) {
    sistema.eliminarVenta(numero);
    actualizarTodo();
  }
};

const actualizarGraficoBurbujas = () => {
  if (bubbleChart === null) {
    return;
  }

  let nombres = ["Instagram", "YouTube", "X", "TikTok", "Facebook", "Otras"];
  let clases = ["instagram", "youtube", "x", "tiktok", "facebook", "otras"];
  let totales = [];

  for (let i = 1; i <= 6; i++) {
    totales.push(sistema.obtenerTotalVendidoPorMedio(i));
  }

  let maximo = 0;
  let minimo = totales[0];

  for (let i = 0; i < totales.length; i++) {
    if (totales[i] > maximo) {
      maximo = totales[i];
    }

    if (totales[i] < minimo) {
      minimo = totales[i];
    }
  }

  bubbleChart.innerHTML = "";

  for (let i = 0; i < totales.length; i++) {
    let radio = calcularRadioBurbuja(totales[i], minimo, maximo);

    bubbleChart.innerHTML += `
      <div class="sales__bubble-container">
        <div
          class="sales__bubble sales__bubble--${clases[i]}"
          style="width: ${radio}rem; height: ${radio}rem;"
        >
          ${totales[i]}
        </div>
        <span>${i + 1} - ${nombres[i]}</span>
      </div>
    `;
  }
};

const calcularRadioBurbuja = (valor, minimo, maximo) => {
  let radioMinimo = 1;
  let radioMaximo = 5;

  if (maximo === 0) {
    return radioMinimo;
  }

  if (maximo === minimo) {
    return radioMaximo;
  }

  return radioMinimo + ((valor - minimo) * (radioMaximo - radioMinimo)) / (maximo - minimo);
};

const ordenarInfluencers = () => {
  ordenInfluencersAscendente = !ordenInfluencersAscendente;
  actualizarTablaInfluencers();
};

const ordenarArticulos = () => {
  ordenArticulosAscendente = !ordenArticulosAscendente;
  actualizarTablaArticulos();
};

showInfluencerModalBtn.addEventListener("click", mostrarModalInfluencer);
showArticleModalBtn.addEventListener("click", mostrarModalArticulo);
showSaleModalBtn.addEventListener("click", mostrarModalVenta);

closeInfluencerModalBtn.addEventListener("click", cerrarModalInfluencer);
closeArticleModalBtn.addEventListener("click", cerrarModalArticulo);
closeSaleModalBtn.addEventListener("click", cerrarModalVenta);

addInfluencerBtn.addEventListener("click", agregarInfluencer);
addArticleBtn.addEventListener("click", agregarArticulo);
addSaleBtn.addEventListener("click", agregarVenta);

sortInfluencersBtn.addEventListener("click", ordenarInfluencers);
sortArticlesBtn.addEventListener("click", ordenarArticulos);

actualizarTodo();