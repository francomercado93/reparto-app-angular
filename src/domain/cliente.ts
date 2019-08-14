import { mapToObj } from './mapToObj';

export class Cliente {

    constructor(public id?: number, public nombre?: string, public ganancias?: Map<number, number>) {
        this.ganancias = new Map
    }

    cambiarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre
    }

    asignarGanancia(idProducto: number, ganancia: number) {
        this.ganancias.set(idProducto, ganancia)
    }

    getGananciaProducto(id: number): number {
        return this.ganancias.get(id)
    }
    
    static fromJson(clienteJson) {
        const result: Cliente = Object.assign(new Cliente(), clienteJson)
        return result
    }

    gananciasJson(){
        return mapToObj(this.ganancias)
    }
}