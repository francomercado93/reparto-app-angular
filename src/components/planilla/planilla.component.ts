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

  constructor(private router: Router, private clienteService: StubClienteService, private productoService: StubProductoService) { }

  async ngOnInit() {
    try {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.clientes = await this.clienteService.getClientes()
      this.productos = await this.productoService.getProductos()
      // Cambiar para que reciba una planilla por service
      this.planilla.initFilas(this.clientes, this.productos)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  crearCeldas() {
    this.nuevaFila.crearCeldas(this.productos)
  }

}
