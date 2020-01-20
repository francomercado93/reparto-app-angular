import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StubProductoService } from 'src/services/producto.service';
import { StubClienteService } from 'src/services/cliente.service';
import { Planilla } from 'src/domain/planilla';
import { Producto } from 'src/domain/producto';
import { Cliente } from 'src/domain/cliente';
import { mostrarError } from 'src/domain/mostrarErros';
import { Fila } from 'src/domain/fila';
import { FormControl, Validators } from '@angular/forms';

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
  recaudacionControl: FormControl
  opcionesFecha: {}
  fechaModel: any = {}


  constructor(private router: Router, private clienteService: StubClienteService, private productoService: StubProductoService) { }

  async ngOnInit() {
    this.planilla.filas = new Array
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    this.fechaModel = {
      date: this.convertirANuevoDate(new Date())
    }
    // Se setea el valor cuando se obtiene la planilla por el service
    this.recaudacionControl = new FormControl('', [Validators.min(0), Validators.required])
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      this.initDisplayedColumn()
      // Cambiar para que reciba una planilla por service
      // this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }
  initDisplayedColumn() {
    this.displayedColumns.push('cliente')
    this.productos.forEach(producto => this.displayedColumns.push(producto.nombre))
    this.displayedColumns.push('subtotal', 'observaciones', 'anotaciones')
  }

  crearCeldas() {
    this.nuevaFila.crearCeldas(this.productos)
  }

  getCantidadPaquetes(producto: Producto): number {
    return this.planilla.getCantidadPaquetes(producto)
  }

  getObservacionesPlanilla(): string {
    var diferencia = this.planilla.totalPagos - this.planilla.recaudacion
    if (diferencia > 0) {
      return 'Faltan $' + (this.planilla.totalPagos - this.planilla.recaudacion)
        + ' en la recaudacion del dia'
    }
    if (diferencia < 0) {
      return 'Falta anotar algun cliente o falta anotar algun gasto ($' + Math.abs(diferencia) + ')'
    }
    return ''
  }

  getErrorMessageRecaudacion() {
    return this.recaudacionControl.hasError('required') ? 'Este campo es requerido' :
      this.recaudacionControl.hasError('min') ? 'La cifra debe ser mayor a cero' : ''
  }

  test() {
    console.log(this.planilla)
    // this.planilla.recaudacion = this.recaudacionControl.value
  }

  convertirANuevoDate(fecha: Date) {
    return {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1,
      day: fecha.getDate()
    }
  }

  convertirADate(fecha: any): Date {
    if (!fecha) {
      return null
    }
    return new Date(fecha.year, fecha.month - 1, fecha.day)
  }
}
