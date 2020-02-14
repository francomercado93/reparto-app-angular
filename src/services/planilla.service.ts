import { Injectable } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { Fila } from 'src/domain/fila';
import { StubClienteService } from './cliente.service';
import { StubProductoService } from './producto.service';

export interface IPlanillaService {
  getPlanillaFecha(fecha: any): Promise<any>
  actualizarPlanilla(planilla: Planilla): void
}

@Injectable({
  providedIn: 'root'
})
export class PlanillaService implements IPlanillaService {

  constructor() { }

  getPlanillaFecha(fecha: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  actualizarPlanilla(planilla: Planilla): void {
    throw new Error("Method not implemented.");
  }
}
@Injectable({
  providedIn: 'root'
})
export class StubPlanillaService implements IPlanillaService {
  
  planillas: Array<Planilla>
  fila1Planilla1: Fila
  fila2Planilla1: Fila
  fila1Planilla2: Fila
  fila2Planilla2: Fila
  
  constructor(private clienteService: StubClienteService, private productoService: StubProductoService) { }
  
  async initPlanillas() {
    var productos = await this.productoService.getProductos()
    this.clienteService.init()
    this.fila1Planilla1 = new Fila(this.clienteService.getClienteById(10))
    this.fila1Planilla1.crearCeldas(productos)
    this.fila1Planilla1.celdas[0].cantidad = 2
    this.fila1Planilla1.celdas[1].cantidad = 1
    this.fila1Planilla1.setearCeldasNoCargadas()
    this.fila1Planilla1.pago = 250
    this.fila1Planilla1.anotaciones = "test1"
    this.fila2Planilla1 = new Fila(this.clienteService.getClienteById(20))
    this.fila2Planilla1.crearCeldas(productos)
    this.fila2Planilla1.celdas[0].cantidad = 3
    this.fila2Planilla1.setearCeldasNoCargadas()
    this.fila2Planilla1.pago = 800
    this.fila2Planilla1.anotaciones = "testldld"
    this.fila1Planilla2 = new Fila(this.clienteService.getClienteById(10))
    this.fila1Planilla2.crearCeldas(productos)
    this.fila1Planilla2.celdas[0].cantidad = 1
    this.fila1Planilla2.celdas[1].cantidad = 3
    this.fila1Planilla2.celdas[2].cantidad = 2
    this.fila1Planilla2.setearCeldasNoCargadas()
    this.fila1Planilla2.pago = 500
    this.fila2Planilla2 = new Fila(this.clienteService.getClienteById(20))
    this.fila2Planilla2.crearCeldas(productos)
    this.fila2Planilla2.celdas[2].cantidad = 1
    this.fila2Planilla2.setearCeldasNoCargadas()
    this.fila2Planilla2.pago = 50
    this.fila2Planilla2.anotaciones = "Testest"
    this.planillas = [new Planilla(1, [this.fila1Planilla1, this.fila2Planilla1], 100, 500, new Date(2020, 0, 24)),
    new Planilla(2, [this.fila2Planilla2, this.fila1Planilla2], 50, 800, new Date(2020, 0, 12))]
    this.planillas.forEach(planilla => console.log(planilla.fecha))
  }
  // REVISAR BUSQUEDA
  async getPlanillaFecha(fecha: Date): Promise<any> {
    return this.planillas.find(planilla => planilla.fecha.getTime() === fecha.getTime())
  }

  async getPlanillaById(paramId: string): Promise<any> {
    return this.planillas.find(planilla => planilla.id == parseInt(paramId))
  }
  
  actualizarPlanilla(planilla: Planilla): void {
    throw new Error("Method not implemented.");
  }

  crearPlanilla(fecha: any) {
    console.log(fecha)
    let nuevaPlanilla = new Planilla()
    nuevaPlanilla.id = this.planillas.length + 1
    nuevaPlanilla.fecha = fecha
    this.planillas.push(nuevaPlanilla)
    return nuevaPlanilla
  }

}