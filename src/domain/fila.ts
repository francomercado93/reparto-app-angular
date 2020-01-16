import { Celda } from './celda';
import { Cliente } from './cliente';
import { Producto } from './producto';
export class Fila {

    get productosCelda() {
        return this.celdas.map(celda => celda.producto)
    }

    constructor(public cliente?: Cliente, public celdas?: Array<Celda>,
        public pago?: number, public observaciones?: string) { }

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
        var listaPrecios = this.celdas.map(celda => celda.subtotalCelda)
        return listaPrecios.reduce((a, b) => a + b)
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
    // get gananciaFila() {
    //     return this.celdas.reduce(sumarGananciasCeldas)
    // }
}