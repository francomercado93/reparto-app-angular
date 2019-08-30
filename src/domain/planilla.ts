import { Fila } from './fila';
import { Cliente } from './cliente';
import { Producto } from './producto';

export class Planilla {

    constructor(public id?: number, public filas?: Array<Fila>) { }

    initFilas(clientes: Cliente[], productos: Producto[]) {
        this.filas = new Array
        clientes.forEach(cliente => this.filas.push(this.crearFilas(cliente, productos)))
    }

    crearFilas(cliente: Cliente, productos: Producto[]): Fila {
        const fila = new Fila(cliente)
        fila.crearCeldas(productos)
        return fila
    }
}