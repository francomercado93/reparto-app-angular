export class Producto {

    constructor(public id?: number, public nombre?: string, public precioBase?: number) {
    }
    
    toJSON(): any {
        const result : any = Object.assign({}, this)
        return result
    }
}