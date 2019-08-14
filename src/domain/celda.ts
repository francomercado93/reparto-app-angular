import { Producto } from './producto';
import { Cliente } from './cliente';

export class Celda {
    constructor(public producto?: Producto, public cantidad?: number, public precioFinal ?: number) {
    }

    get nombreProducto() {
        return this.producto.nombre
    }

    getPrecioFinal(cliente: Cliente): number {
        return this.precioFinal
    }
    // return this.producto.precioBase + cliente.getGananciaProducto(this.producto.id)

    setPrecioFinal(valorFinal: number, cliente: Cliente) {
        let ganancia = valorFinal - this.producto.precioBase
        if (ganancia <= 0) {
            throw ("El precio final debe ser mayor a " + this.producto.precioBase)
        }
        cliente.asignarGanancia(this.producto.id, ganancia)
    }

    getGanancia(cliente: Cliente): number {
        return cliente.getGananciaProducto(this.producto.id)
    }

    getPrecioCelda(cliente: Cliente) {
        return this.getPrecioFinal(cliente) * this.cantidad
    }

    getTest() {
        return 555
    }
}