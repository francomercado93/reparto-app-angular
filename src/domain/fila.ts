import { Celda } from './celda';
import { Cliente } from './cliente';
import { Producto } from './producto';

function sumarTotalCeldas(total, celda) {
    return total + celda.getPrecioCelda(this.cliente);
}

function sumarGananciasCeldas(total, celda) {
    return total + celda.getGanancia(this.cliente);
}

export class Fila {

    get productosCelda() {
        return this.celdas.map(celda => celda.producto)
    }

    constructor(public cliente?: Cliente, public celdas?: Array<Celda>) { }

    crearCeldas(productos: Producto[]) {
        this.celdas = new Array
        productos.forEach(producto => this.celdas.push(new Celda(producto)))
        this.settearPreciosFinales()
    }

    settearPreciosFinales() {
        this.celdas.forEach(celda => celda.setPrecioFinal(this.cliente))
    }

    asignarGanancias() {
        this.celdas.forEach(celda => celda.asignarGananciaCliente(this.cliente))
    }

    get subtotal() {
        // REVISAR!!!!
        return this.celdas.reduce(sumarTotalCeldas)
        // return this.celdas.reduce(this.sumarCeldas)
    }

    sumarTotalCeldas(total, celda) {
        return total + celda.getPrecioCelda(this.cliente)
    }

    agregarCelda(celda: Celda) {
        this.celdas.push(celda)
    }
    get productosCeldas() {
        return this.celdas.map(celda => celda.producto)
    }
    get gananciaFila() {
        return this.celdas.reduce(sumarGananciasCeldas)
    }
}