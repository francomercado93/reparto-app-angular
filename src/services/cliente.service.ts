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
    const clienteJson = this.toJSON(cliente)
    return this.http.put(REST_SERVER_URL + "/clientes/" + clienteJson.id, clienteJson).toPromise()
  }

  async getClientes(): Promise<any> {
    const res = await this.http.get<Cliente[]>(REST_SERVER_URL + "/clientes").toPromise()
    return res
  }

  private toJSON(cliente: Cliente) {
    return Object.assign({}, cliente);
  }
}

export class StubClienteService implements IClienteService{

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

  actualizarCliente(cliente: Cliente) {
    this.clientes.push(cliente)
  }

}
