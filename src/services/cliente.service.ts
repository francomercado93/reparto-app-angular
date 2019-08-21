import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/domain/cliente';
import { REST_SERVER_URL } from './configuration';
import { map, catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

export interface IClienteService {

  getClientes(): Promise<any>

  actualizarCliente(cliente: Cliente): void
}

@Injectable({
  providedIn: 'root'
})

export class ClienteService implements IClienteService {

  constructor(private http: HttpClient) { }

  async actualizarCliente(cliente: Cliente) {
    const clienteJson = this.convertToJson(cliente)
    return this.http.put(REST_SERVER_URL + "/clientes/" + clienteJson.id, clienteJson).toPromise()
  }

  async nuevoCliente(cliente: Cliente) {
    const clienteJson = this.convertToJson(cliente);
    return this.http.post(REST_SERVER_URL + "/clientes", clienteJson).toPromise()
  }

  private convertToJson(cliente: Cliente) {
    const clienteJson = this.toJSON(cliente);
    clienteJson.ganancias = cliente.gananciasJson();
    return clienteJson;
  }

  async getClientes(): Promise<any> {
    const res = await this.http.get<Cliente[]>(REST_SERVER_URL + "/clientes").toPromise()
    return res
  }

  private toJSON(cliente: Cliente): any {
    return Object.assign({}, cliente);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StubClienteService implements IClienteService {

  cliente: Cliente

  initCliente() {
    this.cliente = null
  }

  getClienteById(id): Cliente {
    return this.clientes.find(cliente => cliente.id == id)
  }

  async nuevoCliente(cliente: Cliente) {
    // id numero random menor a 20 y mayor a 1
    cliente.id = Math.floor((Math.random() * 20) + 1)
    this.clientes.push(cliente)
  }

  clientes: Array<Cliente> = []

  init() {
    let loDePepe = new Cliente(10, "Lo de pepe")
    let laLibertad = new Cliente(20, "La libertad")
    loDePepe.asignarGanancia(1, 20)
    loDePepe.asignarGanancia(2, 5)
    laLibertad.asignarGanancia(1, 50)
    laLibertad.asignarGanancia(2, 100)
    this.clientes = [loDePepe, laLibertad]
  }
  constructor() { }

  async getClientes() {
    if (this.clientes.length == 0)
      this.init()
    return this.clientes
  }

  async actualizarCliente(cliente: Cliente) {
    let updateClient = this.clientes.find(this.findIndexToUpdate, cliente.id) //como funciona???
    // let updateClient = this.clientes.find(clienteBuscado => this.findIndexToUpdate(cliente, clienteBuscado))
    let index = this.clientes.indexOf(updateClient)
    this.clientes[index] = cliente

  }

  findIndexToUpdate(cliente, clienteBuscado) {
    // return cliente.id === clienteBuscado.id;
    return cliente.id === this;
  }

}
