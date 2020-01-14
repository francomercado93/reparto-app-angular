import { mapToObj } from './mapToObj';

export class Cliente {

    constructor(public id?: number, public nombre?: string, public ganancias?: Map<number, number>) {
        this.ganancias = new Map
    }

    get gananciaPan(): number {
        return 3
    }

    asignarGanancia(idProducto: number, ganancia: number) {
        this.ganancias.set(idProducto, ganancia)
    }

    gananciaProducto(id: number): number {
        return this.ganancias.get(id)
    }

    static fromJson(clienteJson) {
        const result: Cliente = Object.assign(new Cliente(), clienteJson)
        return result
    }

    gananciasJson() {
        return mapToObj(this.ganancias)
    }
}