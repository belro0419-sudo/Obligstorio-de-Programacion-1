// Ana Belen Rodriguez Berriel / N° de estudiante: 373879 - Iván De León Lino / N° de estudiante: 330339

class Sistema {
  constructor() {
    this.influencers = [];
    this.articulos = [];
    this.ventas = [];
    this.proximoNumeroVenta = 1;
  }

  agregarInfluencer(nombre, mail, comision) {
    mail = mail.toLowerCase();

    let influencer = new Influencer(nombre, mail, comision);
    this.influencers.push(influencer);
  }

  agregarArticulo(codigo, descripcion, precio) {
    let articulo = new Articulo(codigo, descripcion, precio);
    this.articulos.push(articulo);
  }

  agregarVenta(articulo, influencer, cantidad, medio) {
    let venta = new Venta(
      this.proximoNumeroVenta,
      articulo,
      influencer,
      cantidad,
      medio,
    );

    this.ventas.push(venta);
    this.proximoNumeroVenta++;
  }

  eliminarVenta(numero) {
    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].numero === numero) {
        this.ventas.splice(i, 1);
        break;
      }
    }
  }

  existeMail(mail) {
    mail = mail.toLowerCase();
    let existe = false;

    for (let i = 0; i < this.influencers.length; i++) {
      if (this.influencers[i].mail === mail) {
        existe = true;
      }
    }

    return existe;
  }

  existeCodigo(codigo) {
    let existe = false;

    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].codigo.toLowerCase() === codigo.toLowerCase()) {
        existe = true;
      }
    }

    return existe;
  }

  buscarArticulo(codigo) {
    let articuloBuscado = null;

    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].codigo.toLowerCase() === codigo.toLowerCase()) {
        articuloBuscado = this.articulos[i];
      }
    }

    return articuloBuscado;
  }

  buscarInfluencer(mail) {
    mail = mail.toLowerCase();
    let influencerBuscado = null;

    for (let i = 0; i < this.influencers.length; i++) {
      if (this.influencers[i].mail === mail) {
        influencerBuscado = this.influencers[i];
      }
    }

    return influencerBuscado;
  }

  ordenarInfluencersPorNombre(ascendente) {
    for (let i = 0; i < this.influencers.length - 1; i++) {
      for (let j = i + 1; j < this.influencers.length; j++) {
        let nombreI = this.influencers[i].nombre.toLowerCase();
        let nombreJ = this.influencers[j].nombre.toLowerCase();

        if (
          (ascendente && nombreI > nombreJ) ||
          (!ascendente && nombreI < nombreJ)
        ) {
          let auxiliar = this.influencers[i];
          this.influencers[i] = this.influencers[j];
          this.influencers[j] = auxiliar;
        }
      }
    }
  }

  ordenarArticulosPorCodigo(ascendente) {
    for (let i = 0; i < this.articulos.length - 1; i++) {
      for (let j = i + 1; j < this.articulos.length; j++) {
        let codigoI = this.articulos[i].codigo.toLowerCase();
        let codigoJ = this.articulos[j].codigo.toLowerCase();

        if (
          (ascendente && codigoI > codigoJ) ||
          (!ascendente && codigoI < codigoJ)
        ) {
          let auxiliar = this.articulos[i];
          this.articulos[i] = this.articulos[j];
          this.articulos[j] = auxiliar;
        }
      }
    }
  }

  calcularTotalComisionesInfluencer(influencer) {
    let total = 0;

    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].influencer.mail === influencer.mail) {
        total += this.ventas[i].calcularComision();
      }
    }

    return total;
  }

  contarVentasInfluencer(influencer) {
    let cantidad = 0;

    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].influencer.mail === influencer.mail) {
        cantidad++;
      }
    }

    return cantidad;
  }

  obtenerMayorComision() {
    let mayor = 0;

    for (let i = 0; i < this.influencers.length; i++) {
      let total = this.calcularTotalComisionesInfluencer(this.influencers[i]);

      if (total > mayor) {
        mayor = total;
      }
    }

    return mayor;
  }

  obtenerMontoVentaMasCara() {
    let mayor = 0;

    for (let i = 0; i < this.ventas.length; i++) {
      let totalVenta = this.ventas[i].calcularTotal();

      if (totalVenta > mayor) {
        mayor = totalVenta;
      }
    }

    return mayor;
  }

  influencerTieneVentaMasCara(influencer) {
    let tiene = false;
    let mayorVenta = this.obtenerMontoVentaMasCara();

    for (let i = 0; i < this.ventas.length; i++) {
      if (
        this.ventas[i].influencer.mail === influencer.mail &&
        this.ventas[i].calcularTotal() === mayorVenta &&
        mayorVenta > 0
      ) {
        tiene = true;
      }
    }

    return tiene;
  }

  obtenerEtiquetasInfluencer(influencer) {
    let etiquetas = '';
    let totalComisiones = this.calcularTotalComisionesInfluencer(influencer);
    let mayorComision = this.obtenerMayorComision();

    if (mayorComision > 0 && totalComisiones === mayorComision) {
      etiquetas += '🔥';
    }

    if (this.contarVentasInfluencer(influencer) === 0) {
      etiquetas += '🧊';
    }

    if (this.influencerTieneVentaMasCara(influencer)) {
      etiquetas += '🟢';
    }

    return etiquetas;
  }
                  //REVISAR//
  obtenerVentasDeInfluencer(influencer) {
    let ventasInfluencer = [];

    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].influencer.mail === influencer.mail) {
        ventasInfluencer.push(this.ventas[i]);
      }
    }

    for (let i = 0; i < ventasInfluencer.length - 1; i++) {
      for (let j = i + 1; j < ventasInfluencer.length; j++) {
        if (ventasInfluencer[i].numero > ventasInfluencer[j].numero) {
          let auxiliar = ventasInfluencer[i];
          ventasInfluencer[i] = ventasInfluencer[j];
          ventasInfluencer[j] = auxiliar;
        }
      }
    }

    return ventasInfluencer;
  }

  obtenerUnidadesVendidasArticulo(articulo) {
    let unidades = 0;

    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].articulo.codigo === articulo.codigo) {
        unidades += this.ventas[i].cantidad;
      }
    }

    return unidades;
  }

  obtenerMayorCantidadVendidaArticulo() {
    let mayor = 0;

    for (let i = 0; i < this.articulos.length; i++) {
      let unidades = this.obtenerUnidadesVendidasArticulo(this.articulos[i]);

      if (unidades > mayor) {
        mayor = unidades;
      }
    }

    return mayor;
  }

  articuloEsMasVendido(articulo) {
    let mayor = this.obtenerMayorCantidadVendidaArticulo();
    let unidades = this.obtenerUnidadesVendidasArticulo(articulo);

    return mayor > 0 && unidades === mayor;
  }

  obtenerTotalVendidoPorMedio(medio) {
    let total = 0;

    for (let i = 0; i < this.ventas.length; i++) {
      if (this.ventas[i].medio === medio) {
        total += this.ventas[i].calcularTotal();
      }
    }

    return total;
  }
}

class Influencer {
  constructor(nombre, mail, comision) {
    this.nombre = nombre;
    this.mail = mail;
    this.comision = comision;
  }
}

class Articulo {
  constructor(codigo, descripcion, precio) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

class Venta {
  constructor(numero, articulo, influencer, cantidad, medio) {
    this.numero = numero;
    this.articulo = articulo;
    this.influencer = influencer;
    this.cantidad = cantidad;
    this.medio = medio;
  }

  calcularTotal() {
    return this.articulo.precio * this.cantidad;
  }

  calcularComision() {
    return (this.calcularTotal() * this.influencer.comision) / 100;
  }

  nombreMedio() {
    let medios = ['Instagram', 'YouTube', 'X', 'TikTok', 'Facebook', 'Otras'];
    return medios[this.medio - 1];
  }

  textoMedio() {
    return this.medio + ' - ' + this.nombreMedio();
  }
}
