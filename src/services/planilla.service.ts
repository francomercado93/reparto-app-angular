import { Injectable } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { Fila } from 'src/domain/fila';
import { StubClienteService } from './cliente.service';
import { Cliente } from 'src/domain/cliente';
import { StubProductoService } from './producto.service';
import { Producto } from 'src/domain/producto';

export interface IPlanillaService {
  getPlanillaById(id: number)
}

@Injectable({
  providedIn: 'root'
})
export class PlanillaService implements IPlanillaService {

  constructor() { }

  getPlanillaById(id: number) {
    throw new Error("Method not implemented.");
  }

}

@Injectable({
  providedIn: 'root'
})
export class StubPlanillaService implements IPlanillaService {

  constructor(private stubClienteService: StubClienteService, private stubProductoService: StubProductoService) { }

  planilla = new Planilla()

  async initPlanilla() {
    var productos = await this.stubProductoService.getProductos()
    var clientes = await this.stubClienteService.getClientes()
    this.planilla.initFilas(clientes, productos)
    this.planilla.filas[0].celdas[0].cantidad = 3
    this.planilla.filas[0].celdas[1].cantidad = 0
    this.planilla.filas[0].celdas[2].cantidad = 1
    this.planilla.filas[1].celdas[0].cantidad = 0
    this.planilla.filas[1].celdas[1].cantidad = 2
    this.planilla.filas[1].celdas[2].cantidad = 5
    this.planilla.filas[0].pago = 500
    this.planilla.filas[1].pago = 600
    this.planilla.filas[0].observaciones = "Llevar dos paquetes el martes"
    this.planilla.filas[1].observaciones = "Pagar apuesta"
  }

  getPlanillaById(id: number) {
    this.initPlanilla()
    return this.planilla
  }

}
