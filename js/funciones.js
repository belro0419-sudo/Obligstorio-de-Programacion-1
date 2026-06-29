// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 - Iván De León Lino / N° de estudiante: 330339

let sistema = new Sistema();

let ordenInfluencersAscendente = true;
let ordenArticulosAscendente = true;

const botonMostrarModalInfluencer = document.querySelector('.influencers__show-modal-btn',);
const botonMostrarModalArticulo = document.querySelector('.articles__show-modal-btn',);
const botonMostrarModalVenta = document.querySelector('.sales__show-modal-btn');

const dialogoInfluencer = document.querySelector('.influencers__dialog');
const dialogoArticulo = document.querySelector('.articles__dialog');
const dialogoVenta = document.querySelector('.sales__dialog');

const botonCerrarModalInfluencer = document.querySelector('.influencers__close-modal-btn',);
const botonCerrarModalArticulo = document.querySelector('.articles__close-modal-btn',);
const botonCerrarModalVenta = document.querySelector('.sales__close-modal-btn');

const botonAgregarInfluencer = document.querySelector('.influencers__add-influencer-btn',);
const botonAgregarArticulo = document.querySelector('.articles__add-article-btn',);
const botonAgregarVenta = document.querySelector('.sales__add-sale-btn');

const inputNombreInfluencer = document.querySelector('.influencers__name-input',);
const inputMailInfluencer = document.querySelector('.influencers__mail-input');
const inputComisionInfluencer = document.querySelector('.influencers__commission-input',);

const inputCodigoArticulo = document.querySelector('.articles__code-input');
const inputDescripcionArticulo = document.querySelector('.articles__description-input',);
const inputPrecioArticulo = document.querySelector('.articles__price-input');

const selectArticuloVenta = document.querySelector('.sales__article-select');
const selectInfluencerVenta = document.querySelector('.sales__influencer-select',);
const inputCantidadVenta = document.querySelector('.sales__quantity-input');
const selectMedioVenta = document.querySelector('.sales__medium-select');
const spanNumeroVenta = document.querySelector('.sales__article-number');

const cuerpoTablaInfluencers = document.querySelector('.influencers__table-body',);
const cuerpoTablaArticulos = document.querySelector('.articles__table-body');
const cuerpoTablaVentas = document.querySelector('.sales__table-body');

const botonOrdenarInfluencers = document.querySelector('.influencers__table-button',);
const botonOrdenarArticulos = document.querySelector('.articles__table-button');

const graficoBurbujas = document.querySelector('.sales__bubble-chart');

// Control de apertura y cierre de los dialogs

const mostrarModalInfluencer = () => {
  dialogoInfluencer.showModal();
};

const cerrarModalInfluencer = () => {
  dialogoInfluencer.close();
};

const mostrarModalArticulo = () => {
  dialogoArticulo.showModal();
};

const cerrarModalArticulo = () => {
  dialogoArticulo.close();
};

const mostrarModalVenta = () => {
  if (sistema.articulos.length === 0 || sistema.influencers.length === 0) {
    alert(
      'Debe existir al menos un artículo y un influencer para registrar una venta',
    );
  } else {
    spanNumeroVenta.textContent = 'Nro: ' + sistema.proximoNumeroVenta;
    dialogoVenta.showModal();
  }
};

const cerrarModalVenta = () => {
  dialogoVenta.close();
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
  let nombre = inputNombreInfluencer.value;
  let mail = inputMailInfluencer.value.toLowerCase();
  let comision = Number(inputComisionInfluencer.value);

  if (nombre === '' || mail === '' || inputComisionInfluencer.value === '') {
    alert('Todos los campos son obligatorios');
  } else if (comision <= 0) {
    alert('La comisión debe ser mayor a 0');
  } else if (sistema.existeMail(mail)) {
    alert('Ya existe un influencer con ese mail');
  } else if (!mail.includes('@')) {
    alert('El email debe tener un @');
  } else {
    sistema.agregarInfluencer(nombre, mail, comision);

    inputNombreInfluencer.value = '';
    inputMailInfluencer.value = '';
    inputComisionInfluencer.value = '';

    actualizarTodo();
  }
};

const actualizarTablaInfluencers = () => {
  sistema.ordenarInfluencersPorNombre(ordenInfluencersAscendente);
  cuerpoTablaInfluencers.innerHTML = '';
              //REVISARER//
  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];
    let totalComisiones = sistema.calcularTotalComisionesInfluencer(influencer);
    let etiquetas = sistema.obtenerEtiquetasInfluencer(influencer);

    cuerpoTablaInfluencers.innerHTML += `
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

  const botonesDetalle = document.querySelectorAll(
    '.influencers__sales-detail-btn',
  );

  for (let i = 0; i < botonesDetalle.length; i++) {
    botonesDetalle[i].addEventListener('click', mostrarDetalleVentasInfluencer);
  }
};

const mostrarDetalleVentasInfluencer = (evento) => {
  let mail = evento.target.dataset.mail;  //revisar//
  let influencer = sistema.buscarInfluencer(mail);
  let ventas = sistema.obtenerVentasDeInfluencer(influencer);

  if (ventas.length === 0) {
    alert('El influencer ' + influencer.nombre + ' no tiene ventas.');
  } else {
    let mensaje = 'Ventas de ' + influencer.nombre + ':\n\n';

    for (let i = 0; i < ventas.length; i++) {
      let venta = ventas[i];

      mensaje +=
        'Nro ' +
        venta.numero +
        ' - ' +
        venta.cantidad +
        ' x ' +
        venta.articulo.descripcion +
        ' - Precio unitario: $' +
        venta.articulo.precio +
        ' - Total: $' +
        venta.calcularTotal() +
        ' - Comisión: $' +
        venta.calcularComision() +
        '\n';
    }

    alert(mensaje);
  }
};

const actualizarSelectInfluencers = () => {
  selectInfluencerVenta.innerHTML = '';

  for (let i = 0; i < sistema.influencers.length; i++) {
    let influencer = sistema.influencers[i];

    selectInfluencerVenta.innerHTML += `
      <option value="${influencer.mail}">${influencer.nombre}</option>
    `;
  }
};

const agregarArticulo = () => {
  let codigo = inputCodigoArticulo.value;
  let descripcion = inputDescripcionArticulo.value;
  let precio = Number(inputPrecioArticulo.value);

  if (codigo === '' || descripcion === '' || inputPrecioArticulo.value === '') {
    alert('Todos los campos son obligatorios');
  } else if (precio <= 0) {
    alert('El precio debe ser mayor a 0');
  } else if (sistema.existeCodigo(codigo)) {
    alert('Ya existe un artículo con ese código');
  } else {
    sistema.agregarArticulo(codigo, descripcion, precio);

    inputCodigoArticulo.value = '';
    inputDescripcionArticulo.value = '';
    inputPrecioArticulo.value = '';

    actualizarTodo();
  }
};

const actualizarTablaArticulos = () => {
  sistema.ordenarArticulosPorCodigo(ordenArticulosAscendente);
  cuerpoTablaArticulos.innerHTML = '';

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];
    let medalla = '';

    if (sistema.articuloEsMasVendido(articulo)) {
      medalla = ' ⭐';
    }

    cuerpoTablaArticulos.innerHTML += `
      <tr class="articles__table-row">
        <td class="articles__table-cell">${articulo.codigo}${medalla}</td>
        <td class="articles__table-cell">${articulo.descripcion}</td>
        <td class="articles__table-cell">$${articulo.precio}</td>
      </tr>
    `;
  }
};

const actualizarSelectArticulos = () => {
  selectArticuloVenta.innerHTML = '';

  for (let i = 0; i < sistema.articulos.length; i++) {
    let articulo = sistema.articulos[i];

    selectArticuloVenta.innerHTML += `
      <option value="${articulo.codigo}">${articulo.codigo}</option>
    `;
  }
};

const agregarVenta = () => {
  let codigoArticulo = selectArticuloVenta.value;
  let mailInfluencer = selectInfluencerVenta.value;
  let cantidad = Number(inputCantidadVenta.value);
  let medio = Number(selectMedioVenta.value);

  let articulo = sistema.buscarArticulo(codigoArticulo);
  let influencer = sistema.buscarInfluencer(mailInfluencer);

  if (inputCantidadVenta.value === '') {
    alert('La cantidad es obligatoria');
  } else if (cantidad <= 0) {
    alert('La cantidad debe ser mayor a 0');
  } else {
    sistema.agregarVenta(articulo, influencer, cantidad, medio);

    inputCantidadVenta.value = '';
    spanNumeroVenta.textContent = 'Nro: ' + sistema.proximoNumeroVenta;

    actualizarTodo();
  }
};

const actualizarTablaVentas = () => {
  cuerpoTablaVentas.innerHTML = '';

  for (let i = 0; i < sistema.ventas.length; i++) {
    let venta = sistema.ventas[i];

    cuerpoTablaVentas.innerHTML += `
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

  const botonesEliminar = document.querySelectorAll('.sales__delete-btn');

  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener('click', eliminarVenta);
  }
};

const eliminarVenta = (evento) => {
  let numero = Number(evento.target.dataset.number);
  let confirma = confirm('¿Seguro que desea eliminar esta venta?');

  if (confirma) {
    sistema.eliminarVenta(numero);
    actualizarTodo();
  }
};
            //revisar//
const actualizarGraficoBurbujas = () => {
  if (graficoBurbujas === null) {
    return;
  }

  let nombres = ['Instagram', 'YouTube', 'X', 'TikTok', 'Facebook', 'Otras'];
  let clases = ['instagram', 'youtube', 'x', 'tiktok', 'facebook', 'otras'];
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

  graficoBurbujas.innerHTML = '';

  for (let i = 0; i < totales.length; i++) {
    let radio = calcularRadioBurbuja(totales[i], minimo, maximo);

    graficoBurbujas.innerHTML += `
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
  let radioMinimo = 0.5;
  let radioMaximo = 5;

  if (maximo === 0) {
    return radioMinimo;
  }

  if (maximo === minimo) {
    return radioMaximo;
  }

  return (
    radioMinimo +
    ((valor - minimo) * (radioMaximo - radioMinimo)) / (maximo - minimo)
  );
};

const ordenarInfluencers = () => {
  ordenInfluencersAscendente = !ordenInfluencersAscendente;
  actualizarTablaInfluencers();
};

const ordenarArticulos = () => {
  ordenArticulosAscendente = !ordenArticulosAscendente;
  actualizarTablaArticulos();
};

botonMostrarModalInfluencer.addEventListener('click', mostrarModalInfluencer);
botonMostrarModalArticulo.addEventListener('click', mostrarModalArticulo);
botonMostrarModalVenta.addEventListener('click', mostrarModalVenta);

botonCerrarModalInfluencer.addEventListener('click', cerrarModalInfluencer);
botonCerrarModalArticulo.addEventListener('click', cerrarModalArticulo);
botonCerrarModalVenta.addEventListener('click', cerrarModalVenta);

botonAgregarInfluencer.addEventListener('click', agregarInfluencer);
botonAgregarArticulo.addEventListener('click', agregarArticulo);
botonAgregarVenta.addEventListener('click', agregarVenta);

botonOrdenarInfluencers.addEventListener('click', ordenarInfluencers);
botonOrdenarArticulos.addEventListener('click', ordenarArticulos);

actualizarTodo();
