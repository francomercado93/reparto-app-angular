import { Celda } from './celda';
import { Cliente } from './cliente';
import { Producto } from './producto';

function sumarGananciasCeldas(total, celda) {
    return total + celda.getGanancia(this.cliente);
}

export class Fila {

    get productosCelda() {
        return this.celdas.map(celda => celda.producto)
    }

    constructor(public cliente?: Cliente, public celdas?: Array<Celda>, public pago?: number, public observaciones?: string) {
        pago = 0
        observaciones = ""
    }

    crearCeldas(productos: Producto[]) {
        this.celdas = new Array
        productos.forEach(producto => this.celdas.push(new Celda(producto, 0)))
        this.settearPreciosFinales()
    }

    settearPreciosFinales() {
        this.celdas.forEach(celda => celda.setPrecioFinal(this.cliente))
    }

    asignarGanancias() {
        this.celdas.forEach(celda => celda.asignarGananciaCliente(this.cliente))
    }

    get subtotal() {
        return this.celdas.reduce(function (accum, celda) { return accum + celda.precioFinalCelda }, 0)
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

    get cantidadesPaquetesCeldas() {
        return this.celdas.map(celda => celda.cantidad)
    }
}