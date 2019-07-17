import { Producto } from './producto';
import { Cliente } from './cliente';

export class Celda {
    constructor(public producto?: Producto, public cliente?: Cliente) {
    }
    
    cambiarNombreCliente(nuevoNombre: string): void {
        // porque no se puede asignar asi? cambiarNombre is not a function
        // this.cliente.cambiarNombre(nuevoNombre)
        this.cliente.nombre = nuevoNombre
    }
    
    get precioFinal(): number {
        return this.producto.precioBase 
    }
    // + this.cliente.getGananciaProducto(this.producto.id)

    set precioFinal(valorFinal: number) {
        let ganancia = valorFinal - this.producto.precioBase
        if (ganancia <= 0) {
            throw ("El precio final debe ser mayor a " + this.producto.precioBase)
        }
        this.cliente.asignarGanancia(this.producto.id, ganancia)
    }

    get ganancia(): number {
        return this.cliente.getGananciaProducto(this.producto.id)
    }

    getTest(){
        return 555
    }
}