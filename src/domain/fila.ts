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

    constructor(public id?: number, public cliente?: Cliente, public celdas?: Array<Celda>) {}

    get subtotal() {
        // REVISAR!!!!
        return this.celdas.reduce(sumarTotalCeldas)
        // return this.celdas.reduce(this.sumarCeldas)
    }
    crearCeldas(productos: Producto[]) {
        this.celdas = new Array
        productos.forEach(producto => this.celdas.push(new Celda(producto, 1)))
    }

    sumarTotalCeldas(total, celda) {
        return total + celda.getPrecioCelda(this.cliente)
    }

    agregarCelda(celda: Celda) {
        this.celdas.push(celda)
    }
    get productosCeldas(){
        return this.celdas.map(celda => celda.producto)
    }
    get gananciaFila() {
        return this.celdas.reduce(sumarGananciasCeldas)
    }
}