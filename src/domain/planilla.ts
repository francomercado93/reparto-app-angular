import { Fila } from './fila';
import { Cliente } from './cliente';
import { Producto } from './producto';
import { Celda } from './celda';

export class Planilla {


    constructor(public id?: number, public filas?: Array<Fila>, public gastos?: number, public recaudacion?: number) { }

    initFilas(clientes: Cliente[], productos: Producto[]) {
        this.filas = new Array
        clientes.forEach(cliente => this.filas.push(this.crearFilas(cliente, productos)))
    }

    crearFilas(cliente: Cliente, productos: Producto[]): Fila {
        const fila = new Fila(cliente)
        fila.crearCeldas(productos)
        return fila
    }

    crearNuevaFila(nuevaFila: Fila) {
        this.filas.push(nuevaFila)
    }

    getCantidadPaquetes(producto: Producto): number {
        return this.getCantidadesDePaquetes(producto).reduce((num1, num2) => num1 + num2)
    }

    getCantidadesDePaquetes(producto: Producto): number[] {
        return this.filas.map(fila => this.getCeldaProducto(fila, producto).cantidad)
    }

    public getCeldaProducto(fila: Fila, producto: Producto): Celda {
        return fila.celdas.find(celda => celda.producto.nombre == producto.nombre)
    }

    get totalImportes() {
        return this.filas.map(fila => fila.subtotal).reduce((num1, num2) => num1 + num2)
    }

    get totalPagos() {
        return this.filas.map(fila => fila.pago).reduce((num1, num2) => num1 + num2)
    }

}