import { Component, OnInit, Input } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { Producto } from 'src/domain/producto';
import { Router } from '@angular/router';
import { StubProductoService } from 'src/services/producto.service';
import { mostrarError } from 'src/domain/mostrarErros';
import { StubPlanillaService } from 'src/services/planilla.service';

@Component({
  selector: 'app-tabla-planilla',
  templateUrl: './tabla-planilla.component.html',
  styleUrls: ['./tabla-planilla.component.css']
})
export class TablaPlanillaComponent implements OnInit {

  @Input() planilla: Planilla
  productos: Producto[]
  opcionesFecha: {}
  fechaModel: any = {}

  constructor(private router: Router,
    private productoService: StubProductoService, private planillaService: StubPlanillaService) { }


  async ngOnInit() {
    this.opcionesFecha = {
      dateFormat: 'dd/mm/yyyy'
    }
    this.fechaModel = {
      date: this.convertirANuevoDate(new Date())
    }
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.productos = await this.productoService.getProductos()
      this.planillaService.initPlanillas()
      // this.planillaService.i
      // Cambiar para que reciba una planilla por service
      // this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
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
    return new Date(fecha.date.year, fecha.date.month - 1, fecha.date.day)
  }

  async buscarPlanilla() {
    console.log(this.fechaModel)
    var fechaDate = this.convertirADate(this.fechaModel)
    console.log(fechaDate)
    try {
      this.planilla = await this.planillaService.getPlanillaFecha(fechaDate)
      console.log(this.planilla)
    } catch (error) {
      mostrarError(this, error)
    }
  }
}
