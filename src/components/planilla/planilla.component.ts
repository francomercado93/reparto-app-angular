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
  alta: boolean = false

  constructor(private router: Router, private clienteService: StubClienteService,
    private productoService: StubProductoService, private route: ActivatedRoute,
    private planillaService: StubPlanillaService) { }

  async ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    const paramId = this.route.snapshot.params.id
    this.alta = paramId == 'new'
    try {
      if (!this.alta) {
        this.planilla = await this.planillaService.getPlanillaById(paramId);
      }
      else {
        this.planilla = new Planilla()
        this.planilla.filas = new Array
      }
    } catch (error) {
      mostrarError(this, error)
    }
  }
}
