import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StubProductoService } from 'src/services/producto.service';
import { StubClienteService } from 'src/services/cliente.service';
import { Planilla } from 'src/domain/planilla';
import { Producto } from 'src/domain/producto';
import { Cliente } from 'src/domain/cliente';
import { mostrarError } from 'src/domain/mostrarErros';
import { Fila } from 'src/domain/fila';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent implements OnInit {

  clientes: Cliente[]
  productos: Producto[]
  planilla: Planilla = new Planilla()
  nuevaFila: Fila = new Fila()
  displayedColumns: string[] = new Array

  constructor(private router: Router, private clienteService: StubClienteService, private productoService: StubProductoService) { }

  async ngOnInit() {
    this.planilla.filas = new Array
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      this.initDisplayedColumn()
      // Cambiar para que reciba una planilla por service
      // this.planilla.initFilas(this.clientes, this.productos)
      console.log(this.planilla)
    } catch (error) {
      mostrarError(this, error)
    }
  }
  initDisplayedColumn() {
    this.displayedColumns.push('cliente')
    this.productos.forEach(producto => this.displayedColumns.push(producto.nombre))
    this.displayedColumns.push('subtotal', 'observaciones', 'anotaciones')
    console.log(this.displayedColumns)
    // = ['cliente', 'subtotal', 'observaciones', 'anotaciones'];
  }

  crearCeldas() {
    this.nuevaFila.crearCeldas(this.productos)
  }

  test(element) {
    console.log(element)
  }

  getCantidadPaquetes(producto: Producto): number {
    return this.planilla.getCantidadPaquetes(producto)
  }

  getTotalPlanilla(){
    return this.planilla.total
  }

}
