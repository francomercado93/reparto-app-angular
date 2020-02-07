import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StubProductoService } from 'src/services/producto.service';
import { StubClienteService } from 'src/services/cliente.service';
import { Planilla } from 'src/domain/planilla';
import { Producto } from 'src/domain/producto';
import { Cliente } from 'src/domain/cliente';
import { mostrarError } from 'src/domain/mostrarErros';
import { Fila } from 'src/domain/fila';
import { FormControl, Validators } from '@angular/forms';
import { StubPlanillaService } from 'src/services/planilla.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent implements OnInit {

  clientes: Cliente[]
  productos: Producto[]
  planilla: Planilla

  constructor(private router: Router, private clienteService: StubClienteService,
    private productoService: StubProductoService, private route: ActivatedRoute,
    private planillaService: StubPlanillaService) { }

  async ngOnInit() {
    this.planilla = new Planilla()
    const id = this.route.snapshot.params.id
    // TODO: EDICION O ALTA DE PLANILLA
    this.planilla.filas = new Array
    // Se setea el valor cuando se obtiene la planilla por el service
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      // this.planillaService.getPlanillaFecha()
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      // Cambiar para que reciba una planilla por service
      // this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }
}
