import { Fila } from './fila';
import { Cliente } from './cliente';
import { Producto } from './producto';

export class Planilla {
    constructor(public id?: number, public filas?: Array<Fila>, public fecha?: Date) {
        this.fecha = new Date()
    }

    initFilas(clientes: Cliente[], productos: Producto[]) {
        this.filas = new Array
        clientes.forEach(cliente => this.filas.push(this.crearFilas(cliente, productos)))
    }

    crearFilas(cliente: Cliente, productos: Producto[]): Fila {
        const fila = new Fila(cliente)
        fila.crearCeldas(productos)
        return fila
    }

    get totalPagos() {
        return this.filas.reduce(function (acum, fila) { return acum + fila.pago }, 0)
    }

    get totalFilas() {
        return this.filas.reduce(function (acum, fila) { return acum + fila.subtotal }, 0)
    }

    get cantidadesTotales() {
        return this.filas.map(fila => fila.cantidadesPaquetesCeldas).reduce((a, b) => a.map(function (num, idx) { return num + b[idx] }))
    }
}