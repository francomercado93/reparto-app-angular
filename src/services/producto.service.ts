import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/domain/cliente';
import { REST_SERVER_URL } from './configuration';
import { map, catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Producto } from 'src/domain/producto';



export interface IProductoService {
  getProductos(): Promise<any>
  actualizarProducto(productoSeleccionado: Producto): void
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService implements IProductoService {
  constructor(private http: HttpClient) { }

  async getProductos() {
    return await this.http.get<Producto[]>(REST_SERVER_URL + "/productos").toPromise()
  }
  async actualizarProducto(productoSeleccionado: Producto) {
    const prodJson = this.toJSON(productoSeleccionado)
    //productoSeleccionado.toJSON() is not a function ??? 
    return this.http.put(REST_SERVER_URL + "/productos/" + productoSeleccionado.id, prodJson).toPromise()
  }

  private toJSON(productoSeleccionado: Producto) {
    return Object.assign({}, productoSeleccionado);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StubProductoService implements IProductoService {
  productos: Array<Producto> = [new Producto(1, "Miga", 160), new Producto(2, "Arabe", 50), new Producto(3, "Arabe negro", 50)]
  constructor() { }

  async getProductos() {
    return this.productos
  }

  async actualizarProducto(productoSeleccionado: Producto) {
    let updateProduct = this.productos.find(this.findIndexToUpdate, productoSeleccionado.id)
    let index = this.productos.indexOf(updateProduct)
    this.productos[index] = productoSeleccionado
    
  }

  findIndexToUpdate(producto) {
    return producto.id === this;
  }
}
