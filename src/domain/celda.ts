import { Producto } from './producto';
import { Cliente } from './cliente';

export class Celda {
    constructor(public producto?: Producto, public cantidad?: number, public precioFinal?: number) {
    }

    get nombreProducto() {
        return this.producto.nombre
    }
    // o agregar getter y setter precioFinal eliminando la variable precioFinal
    setPrecioFinal(cliente: Cliente) {
        this.precioFinal = this.producto.precioBase + cliente.gananciaProducto(this.producto.id)
    }

    asignarGananciaCliente(cliente: Cliente) {
        let ganancia
        ganancia = this.precioFinal - this.producto.precioBase
        if (ganancia <= 0) {
            throw "El precio final de " + this.producto.nombre + " debe ser mayor a " + this.producto.precioBase
        }
        cliente.asignarGanancia(this.producto.id, ganancia)
    }

    getGanancia(cliente: Cliente): number {
        return cliente.gananciaProducto(this.producto.id)
    }

    getTest() {
        return 555
    }
}