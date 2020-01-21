import { Component, OnInit, Input } from '@angular/core';
import { Planilla } from 'src/domain/planilla';
import { Producto } from 'src/domain/producto';
import { Router } from '@angular/router';
import { StubProductoService } from 'src/services/producto.service';
import { mostrarError } from 'src/domain/mostrarErros';

@Component({
  selector: 'app-tabla-planilla',
  templateUrl: './tabla-planilla.component.html',
  styleUrls: ['./tabla-planilla.component.css']
})
export class TablaPlanillaComponent implements OnInit {

  @Input() planilla: Planilla
  productos: Producto[]

  constructor(private router: Router,
    private productoService: StubProductoService) { }


  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.productos = await this.productoService.getProductos()
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
}
